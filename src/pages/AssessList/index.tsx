import { PlusOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';
import { Button, Popconfirm } from 'antd';
import { useRef, useState } from 'react';
import { FormattedMessage, useIntl } from 'umi';
import { getAssess } from './services';

const AssessList = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const intl = useIntl();

  const columns: ProColumns[] = [
    {
      title: '序号',
      dataIndex: 'id',
      search: false,
      hideInTable: true,
    },
    {
      title: <FormattedMessage id="pages.searchTable.sno" defaultMessage="学号" />,
      dataIndex: 'sno',
      width: 150,
    },
    {
      title: <FormattedMessage id="pages.searchTable.stuName" defaultMessage="学生姓名" />,
      dataIndex: 'name',
    },
    {
      title: <FormattedMessage id="pages.searchTable.Tname" defaultMessage="教师姓名" />,
      dataIndex: 'Tname',
    },
    {
      title: <FormattedMessage id="pages.searchTable.Tcourse" defaultMessage="课程名称" />,
      dataIndex: 'Tcourse',
    },

    {
      title: <FormattedMessage id="pages.searchTable.className" defaultMessage="班级" />,
      dataIndex: 'className',
    },
    {
      title: <FormattedMessage id="pages.searchTable.achievement" defaultMessage="评测成绩" />,
      dataIndex: 'achievement',
    },
    {
      title: <FormattedMessage id="pages.searchTable.createTime" defaultMessage="创建时间" />,
      dataIndex: 'createTime',
      valueType: 'dateTime',
      search: false,
      width: 200,
    },
    {
      title: <FormattedMessage id="pages.searchTable.updateTime" defaultMessage="更新时间" />,
      dataIndex: 'updateTime',
      valueType: 'dateTime',
      search: false,
      width: 200,
    },
    {
      title: <FormattedMessage id="pages.searchTable.titles" defaultMessage="职称" />,
      dataIndex: 'remark',
      valueType: 'textarea',
    },
    {
      title: <FormattedMessage id="pages.searchTable.option" defaultMessage="操作" />,
      dataIndex: 'option',
      valueType: 'option',
      fixed: 'right',
      align: 'center',
      // hideInTable: !canAdmin,
      width: 200,
      render: (_, record) => {
        return [
          <a
            key="edit"
            onClick={() => {
              // setIntial(record);
              setModalVisible(true);
            }}
          >
            <FormattedMessage id="pages.searchTable.edit" defaultMessage="修改" />
          </a>,
          <Popconfirm
            title="你确定删除该教师信息吗?"
            onConfirm={async () => {
              // await handleRemove([record]);
            }}
            okText="是"
            cancelText="否"
          >
            <a href="#">
              <FormattedMessage id="pages.searchTable.delete" defaultMessage="删除" />
            </a>
          </Popconfirm>,
        ];
      },
    },
  ];

  return (
    <PageContainer>
      <ProTable
        headerTitle={intl.formatMessage({
          id: 'pages.searchTable.award',
          defaultMessage: '测评数据',
        })}
        actionRef={actionRef}
        scroll={{ x: 1300 }}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        // pagination={{}}
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
        // request={rule}
        request={async (
          params: T & {
            pageSize: number;
            current: number;
            name: string;
            sex: string;
            telephone: string;
            status: string;
            apartment: string;
            title: string;
          },
          sort,
          filter,
        ) => {
          // 这里需要返回一个 Promise,在返回之前你可以进行数据转化
          // 如果需要转化参数可以在这里进行修改
          const { current, pageSize } = params;
          const msg = await getAssess({
            page: current,
            pageSize: pageSize,
          });
          return {
            data: msg.data.list,
            success: true,
            total: msg.data.pagination.total,
          };
        }}
        columns={columns}
      />
      {/* <CreatForm
        actionRef={actionRef}
        initial={initial}
        setIntial={setIntial}
        createModalVisible={modalVisible}
        setCreateModalVisible={setModalVisible}
      /> */}
    </PageContainer>
  );
};

export default AssessList;
