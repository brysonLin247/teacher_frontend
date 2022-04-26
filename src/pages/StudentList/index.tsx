import { PlusOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';
import { Button, message, Popconfirm } from 'antd';
import { useRef, useState } from 'react';
import { FormattedMessage, useIntl } from 'umi';
import { history } from 'umi';
import { sztuCollege, sztuMajor } from './contant';
import NewAndEdit from './newAndEdit';
import { StudentForm } from './newAndEdit/studentForm';
import { deleteStudent, getStudents } from './services';

const StudentList: React.FC = () => {
  const intl = useIntl();
  const actionRef = useRef<ActionType>();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [initial, setIntial] = useState(null);

  const handleRemove = async (record: any) => {
    const hide = message.loading('正在删除');
    if (!record) return true;
    try {
      let id = record.id;
      await deleteStudent(id);
      hide();
      message.success('删除成功！');
      actionRef.current && actionRef.current.reload();
      return true;
    } catch (error) {
      hide();
      message.error('Delete failed, please try again');
      return false;
    }
  };

  const columns: ProColumns<any>[] = [
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
      title: <FormattedMessage id="pages.searchTable.student.year" defaultMessage="年级" />,
      dataIndex: 'year',
      width: 100,
    },
    {
      title: <FormattedMessage id="pages.searchTable.student.college" defaultMessage="学院" />,
      dataIndex: 'college',
      valueType: 'select',
      valueEnum: sztuCollege,
    },
    {
      title: <FormattedMessage id="pages.searchTable.student.major" defaultMessage="专业" />,
      dataIndex: 'major',
      valueType: 'select',
      valueEnum: sztuMajor,
      fieldProps: {
        showSearch: true,
      },
    },
    {
      title: <FormattedMessage id="pages.searchTable.student.className" defaultMessage="班级" />,
      dataIndex: 'className',
      width: 80,
      render: (text) => <div>{text}班</div>,
    },
    {
      title: <FormattedMessage id="pages.searchTable.createTime" defaultMessage="创建时间" />,
      dataIndex: 'createTime',
      valueType: 'dateTime',
      search: false,
    },
    {
      title: <FormattedMessage id="pages.searchTable.updateTime" defaultMessage="更新时间" />,
      dataIndex: 'updateTime',
      valueType: 'dateTime',
      search: false,
    },
    {
      title: <FormattedMessage id="pages.searchTable.option" defaultMessage="操作" />,
      dataIndex: 'option',
      valueType: 'option',
      fixed: 'right',
      align: 'center',
      render: (_, record) => {
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
              title="你确定删除该学生数据吗吗?"
              onConfirm={async () => {
                await handleRemove(record);
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
    <PageContainer>
      <ProTable
        headerTitle={intl.formatMessage({
          id: 'pages.searchTable.documents',
          defaultMessage: 'Enquiry form',
        })}
        actionRef={actionRef}
        scroll={{ x: 1300 }}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              setModalVisible(true);
            }}
          >
            <PlusOutlined /> <FormattedMessage id="pages.searchTable.new" defaultMessage="New" />
          </Button>,
        ]}
        request={async (
          params: T & {
            pageSize: number;
            current: number;
            sno: string;
            name: string;
            college: number;
            major: number;
            className: number;
            year: number;
          },
          sort,
          filter,
        ) => {
          const { current, pageSize, sno, name, college, major, className, year } = params;
          const msg = await getStudents({
            page: current,
            pageSize: pageSize,
            sno,
            name,
            college,
            major,
            className,
            year,
          });
          return {
            data: msg.data.list,
            success: true,
            total: msg.data.pagination.total,
          };
        }}
        columns={columns}
      />
      <NewAndEdit
        actionRef={actionRef}
        initial={initial}
        setIntial={setIntial}
        createModalVisible={modalVisible}
        setCreateModalVisible={setModalVisible}
      />
    </PageContainer>
  );
};

export default StudentList;
