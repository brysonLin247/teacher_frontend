import {
  ProFormDatePicker,
  ProFormDigit,
  ProFormGroup,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-form';
import { sztuCollege, sztuMajor, transform } from '../contant';

export const StudentForm = (props) => {
  const { initial } = props;
  return (
    <>
      <ProFormGroup>
        <ProFormText
          width="sm"
          name="sno"
          label="学号"
          rules={[{ required: true, message: '请输入学号!' }]}
          disabled={initial}
        />
        <ProFormText
          width="sm"
          name="name"
          label="姓名"
          rules={[{ required: true, message: '请输入姓名' }]}
        />
        <ProFormDatePicker.Year
          name="year"
          label="年级"
          width="sm"
          fieldProps={{
            format: 'YYYY',
          }}
        />
      </ProFormGroup>
      <ProFormGroup>
        <ProFormSelect
          width="sm"
          name="college"
          key="college"
          label="学院"
          rules={[{ required: true, message: '请选择学院!' }]}
          options={transform(sztuCollege)}
        />
        <ProFormSelect
          width="sm"
          name="major"
          label="专业"
          rules={[{ required: true, message: '请选择专业!' }]}
          options={transform(sztuMajor)}
        />
        <ProFormDigit
          label="班级"
          name="className"
          width="sm"
          min={1}
          max={10}
          rules={[{ required: true, message: '请选择班级!' }]}
        />
      </ProFormGroup>
    </>
  );
};
