import { useLocalStroage } from '@/hooks';
import ProForm, {
  ProFormDatePicker,
  ProFormGroup,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-form';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card, message } from 'antd';
import { useIntl } from 'umi';
import { editBase, getUserInfo } from './services';

const Settings: React.FC = () => {
  const { id } = useLocalStroage();
  const intl = useIntl();
  const handleAdd = async (fields: any) => {
    const hide = message.loading('正在修改');
    try {
      await editBase(id, JSON.stringify(fields));
      hide();
      message.success('修改成功');
      return true;
    } catch (error) {
      hide();
      message.error('Adding failed, please try again!');
      return false;
    }
  };

  return (
    <PageHeaderWrapper>
      <Card style={{ margin: '0 auto', width: '100%' }}>
        <ProForm
          request={async () => {
            const result = await getUserInfo(id);
            return result.data.info;
          }}
          onFinish={async (value) => {
            console.log(value);
            const success = await handleAdd(value);
            if (success) {
              history.back();
            }
          }}
        >
          <ProFormGroup>
            <ProFormText
              width="md"
              name="name"
              key="name"
              label="姓名"
              rules={[{ required: true, message: '请选择姓名!' }]}
              disabled
            />
            <ProFormText
              width="md"
              name="telephone"
              label="手机号码"
              rules={[{ required: true, message: '请选择手机号码!' }]}
            />
            <ProFormRadio.Group
              name="sex"
              key="sex"
              label="性别"
              width="sm"
              options={['女', '男']}
            />
          </ProFormGroup>
          <ProFormGroup>
            <ProFormText width="lg" name="password" label="修改密码" />
            <ProFormDatePicker
              width="lg"
              name="birth"
              key="birth"
              label="生日"
              rules={[{ required: true, message: '请选择生日!' }]}
            />
            <ProFormText width="lg" name="location" label="联系地址" />
            <ProFormText width="lg" name="graduation" label="毕业院校" />
          </ProFormGroup>
          <ProFormGroup>
            <ProFormSelect
              name="apartment"
              label="部门"
              width="lg"
              options={['教务部', '政教处', '科研室', '年级组', '总务处']}
              placeholder="请选择一个部门"
              rules={[{ required: true, message: '请选择一个部门!' }]}
              disabled
            />
            <ProFormSelect
              name="title"
              label="职称"
              width="lg"
              options={['讲师', '院士', '教授', '工程师', '主任', '辅导员']}
              placeholder="请选择一个职称"
              rules={[{ required: true, message: '请选择一个职称!' }]}
              disabled
            />
            <ProFormSelect
              name="status"
              label="任职状态"
              width="lg"
              options={['在职', '临时离岗', '请假', '离职']}
              placeholder="请选择一个职称"
              rules={[{ required: true, message: '请选择任职状态!' }]}
              disabled
            />
            <ProFormText width="lg" name="education" label="学历" />
          </ProFormGroup>
          <ProFormGroup>
            <ProFormTextArea width={900} name="introduce" label="详细介绍" />
          </ProFormGroup>
        </ProForm>
      </Card>
    </PageHeaderWrapper>
  );
};

export default Settings;
