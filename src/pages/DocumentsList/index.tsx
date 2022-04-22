import { PlusOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';
import { Button, message, Popconfirm } from 'antd';
import { useRef } from 'react';
import { FormattedMessage, useIntl } from 'umi';
import { history } from 'umi';
import { deleteDocuments, getDocuments } from './services';

const DocumentsList: React.FC = () => {
  const intl = useIntl();
  const actionRef = useRef<ActionType>();

  const handleRemove = async (record: any) => {
    const hide = message.loading('正在删除');
    if (!record) return true;
    try {
      let id = record.id;
      await deleteDocuments(id);
      hide();
      message.success('Deleted successfully and will refresh soon');
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
      title: <FormattedMessage id="pages.searchTable.document.id" defaultMessage="公文编号" />,
      dataIndex: 'id',
      search: false,
      hideInTable: true,
    },
    {
      title: <FormattedMessage id="pages.searchTable.document.title" defaultMessage="公文标题" />,
      dataIndex: 'title',
      width: 500,
    },
    {
      title: <FormattedMessage id="pages.searchTable.document.type" defaultMessage="公文类别" />,
      dataIndex: 'type',
      valueType: 'select',
      valueEnum: {
        0: '校务安排',
        1: '教学风采',
      },
      width: 80,
    },
    {
      title: <FormattedMessage id="pages.searchTable.document.author" defaultMessage="公文作者" />,
      dataIndex: 'author',
      search: false,
      width: 80,
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
      title: <FormattedMessage id="pages.searchTable.document.picUrl" defaultMessage="封面图片" />,
      dataIndex: 'picUrl',
      valueType: 'image',
      search: false,
      width: 80,
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
              key="view"
              size="small"
              type="link"
              onClick={() => {
                history.push(`docshow/${record.id}`);
              }}
            >
              <FormattedMessage id="pages.searchTable.view" defaultMessage="查看" />
            </Button>
            <Button
              key="edit"
              size="small"
              type="link"
              onClick={() => {
                history.push('documentslist/newandedit', { initial: record });
              }}
            >
              <FormattedMessage id="pages.searchTable.edit" defaultMessage="修改" />
            </Button>
            <Popconfirm
              title="你确定删除该公文数据吗吗?"
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
            onClick={() => history.push('documentslist/newandedit')}
          >
            <PlusOutlined /> <FormattedMessage id="pages.searchTable.new" defaultMessage="New" />
          </Button>,
        ]}
        request={async (
          params: T & {
            pageSize: number;
            current: number;
            title: string;
            type: number;
            content: string;
          },
          sort,
          filter,
        ) => {
          const { current, pageSize, title, type, content } = params;
          const msg = await getDocuments({
            page: current,
            pageSize: pageSize,
            title,
            type,
            content,
          });
          return {
            data: msg.data.list,
            success: true,
            total: msg.data.pagination.total,
          };
        }}
        columns={columns}
      />
    </PageContainer>
  );
};

export default DocumentsList;
