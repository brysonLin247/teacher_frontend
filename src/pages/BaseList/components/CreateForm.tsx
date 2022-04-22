import { ModalForm } from '@ant-design/pro-form';
import { message } from 'antd';
import { useIntl, FormattedMessage } from 'umi';
import { createBase, editBase } from '../services';
import { BaseForm } from './BaseForm';

const CreatForm = (props) => {
  const { actionRef, createModalVisible, setCreateModalVisible, initial, setIntial } = props;

  const intl = useIntl();
  const handleAdd = async (fields: API.RuleListItem) => {
    const hide = message.loading('正在修改');
    if (initial) {
      try {
        await editBase(initial.id, fields);
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
        await createBase(fields);
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
        '新建教师信息'
        //   intl.formatMessage({
        //   id: 'pages.searchTable.createForm.newRule',
        //   defaultMessage: 'New rule',
        // })
      }
      initialValues={
        initial || {
          sex: '女',
          apartment: '教务部',
          title: '讲师',
          status: '在职',
          location: '',
          graduation: '',
          education: '',
          introduce: '',
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
      <BaseForm />
    </ModalForm>
  );
};

export default CreatForm;
