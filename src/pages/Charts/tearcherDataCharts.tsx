import { Calendar, Card, Col, Row } from 'antd';
import style from './index.less';
import teacherPic from '../../../public/teacher.png';
import { useEffect, useState } from 'react';
import { getTeacherData } from './services';

export const TeacherDataCharts = () => {
  const user_info = JSON.parse(localStorage.getItem('user_info') || '');
  const { id, apartment, title, status } = user_info;

  const [data, setData] = useState([]);
  const getData = async () => {
    let { data } = await getTeacherData(id);
    setData(data);
  };

  useEffect(() => {
    getData();
  }, []);

  const { courseCount, researchCount, documentsCount } = data;

  return (
    <>
      <Col span={12}>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Card bordered={false} style={{ textAlign: 'center' }}>
              <div style={{ display: 'flex' }}>
                <div style={{ margin: '0 20px' }}>
                  <img src={teacherPic} width={'130px'} />
                </div>
                <div style={{ textAlign: 'left', margin: '15px auto' }}>
                  <div className={style.techtitle}>
                    部门：<span className={style.teacher}>{apartment}</span>
                  </div>
                  <div className={style.techtitle}>
                    职称：<span className={style.teacher}>{title}</span>
                  </div>
                  <div className={style.techtitle}>
                    任职状态：<span className={style.teacher}>{status}</span>
                  </div>
                </div>
              </div>
            </Card>
          </Col>
          <Col span={8}>
            <Card bordered={false} style={{ textAlign: 'center' }}>
              <div className={style.title}>课程数</div>
              <span className={style.value}>{courseCount || 0}</span>
            </Card>
          </Col>
          <Col span={8}>
            <Card bordered={false} style={{ textAlign: 'center' }}>
              <div className={style.title}>科研数</div>
              <span className={style.value}>{researchCount || 0}</span>
            </Card>
          </Col>
          <Col span={8}>
            <Card bordered={false} style={{ textAlign: 'center' }}>
              <div className={style.title}>公文数</div>
              <span className={style.value}>{documentsCount || 0}</span>
            </Card>
          </Col>
        </Row>
      </Col>
      <Col span={12}>
        <Card bordered={false} className={style.calendar}>
          <Calendar fullscreen={false} />
        </Card>
      </Col>
    </>
  );
};
