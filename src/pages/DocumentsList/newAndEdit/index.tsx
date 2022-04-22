import { useLocalStroage } from '@/hooks';
import ProForm, {
  ProFormGroup,
  ProFormSelect,
  ProFormText,
  ProFormUploadButton,
} from '@ant-design/pro-form';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card, Form, message } from 'antd';
import { useState } from 'react';
import { useIntl } from 'umi';
import { createDocuments, editDocuments } from '../services';
import { DocEditor } from './docEditor';

const NewAndEdit: React.FC = (props: any) => {
  const initialValues = props.location.state?.initial;
  // const intl = useIntl();
  const { name } = useLocalStroage();
  const [content, setContent] = useState('');
  console.log(initialValues);
  const defaultFileList = initialValues?.picUrl
    ? [
        {
          uid: '-1',
          name: initialValues?.picUrl.match(/documents\/(.*)/g)[0],
          status: 'done',
          url: initialValues?.picUrl,
          thumbUrl: initialValues?.picUrl,
        },
      ]
    : [];

  const handleAdd = async (fields: any) => {
    const hide = message.loading('正在处理');
    if (!initialValues) {
      try {
        const { title, type, content, picUrl } = fields;
        let formData = new FormData();
        picUrl?.forEach((file) => {
          formData.append('picUrl', file.originFileObj);
        });
        formData.append('title', title);
        formData.append('type', type);
        formData.append('author', name);
        formData.append('content', content);
        await createDocuments(formData);
        // await createDocuments({ ...fields, picUrl: formData, author: name });
        hide();
        message.success('添加成功');
        return true;
      } catch (error) {
        hide();
        message.error('Adding failed, please try again!');
        return false;
      }
    } else {
      try {
        const { title, type, content, picUrl } = fields;
        const { id } = initialValues;
        // await editDocuments({ id, ...fields, author: name });
        let formData = new FormData();
        picUrl?.forEach((file) => {
          formData.append('picUrl', file.originFileObj);
        });
        formData.append('id', id);
        formData.append('title', title);
        formData.append('type', type);
        formData.append('author', name);
        formData.append('content', content);
        await editDocuments(formData);
        hide();
        message.success('修改成功');
        return true;
      } catch (error) {
        hide();
        message.error('Adding failed, please try again!');
        return false;
      }
    }
  };
  return (
    <PageHeaderWrapper>
      <Card>
        <ProForm
          onFinish={async (value) => {
            const success = await handleAdd(value);
            if (success) {
              history.back();
            }
          }}
        >
          <ProFormGroup>
            <ProFormText
              name="title"
              label="公文标题"
              width="md"
              rules={[{ required: true, message: '请输入公文标题!' }]}
              initialValue={initialValues?.title}
            />
            <ProFormSelect
              name="type"
              label="公文类别"
              width="md"
              options={[
                { label: '校务安排', value: 0 },
                { label: '教学风采', value: 1 },
              ]}
              initialValue={initialValues?.type}
              rules={[{ required: true, message: '请选择一个公文类别!' }]}
            />
          </ProFormGroup>

          <Form.Item name="content" label="公文内容" initialValue={initialValues?.content}>
            <DocEditor value={content} onChange={setContent} />
          </Form.Item>
          <ProFormUploadButton
            label="上传封面图片"
            // label={initial ? '文件重新上传' : '文件上传'}
            max={1}
            name="picUrl"
            fieldProps={{
              listType: 'picture-card',
              maxCount: 1,
              accept: '.jpg, .jpeg, .png, .gif',
              defaultFileList: defaultFileList as any,
            }}
          />
        </ProForm>
      </Card>
    </PageHeaderWrapper>
  );
};

export default NewAndEdit;
