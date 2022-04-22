import { useLocalStroage } from '@/hooks';
import { ModalForm } from '@ant-design/pro-form';
import { message } from 'antd';
import { useIntl, FormattedMessage } from 'umi';
import { createResearch, editFile, editResearch, uploadFile, uploadFiles } from '../services';
import { ResearchForm } from './ResearchForm';

const CreateAndEditForm = (props) => {
  const { actionRef, createModalVisible, setCreateModalVisible, initial, setIntial } = props;
  const { name } = useLocalStroage();

  const initials = () => {
    if (initial?.reviewer === '') initial.reviewer = name;
    return initial;
  };
  const intl = useIntl();

  const handleAdd = async (fields: any) => {
    const hide = message.loading('正在修改');
    if (initial) {
      try {
        await editResearch(initial.researchId, JSON.stringify(fields));
        if (fields?.file) {
          let formData = new FormData();
          fields?.file.forEach((file) => {
            file.response && formData.append('files', file.originFileObj);
          });
          await editFile({ files: formData, type: 1, id: initial.researchId });
        }
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
        const research = await createResearch(fields);
        let formData = new FormData();
        fields?.file.forEach((file) => {
          formData.append('files', file.originFileObj);
        });
        await uploadFiles({ files: formData, type: 1, researchId: research.researchId });

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
      preserve={false}
      width={515}
      title={
        initial ? '修改科研数据' : '新建科研数据'
        //   intl.formatMessage({
        //   id: 'pages.searchTable.createForm.newRule',
        //   defaultMessage: 'New rule',
        // })
      }
      initialValues={
        initials() || {
          researchName: '',
          field: '',
          category: '',
          cost: '',
          description: '',
          upload: '',
          review: 0,
          reviewer: name,
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
        onCancel: () => {
          setIntial(null);
        },
      }}
    >
      <ResearchForm initial={initial} />
    </ModalForm>
  );
};

export default CreateAndEditForm;
