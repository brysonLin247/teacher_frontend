import {
  hssfCollege,
  hssfMajor,
  sztuCollege,
  sztuMajor,
  transform,
} from '@/pages/StudentList/contant';
import {
  ProFormDatePicker,
  ProFormDigit,
  ProFormGroup,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-form';
import { sztuSemester, sztuTime, sztuWay } from '../constant';

export const CourseForm = () => {
  return (
    <>
      <ProFormGroup>
        <ProFormText
          width="sm"
          name="cname"
          label="课程名称"
          rules={[{ required: true, message: '请输入课程名称!' }]}
        />
        <ProFormText
          width="sm"
          name="credit"
          label="学分"
          rules={[{ required: true, message: '请输入学分！' }]}
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
          label="学院"
          rules={[{ required: true, message: '请选择学院!' }]}
          options={transform(hssfCollege)}
        />
        <ProFormSelect
          width="sm"
          name="major"
          label="专业"
          rules={[{ required: true, message: '请选择专业!' }]}
          options={transform(hssfMajor)}
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
      <ProFormGroup>
        <ProFormText
          width="sm"
          name="hour"
          label="课时"
          rules={[{ required: true, message: '请输入课时！' }]}
        />
        <ProFormText
          width="sm"
          name="location"
          label="上课地点"
          rules={[{ required: true, message: '请输入上课地点！' }]}
        />
        <ProFormSelect
          width="sm"
          name="way"
          label="上课方式"
          rules={[{ required: true, message: '请选择上课方式!' }]}
          options={transform(sztuWay)}
        />
      </ProFormGroup>
      <ProFormGroup>
        <ProFormSelect
          width="sm"
          name="semester"
          label="学期"
          rules={[{ required: true, message: '请选择学期!' }]}
          options={transform(sztuSemester)}
        />
        <ProFormSelect
          width="sm"
          name="time"
          label="上课时间"
          rules={[{ required: true, message: '请选择上课时间!' }]}
          options={transform(sztuTime)}
        />
      </ProFormGroup>
    </>
  );
};
