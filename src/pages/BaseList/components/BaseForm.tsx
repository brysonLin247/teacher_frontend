import {
  ProFormDatePicker,
  ProFormGroup,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-form';

export const BaseForm = () => {
  return (
    <>
      <ProFormGroup>
        <ProFormText
          width="sm"
          name="name"
          key="name"
          label="姓名"
          rules={[{ required: true, message: '请选择姓名!' }]}
        />
        <ProFormText
          width="sm"
          name="telephone"
          label="手机号码"
          rules={[{ required: true, message: '请选择手机号码!' }]}
        />
        <ProFormRadio.Group name="sex" key="sex" label="性别" width="sm" options={['女', '男']} />
      </ProFormGroup>
      <ProFormGroup>
        <ProFormDatePicker
          width="sm"
          name="birth"
          key="birth"
          label="生日"
          rules={[{ required: true, message: '请选择生日!' }]}
        />
        <ProFormText width="sm" name="location" label="联系地址" />
        <ProFormText width="sm" name="graduation" label="毕业院校" />
      </ProFormGroup>
      <ProFormGroup>
        <ProFormSelect
          name="apartment"
          label="部门"
          width="sm"
          options={['教务部', '政教处', '科研室', '年级组', '总务处']}
          placeholder="请选择一个部门"
          rules={[{ required: true, message: '请选择一个部门!' }]}
        />
        <ProFormSelect
          name="title"
          label="职称"
          width="sm"
          options={['讲师', '院士', '教授', '工程师', '主任', '辅导员']}
          placeholder="请选择一个职称"
          rules={[{ required: true, message: '请选择一个职称!' }]}
        />
        <ProFormText width="sm" name="education" label="学历" />
      </ProFormGroup>
      <ProFormGroup>
        <ProFormTextArea width={465} name="introduce" label="详细介绍" />
        <ProFormSelect
          name="status"
          label="任职状态"
          width="sm"
          options={['在职', '临时离岗', '请假', '离职']}
          placeholder="请选择一个职称"
          rules={[{ required: true, message: '请选择任职状态!' }]}
        />
      </ProFormGroup>
    </>
  );
};
