import React from 'react';
import { Card, Tag, Image, Row, Col } from 'antd';
import { useIntl, FormattedMessage, useAccess } from 'umi';
import styles from './Welcome.less';
import { getDocuments } from './DocumentsList/services';
import ProList from '@ant-design/pro-list';
import { history } from 'umi';
import defaultPic from '../../public/logo.png';
import { TeacherCharts } from './Charts/teacherChart';
import { StudentCharts } from './Charts/studentCharts';
import { DataCharts } from './Charts/dataCharts';
import { TeacherDataCharts } from './Charts/tearcherDataCharts';
import { TeacherCourses } from './Charts/teacherCourses';
const Welcome: React.FC = () => {
  const intl = useIntl();
  const { canAdmin } = useAccess();

  return (
    <>
      <div className={styles.box}>
        <Row className={styles.leftBox} gutter={[16, 16]}>
          {canAdmin ? <DataCharts /> : <TeacherDataCharts />}
          {canAdmin ? (
            <>
              <Col span={12}>
                <TeacherCharts />
              </Col>
              <Col span={12}>
                <StudentCharts />
              </Col>
            </>
          ) : (
            <Col span={24}>
              <TeacherCourses />
            </Col>
          )}
        </Row>
        <ProList
          className={styles.rightBox}
          rowKey="id"
          headerTitle="公告栏"
          pagination={{
            pageSize: 10,
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
              render: (text, row) => [
                <div
                  className={styles.title}
                  key={row.id}
                  onClick={() => history.push(`/docshow/${row.id}`)}
                >
                  <span>{text}</span>
                </div>,
              ],
            },
            avatar: {
              dataIndex: 'picUrl',
              search: false,
              render: (_, record) => {
                return <Image src={record.picUrl || defaultPic} width={60} />;
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
          }}
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
            return {
              data: msg.data.list,
              success: true,
              total: msg.data.pagination.total,
            };
          }}
        />
      </div>
    </>
  );
};

export default Welcome;
