import React, { useRef, useState } from 'react';
import { message, Popconfirm } from 'antd';
import { Button } from 'antd';
import { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import ProCard from '@ant-design/pro-card';
// @ts-ignore
import styles from './index.less';
import { deleteCourse, getCourses } from './services';
import { FormattedMessage, useAccess } from 'umi';
import { hssfCollege, hssfMajor, sztuCollege, sztuMajor } from '../StudentList/contant';
import { PlusOutlined } from '@ant-design/icons';
import { sztuSemester, sztuTime, sztuWay } from './constant';
import { PageContainer } from '@ant-design/pro-layout';
import NewAndEdit from './newAndEdit';
import { AchievementForm } from './achievementForm';

const DetailList: React.FC = (props: any) => {
  const { title, students, actionRef, achievementId } = props;
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [initial, setIntial] = useState(null);
  const columns: ProColumns[] = [
    {
      title: <FormattedMessage id="pages.searchTable.student.id" defaultMessage="学生编号" />,
      dataIndex: 'id',
      search: false,
      hideInTable: true,
    },
    {
      title: <FormattedMessage id="pages.searchTable.student.sno" defaultMessage="学号" />,
      dataIndex: 'sno',
      width: 120,
    },
    {
      title: <FormattedMessage id="pages.searchTable.student.name" defaultMessage="学生姓名" />,
      dataIndex: 'name',
      width: 100,
    },
    {
      title: <FormattedMessage id="pages.searchTable.student.achievement" defaultMessage="成绩" />,
      dataIndex: 'achievement',
      shouldCellUpdate: (record, prevRecord) => {
        return record !== prevRecord;
      },
      width: 60,
    },
    {
      title: <FormattedMessage id="pages.searchTable.option" defaultMessage="操作" />,
      dataIndex: 'option',
      valueType: 'option',
      key: 'option',
      align: 'center',
      width: 60,
      render: (text, record, _, action) => {
        return [
          <>
            <Button
              key="score"
              size="small"
              type="link"
              onClick={() => {
                if (!record.hasOwnProperty('achievement')) {
                  message.error('请先指定老师授予此课程！');
                  return;
                }
                setIntial({ ...record, ...achievementId });
                setModalVisible(true);
              }}
            >
              <FormattedMessage id="pages.searchTable.score" defaultMessage="打分" />
            </Button>
          </>,
        ];
      },
    },
  ];

  return (
    <>
      <ProTable
        columns={columns}
        dataSource={students}
        headerTitle={title}
        pagination={{
          pageSize: 3,
          showSizeChanger: false,
        }}
        rowKey="id"
        search={false}
        options={false}
        // toolBarRender={false}
      />
      <AchievementForm
        actionRef={actionRef}
        initial={initial}
        setIntial={setIntial}
        createModalVisible={modalVisible}
        setCreateModalVisible={setModalVisible}
      />
    </>
  );
};

type IPListProps = {
  onChange: (id: string) => void;
  student: any;
};

const IPList: React.FC<IPListProps> = (props: any) => {
  const { actionRef, onChange, cname, getCname, setAchievementId } = props;
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [initial, setIntial] = useState(null);
  const { canAdmin } = useAccess();

  const handleRemove = async (record: any) => {
    const hide = message.loading('正在删除');
    if (!record) return true;
    try {
      let id = record.id;
      await deleteCourse(id);
      hide();
      message.success('删除成功！');
      return true;
    } catch (error) {
      hide();
      message.error('Delete failed, please try again');
      return false;
    }
  };

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
      search: false,
    },
    {
      title: '课时',
      key: 'hour',
      dataIndex: 'hour',
      search: false,
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
      valueType: 'dateYear',
    },
    {
      title: '学期',
      key: 'semester',
      dataIndex: 'semester',
      valueType: 'select',
      valueEnum: sztuSemester,
    },
    {
      title: <FormattedMessage id="pages.searchTable.option" defaultMessage="操作" />,
      dataIndex: 'option',
      valueType: 'option',
      key: 'option',
      fixed: 'right',
      align: 'center',
      render: (text, record, _, action) => {
        return [
          <>
            <Button
              key="edit"
              size="small"
              type="link"
              onClick={() => {
                setIntial(record);
                setModalVisible(true);
              }}
            >
              <FormattedMessage id="pages.searchTable.edit" defaultMessage="修改" />
            </Button>
            <Popconfirm
              title="你确定删除该课程数据吗?"
              onConfirm={async () => {
                const success = await handleRemove(record);
                if (success) {
                  actionRef.current && actionRef.current.reload();
                }
              }}
              okText="是"
              cancelText="否"
              key="delete"
            >
              <Button type="text" size="small" danger>
                <FormattedMessage id="pages.searchTable.delete" defaultMessage="删除" />
              </Button>
            </Popconfirm>
          </>,
        ];
      },
    },
  ];
  return (
    <>
      <ProTable
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
            time,
            semester,
          } = params;
          const msg = await getCourses({
            page: current,
            pageSize,
            cname,
            college,
            major,
            className,
            location,
            way,
            hour,
            year,
            time,
            semester,
          });
          return Promise.resolve({
            data: msg.data.list,
            success: true,
            total: msg.data.pagination.total,
          });
        }}
        actionRef={actionRef}
        scroll={{ x: 1300 }}
        rowKey="id"
        rowClassName={(record) => {
          return record.cname === cname ? styles['split-row-select-active'] : '';
        }}
        toolBarRender={() => [
          canAdmin && (
            <Button
              type="primary"
              key="primary"
              onClick={() => {
                setModalVisible(true);
              }}
            >
              <PlusOutlined /> <FormattedMessage id="pages.searchTable.new" defaultMessage="New" />
            </Button>
          ),
        ]}
        // pagination={false}
        search={{
          filterType: 'light',
        }}
        onRow={(record) => {
          return {
            onClick: () => {
              record.students && onChange(record.students);
              record.cname && getCname(record.cname);
              setAchievementId({
                baseId: record.baseId,
                courseId: record.id,
              });
            },
          };
        }}
      />
      <NewAndEdit
        actionRef={actionRef}
        initial={initial}
        setIntial={setIntial}
        createModalVisible={modalVisible}
        setCreateModalVisible={setModalVisible}
      />
    </>
  );
};

const CourseList: React.FC = () => {
  const [cname, setCname] = useState('');
  const [students, setStudents] = useState([]);
  const [achievementId, setAchievementId] = useState({
    baseId: undefined,
    courseId: undefined,
  });
  const actionRef = useRef<ActionType>();

  return (
    <PageContainer>
      <ProCard split="vertical">
        <ProCard colSpan="75%" ghost>
          <IPList
            actionRef={actionRef}
            onChange={(students) => {
              setStudents(students);
            }}
            getCname={(cname) => {
              setCname(cname);
            }}
            setAchievementId={setAchievementId}
            cname={cname}
          />
        </ProCard>
        <ProCard>
          <DetailList
            title={cname}
            students={students}
            actionRef={actionRef}
            achievementId={achievementId}
          />
        </ProCard>
      </ProCard>
    </PageContainer>
  );
};

export default CourseList;
