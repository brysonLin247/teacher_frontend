import React, { useEffect, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Tag, Image } from 'antd';
import { useIntl, FormattedMessage } from 'umi';
import styles from './Welcome.less';
import { getDocuments } from './DocumentsList/services';
import ProList from '@ant-design/pro-list';
import { history } from 'umi';
import defaultPic from '../../public/logo.png';
const Welcome: React.FC = () => {
  const intl = useIntl();

  return (
    <PageContainer>
      <div className={styles.box}>
        <Card className={styles.leftBox}></Card>
        <ProList
          className={styles.rightBox}
          rowKey="id"
          headerTitle="公告栏"
          pagination={{
            pageSize: 5,
          }}
          split={true}
          showActions="hover"
          search={{
            filterType: 'light',
          }}
          metas={{
            title: {
              dataIndex: 'title',
              title: '公告名称',
            },
            avatar: {
              dataIndex: 'picUrl',
              search: false,
              render: (_, record) => {
                return <Image src={record.picUrl || defaultPic} width={40} />;
              },
            },
            subTitle: {
              dataIndex: 'type',
              valueType: 'select',
              valueEnum: {
                0: '校务安排',
                1: '教学风采',
              },
              title: '公告类别',
              render: (type) => {
                return <Tag color="#5BD8A6">{type}</Tag>;
              },
            },
            actions: {
              render: (text, row) => [
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  key="view"
                  onClick={() => history.push(`/docshow/${row.id}`)}
                >
                  查看
                </a>,
              ],
            },
          }}
          // dataSource={docList}
          request={async (
            params: T & {
              pageSize: number;
              current: number;
              title: string;
              type: number;
              content: string;
            },
          ) => {
            const { current, pageSize, title, type, content } = params;
            const msg = await getDocuments({
              page: current,
              pageSize: pageSize,
              title,
              type,
              content,
            });
            console.log(msg);
            return {
              data: msg.data.list,
              success: true,
              total: msg.data.pagination.total,
            };
          }}
        />
      </div>
    </PageContainer>
  );
};

export default Welcome;
