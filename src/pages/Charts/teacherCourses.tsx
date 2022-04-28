import { useLocalStroage } from '@/hooks';
import ProTable from '@ant-design/pro-table';
import { Card } from 'antd';
import { useEffect, useState } from 'react';
import { sztuSemester } from '../CourseList/constant';
import { sztuCollege, sztuMajor } from '../StudentList/contant';
import { getBase } from './services';

export const TeacherCourses = () => {
  const { id } = useLocalStroage();

  return (
    <Card title="教师授课情况">
      <ProTable
        columns={[
          { title: '课程名称', dataIndex: 'cname', key: 'cname' },
          { title: '年级', dataIndex: 'year', key: 'year' },
          { title: '学院', dataIndex: 'college', key: 'college', valueEnum: sztuCollege },
          { title: '专业', dataIndex: 'major', key: 'major', valueEnum: sztuMajor },
          {
            title: '班级',
            dataIndex: 'className',
            key: 'className',
            render: (text) => <div>{text}班</div>,
          },
          { title: '学期', dataIndex: 'semester', key: 'semester', valueEnum: sztuSemester },
        ]}
        // headerTitle={'教师授课情况'}
        search={false}
        // options={false}
        request={async () => {
          const data = await getBase(id);
          return {
            data: data.info.courses,
            success: true,
          };
        }}
        pagination={{
          pageSize: 5,
        }}
      />
    </Card>
  );
};
