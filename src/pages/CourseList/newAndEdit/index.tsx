import { ModalForm } from '@ant-design/pro-form';
import { message } from 'antd';
import { useIntl } from 'umi';
import { createCourse, editCourse } from '../services';
import { CourseForm } from './courseForm';

const NewAndEdit = (props) => {
  const { actionRef, createModalVisible, setCreateModalVisible, initial, setIntial } = props;
  const intl = useIntl();

  const handleAdd = async (fields: API.RuleListItem) => {
    const hide = message.loading('正在修改');
    if (initial) {
      try {
        await editCourse(initial.id, fields);
        hide();
        message.success('修改成功');
        return true;
      } catch (error) {
        hide();
        message.error('Adding failed, please try again!');
        return false;
      }
    } else {
      try {
        await createCourse(fields);
        hide();
        message.success('添加成功');
        return true;
      } catch (error) {
        hide();
        message.error('Adding failed, please try again!');
        return false;
      }
    }
  };

  return (
    <ModalForm
      title={
        '新建课程信息'
        //   intl.formatMessage({
        //   id: 'pages.searchTable.createForm.newRule',
        //   defaultMessage: 'New rule',
        // })
      }
      initialValues={
        initial || {
          sno: '',
          name: '',
          year: undefined,
          college: undefined,
          major: undefined,
          className: undefined,
          semester: undefined,
        }
      }
      visible={createModalVisible}
      onVisibleChange={setCreateModalVisible}
      onFinish={async (value) => {
        const success = await handleAdd(value as API.RuleListItem);
        if (success) {
          setCreateModalVisible(false);
          if (actionRef.current) {
            actionRef.current.reload();
          }
        }
      }}
      modalProps={{
        destroyOnClose: true,
        forceRender: false,
        onCancel: () => setIntial(null),
      }}
    >
      <CourseForm />
    </ModalForm>
  );
};

export default NewAndEdit;
