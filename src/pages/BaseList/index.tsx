import { PlusOutlined } from '@ant-design/icons';
import { Button, message, Drawer, Popconfirm } from 'antd';
import React, { useState, useRef } from 'react';
import { useIntl, FormattedMessage, useAccess } from 'umi';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type { ProDescriptionsItemProps } from '@ant-design/pro-descriptions';
import ProDescriptions from '@ant-design/pro-descriptions';
import { updateRule } from '@/services/ant-design-pro/api';
import CreatForm from './components/CreateForm';
import { deleteBase, getBases } from './services';

const valueEnum = {
  男: { text: '男' },
  女: { text: '女' },
};

/**
 * @en-US Update node
 * @zh-CN 更新节点
 *
 * @param fields
 */
const handleUpdate = async (fields: FormValueType) => {
  const hide = message.loading('Configuring');
  try {
    await updateRule({
      name: fields.name,
      desc: fields.desc,
      key: fields.key,
    });
    hide();

    message.success('Configuration is successful');
    return true;
  } catch (error) {
    hide();
    message.error('Configuration failed, please try again!');
    return false;
  }
};

const TableList: React.FC = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [initial, setIntial] = useState(null);

  const [showDetail, setShowDetail] = useState<boolean>(false);

  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.RuleListItem>();
  const [selectedRowsState, setSelectedRows] = useState<API.RuleListItem[]>([]);

  const { canAdmin } = useAccess();

  const intl = useIntl();

  /**
   *  Delete node
   * @zh-CN 删除节点
   *
   * @param selectedRows
   */
  const handleRemove = async (selectedRows: API.RuleListItem[]) => {
    const hide = message.loading('正在删除');
    if (!selectedRows) return true;
    try {
      await deleteBase(selectedRows.map((row) => row.id));
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

  const columns: ProColumns<API.RuleListItem>[] = [
    {
      title: '序号',
      dataIndex: 'id',
      search: false,
      hideInTable: true,
    },
    {
      title: <FormattedMessage id="pages.searchTable.name" defaultMessage="姓名" />,
      dataIndex: 'name',
      width: 80,
    },
    {
      title: <FormattedMessage id="pages.searchTable.telephone" defaultMessage="手机号码" />,
      dataIndex: 'telephone',
      valueType: 'textarea',
      width: 120,
    },
    {
      title: <FormattedMessage id="pages.searchTable.sex" defaultMessage="性别" />,
      dataIndex: 'sex',
      valueType: 'radio',
      valueEnum,
      width: 50,
    },
    {
      title: <FormattedMessage id="pages.searchTable.birth" defaultMessage="生日" />,
      dataIndex: 'birth',
      valueType: 'date',
      search: false,
      width: 120,
    },
    {
      title: <FormattedMessage id="pages.searchTable.apartment" defaultMessage="部门" />,
      dataIndex: 'apartment',
      valueType: 'select',
      valueEnum: {
        0: '教务部',
        1: '政教处',
        2: '科研室',
        3: '年级组',
        4: '总务处',
      },
      width: 80,
    },
    {
      title: <FormattedMessage id="pages.searchTable.titles" defaultMessage="职称" />,
      dataIndex: 'title',
      valueType: 'select',
      valueEnum: {
        0: '讲师',
        1: '院士',
        2: '教授',
        3: '工程师',
        4: '主任',
        5: '辅导员',
      },
      width: 80,
    },
    {
      title: <FormattedMessage id="pages.searchTable.status" defaultMessage="任职状态" />,
      dataIndex: 'status',
      valueType: 'select',
      width: 100,
      valueEnum: {
        在职: { text: '在职', status: 'Processing' },
        临时离岗: { text: '临时离岗', status: 'Default' },
        请假: { text: '请假', status: 'Success' },
        离职: { text: '离职', status: 'Error' },
      },
    },
    {
      title: <FormattedMessage id="pages.searchTable.location" defaultMessage="联系地址" />,
      dataIndex: 'location',
      valueType: 'textarea',
      search: false,
      width: 200,
    },
    {
      title: <FormattedMessage id="pages.searchTable.graduation" defaultMessage="毕业院校" />,
      dataIndex: 'graduation',
      valueType: 'textarea',
      search: false,
      width: 150,
    },
    {
      title: <FormattedMessage id="pages.searchTable.education" defaultMessage="学历" />,
      dataIndex: 'education',
      valueType: 'textarea',
      search: false,
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
      dataIndex: 'introduce',
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
      hideInTable: !canAdmin,
      width: 120,
      render: (_, record) => {
        return (
          canAdmin && [
            <a
              key="edit"
              onClick={() => {
                setIntial(record);
                setModalVisible(true);
              }}
            >
              <FormattedMessage id="pages.searchTable.edit" defaultMessage="修改" />
            </a>,
            <Popconfirm
              title="你确定删除该教师信息吗?"
              onConfirm={async () => {
                await handleRemove([record]);
              }}
              okText="是"
              cancelText="否"
            >
              <a href="#">
                <FormattedMessage id="pages.searchTable.delete" defaultMessage="删除" />
              </a>
            </Popconfirm>,
          ]
        );
      },
    },
  ];

  return (
    <PageContainer>
      <ProTable<API.RuleListItem, API.PageParams>
        headerTitle={intl.formatMessage({
          id: 'pages.searchTable.base',
          defaultMessage: 'Enquiry form',
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
          // 第一个参数 params 查询表单和 params 参数的结合
          // 第一个参数中一定会有 pageSize 和  current ，这两个参数是 antd 的规范
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
          const { current, pageSize, name, sex, telephone, status, apartment, title } = params;
          const msg = await getBases({
            page: current,
            pageSize: pageSize,
            name,
            sex,
            telephone,
            status,
            apartment,
            title,
          });
          return {
            data: msg.data.list,
            success: true,
            total: msg.data.pagination.total,
          };
        }}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows);
          },
        }}
      />
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              <FormattedMessage id="pages.searchTable.chosen" defaultMessage="Chosen" />{' '}
              <a style={{ fontWeight: 600 }}>{selectedRowsState.length}</a>{' '}
              <FormattedMessage id="pages.searchTable.item" defaultMessage="项" />
              &nbsp;&nbsp;
              <span>
                <FormattedMessage
                  id="pages.searchTable.totalServiceCalls"
                  defaultMessage="Total number of service calls"
                />
                {selectedRowsState.reduce((pre, item) => pre + item.callNo!, 0)}
                <FormattedMessage id="pages.searchTable.tenThousand" defaultMessage="万" />
              </span>
            </div>
          }
        >
          <Button
            onClick={async () => {
              await handleRemove(selectedRowsState);
              setSelectedRows([]);
              actionRef.current?.reloadAndRest?.();
            }}
          >
            <FormattedMessage
              id="pages.searchTable.batchDeletion"
              defaultMessage="Batch deletion"
            />
          </Button>
          <Button type="primary">
            <FormattedMessage
              id="pages.searchTable.batchApproval"
              defaultMessage="Batch approval"
            />
          </Button>
        </FooterToolbar>
      )}

      <CreatForm
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

export default TableList;
