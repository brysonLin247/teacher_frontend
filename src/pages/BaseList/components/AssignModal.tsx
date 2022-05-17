import { sztuSemester, sztuTime, sztuWay } from '@/pages/CourseList/constant';
import { getCourses } from '@/pages/CourseList/services';
import { hssfCollege, hssfMajor, sztuCollege, sztuMajor } from '@/pages/StudentList/contant';
import { ModalForm } from '@ant-design/pro-form';
import ProTable, { ProColumns } from '@ant-design/pro-table';
import { Form, Table } from 'antd';
import { useState } from 'react';
import { assignCourses } from '../services';

export const AssignModal = (props) => {
  const { base, actionRef, assignVisible, setAssignVisible } = props;
  const { baseId, courses } = base;
  const [selectCourses, setSelectCourses] = useState([]);
  console.log(courses);
  const columns: ProColumns[] = [
    {
      title: '课程名称',
      key: 'cname',
      dataIndex: 'cname',
    },
    {
      title: '学分',
      key: 'credit',
      dataIndex: 'credit',
    },
    {
      title: '课时',
      key: 'hour',
      dataIndex: 'hour',
    },
    {
      title: '学院',
      key: 'college',
      dataIndex: 'college',
      valueType: 'select',
      valueEnum: hssfCollege,
    },
    {
      title: '专业',
      key: 'major',
      dataIndex: 'major',
      valueType: 'select',
      valueEnum: hssfMajor,
      fieldProps: {
        showSearch: true,
      },
    },
    {
      title: '班级',
      key: 'className',
      dataIndex: 'className',
      render: (text) => <div>{text}班</div>,
    },
    {
      title: '地点',
      key: 'location',
      dataIndex: 'location',
      search: false,
    },
    {
      title: '上课时间',
      key: 'time',
      dataIndex: 'time',
      valueType: 'select',
      valueEnum: sztuTime,
    },
    {
      title: '上课方式',
      key: 'way',
      dataIndex: 'way',
      valueType: 'select',
      valueEnum: sztuWay,
    },
    {
      title: '年级',
      key: 'year',
      dataIndex: 'year',
    },
    {
      title: '学期',
      key: 'semester',
      dataIndex: 'semester',
      valueType: 'select',
      valueEnum: sztuSemester,
    },
  ];
  return (
    <ModalForm
      width={1000}
      title={'分配课程'}
      visible={assignVisible}
      onVisibleChange={setAssignVisible}
      onFinish={async () => {
        const success = await assignCourses(baseId, { courses: selectCourses });
        if (success) {
          setAssignVisible(false);
          actionRef.current && actionRef.current.reload();
        }
      }}
      modalProps={{
        destroyOnClose: true,
        forceRender: false,
      }}
    >
      <Form.Item name="courses">
        <ProTable
          rowKey="id"
          rowSelection={{
            defaultSelectedRowKeys: courses,
            onChange: (selectedRowKeys) => {
              setSelectCourses(selectedRowKeys as never[]);
            },
          }}
          search={{
            filterType: 'light',
          }}
          pagination={{
            pageSize: 5,
          }}
          columns={columns}
          request={async (params) => {
            const {
              current,
              pageSize,
              cname,
              college,
              major,
              className,
              location,
              hour,
              way,
              year,
              semester,
            } = params;
            const msg = await getCourses({
              page: current,
              pageSize,
              filter: true,
              baseId,
              cname,
              college,
              major,
              className,
              location,
              way,
              hour,
              year,
              semester,
            });
            return Promise.resolve({
              data: msg.data.list,
              success: true,
              total: msg.data.pagination.total,
            });
          }}
        />
      </Form.Item>
    </ModalForm>
  );
};
