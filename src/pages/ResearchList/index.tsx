import { PlusOutlined } from '@ant-design/icons';
import { Button, message, Drawer, Popconfirm } from 'antd';
import React, { useState, useRef } from 'react';
import { useIntl, FormattedMessage } from 'umi';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type { ProDescriptionsItemProps } from '@ant-design/pro-descriptions';
import ProDescriptions from '@ant-design/pro-descriptions';
import { deleteResearch, getResearches } from './services';
import CreateAndEditForm from './components/CreateAndEditForm';
import { saveAs } from 'file-saver';

const ResearchList: React.FC = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [initial, setIntial] = useState(null);

  const [showDetail, setShowDetail] = useState<boolean>(false);

  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.RuleListItem>();
  const [selectedRowsState, setSelectedRows] = useState<API.RuleListItem[]>([]);

  const intl = useIntl();

  const handleRemove = async (research: any) => {
    const hide = message.loading('正在删除');
    if (!research) return true;
    try {
      await deleteResearch(research.researchId);
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

  const columns: ProColumns<API.RuleListItem>[] = [
    {
      title: '科研编号',
      dataIndex: 'researchId',
      search: false,
      hideInTable: true,
    },
    {
      title: '教师编号',
      dataIndex: 'baseId',
      search: false,
      hideInTable: true,
    },
    {
      title: <FormattedMessage id="pages.searchTable.researchName" defaultMessage="科研名称" />,
      dataIndex: 'researchName',
      width: 150,
    },
    {
      title: <FormattedMessage id="pages.searchTable.field" defaultMessage="科研领域" />,
      dataIndex: 'field',
      width: 120,
      valueType: 'select',
      valueEnum: {
        0: '智能制造',
        1: '人工智能',
        2: '数字化与互联网',
        3: '生命健康与医疗',
        4: '节能环保与新材料',
      },
    },
    {
      title: <FormattedMessage id="pages.searchTable.category" defaultMessage="项目类别" />,
      dataIndex: 'category',
      width: 120,
      valueType: 'select',
      valueEnum: {
        0: '国际合作项目',
        1: '校企合作项目',
        2: '国家科学基金',
        3: '科技学术竞赛',
      },
    },
    {
      title: <FormattedMessage id="pages.searchTable.cost" defaultMessage="预申请经费" />,
      dataIndex: 'cost',
      search: false,
      width: 100,
    },
    {
      title: <FormattedMessage id="pages.searchTable.tearcherName" defaultMessage="教师名" />,
      dataIndex: 'tearcherName',
      width: 80,
      search: false,
    },
    {
      title: <FormattedMessage id="pages.searchTable.review" defaultMessage="审核情况" />,
      dataIndex: 'review',
      width: 80,
      valueType: 'select',
      valueEnum: {
        0: { text: '审核中', status: 'Processing' },
        1: { text: '已通过', status: 'Success' },
        2: { text: '未通过', status: 'Error' },
      },
    },
    {
      title: <FormattedMessage id="pages.searchTable.reviewer" defaultMessage="审核人" />,
      dataIndex: 'reviewer',
      width: 80,
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
      title: <FormattedMessage id="pages.searchTable.introduce" defaultMessage="详细介绍" />,
      dataIndex: 'description',
      ellipsis: true,
      copyable: true,
      search: false,
      width: 200,
    },
    {
      title: <FormattedMessage id="pages.searchTable.option" defaultMessage="操作" />,
      dataIndex: 'option',
      valueType: 'option',
      fixed: 'right',
      align: 'center',
      width: 200,
      render: (_, record) => {
        return [
          <Button
            key="download"
            size="small"
            // color="red"
            type="link"
            onClick={async () => {
              record.files?.map((file) => {
                saveAs(`/static/${file.fileName}`, `${file.fileName}`);
              });
            }}
          >
            <FormattedMessage id="pages.searchTable.download" defaultMessage="下载文件" />
          </Button>,
          !record.review && (
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
                title="你确定删除该科研数据吗吗?"
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
              ,
            </>
          ),
        ];
      },
    },
  ];

  return (
    <PageContainer>
      <ProTable<API.RuleListItem, API.PageParams>
        headerTitle={intl.formatMessage({
          id: 'pages.searchTable.research',
          defaultMessage: 'Enquiry form',
        })}
        actionRef={actionRef}
        scroll={{ x: 1300 }}
        rowKey="researchId"
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
          // 第一个参数 params 查询表单和 params 参数的结合
          // 第一个参数中一定会有 pageSize 和  current ，这两个参数是 antd 的规范
          params: T & {
            pageSize: number;
            current: number;
            researchName: string;
            field: number;
            category: number;
            review: number;
            reviewer: string;
          },
          sort,
          filter,
        ) => {
          // 这里需要返回一个 Promise,在返回之前你可以进行数据转化
          // 如果需要转化参数可以在这里进行修改
          const { current, pageSize, researchName, field, category, review, reviewer } = params;
          const msg = await getResearches({
            page: current,
            pageSize: pageSize,
            researchName,
            field,
            category,
            review,
            reviewer,
          });
          return {
            data: msg.data.list,
            success: true,
            total: msg.data.pagination.total,
          };
        }}
        columns={columns}
      />
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              <FormattedMessage id="pages.searchTable.chosen" defaultMessage="Chosen" />{' '}
              <a style={{ fontWeight: 600 }}>{selectedRowsState.length}</a>{' '}
              <FormattedMessage id="pages.searchTable.item" defaultMessage="项" />
            </div>
          }
        >
          <Button
            onClick={async () => {
              setSelectedRows([]);
              actionRef.current?.reloadAndRest?.();
            }}
          >
            <FormattedMessage
              id="pages.searchTable.batchDeletion"
              defaultMessage="Batch deletion"
            />
          </Button>
        </FooterToolbar>
      )}

      <CreateAndEditForm
        actionRef={actionRef}
        initial={initial}
        setIntial={setIntial}
        createModalVisible={modalVisible}
        setCreateModalVisible={setModalVisible}
      />

      <Drawer
        width={600}
        visible={showDetail}
        onClose={() => {
          setCurrentRow(undefined);
          setShowDetail(false);
        }}
        closable={false}
      >
        {currentRow?.name && (
          <ProDescriptions<API.RuleListItem>
            column={2}
            title={currentRow?.name}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.name,
            }}
            columns={columns as ProDescriptionsItemProps<API.RuleListItem>[]}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};

export default ResearchList;
