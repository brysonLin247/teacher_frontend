import { ModalForm, ProFormDigit } from '@ant-design/pro-form';
import { message } from 'antd';
import { useIntl } from 'umi';
import { updateAchievement } from './services';

export const AchievementForm = (props) => {
  const { actionRef, createModalVisible, setCreateModalVisible, initial, setIntial } = props;
  const intl = useIntl();

  const handleAdd = async (fields: any) => {
    const { sno, baseId, courseId, achievement } = fields;
    const hide = message.loading('正在修改');
    if (initial) {
      try {
        await updateAchievement({ sno, baseId, courseId, achievement });
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
    <ModalForm
      width={250}
      title={'打分'}
      initialValues={initial}
      visible={createModalVisible}
      onVisibleChange={setCreateModalVisible}
      onFinish={async (value) => {
        const success = await handleAdd({ ...initial, achievement: value.achievement });
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
      <ProFormDigit
        label="学生成绩"
        name="achievement"
        width="sm"
        min={0}
        max={100}
        rules={[{ required: true, message: '请输入成绩!' }]}
      />
    </ModalForm>
  );
};
