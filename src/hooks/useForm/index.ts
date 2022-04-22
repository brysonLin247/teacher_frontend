import { useState, useEffect } from 'react';
import Form from '../form';

export declare type StoreBaseValue = string | number | boolean;
export declare type StoreValue = StoreBaseValue | Store | StoreBaseValue[];
export interface Store {
  [name: string]: StoreValue;
}

export interface UseFormConfig {
  defaultFormValues?: Store | (() => Promise<Store> | Store);
  form?: any;
  submit?: (formValues: Store) => any;
}

export const useForm = (config: UseFormConfig) => {
  const [defaultFormValuesLoading, setDefaultFormValuesLoading] = useState(
    false,
  );
  const [initialValues, setInitialValues] = useState({});
  const { defaultFormValues, form, submit } = config;
  const [formValues, setFormValues] = useState({});
  const [formLoading, setFormLoading] = useState(false);
  const [formResult, setFormResult] = useState();

  let formInstance = form;
  if (!form) {
    [formInstance] = Form['useForm']();
  }

  const onFinish = (formValue: Store) => {
    setFormValues(formValue);
    setFormLoading(true);
    return new Promise((resolve, reject) => {
      formInstance
        .validateFields()
        .then(() => {
          resolve(
            Promise.resolve(submit(formValue))
              .then(data => {
                setFormLoading(false);
                setFormResult(data);
                return data;
              })
              .catch(err => {
                setFormLoading(false);
                throw err;
              }),
          );
        })
        .catch(validateErr => {
          setFormLoading(false);
          reject(validateErr);
        });
    });
  };

  useEffect(() => {
    let isUnMounted = false;
    if (!defaultFormValues) {
      return;
    }
    let value: Store | Promise<Store>;
    if (typeof defaultFormValues === 'function') {
      setDefaultFormValuesLoading(true);
      value = defaultFormValues();
    } else {
      value = defaultFormValues;
    }
    Promise.resolve(value)
      .then(data => {
        if (!isUnMounted) {
          const obj = { ...data };
          Object.keys(data).forEach(name => {
            obj[name] = formInstance.isFieldTouched(name)
              ? formInstance.getFieldValue(name)
              : data[name];
          });
          setDefaultFormValuesLoading(false);
          setInitialValues(data);
          formInstance.setFieldsValue(obj);
        }
      })
      .catch(() => {
        if (!isUnMounted) {
          setDefaultFormValuesLoading(false);
        }
      });
    return () => {
      isUnMounted = true;
    };
  }, []);

  const formProps = {
    form: formInstance,
    onFinish,
    initialValues,
  }

  return {
    form: formInstance,
    formProps,
    defaultFormValuesLoading,
    formValues,
    initialValues,
    formResult,
    formLoading,
    submit: (values?: Store) => {
      formInstance.setFieldsValue(values);
      return onFinish(
        formInstance.getFieldsValue(true),
      );
    },
  };
};