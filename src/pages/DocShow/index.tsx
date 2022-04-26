import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { useParams } from 'umi';
import { getDocument } from '../DocumentsList/services';

const valueEnum = {
  0: '校务安排',
  1: '教学风采',
};

const { Title, Paragraph, Text, Link } = Typography;
const DocShow: React.FC = () => {
  const { id } = useParams();
  const [doc, setDoc] = useState({
    title: '',
    type: '',
    author: '',
    content: '',
    createTime: '',
  });

  const getDoc = async () => {
    const result = await getDocument(id);
    setDoc(result);
  };

  useEffect(() => {
    getDoc();
  }, []);

  const { title, type, author, content, createTime } = doc;
  return (
    <PageHeaderWrapper>
      <Card style={{ margin: '0 auto', width: '100%' }}>
        <Typography>
          <Title level={2} style={{ textAlign: 'center' }}>
            {title}
          </Title>
          <Title level={5} style={{ textAlign: 'center' }}>
            类别：{valueEnum[type]} &nbsp;&nbsp;&nbsp;&nbsp; 作者：{author} &nbsp;&nbsp;&nbsp;&nbsp;
            创建时间：{createTime}
          </Title>

          <Text>
            <span dangerouslySetInnerHTML={{ __html: content }}></span>
          </Text>
        </Typography>
      </Card>
    </PageHeaderWrapper>
  );
};

export default DocShow;
