import { Calendar, Card, Col, Radio, Row, Select, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { getAllData } from './services';
import style from './index.less';

export const DataCharts = () => {
  const [data, setData] = useState([]);
  const getData = async () => {
    let { data } = await getAllData();
    setData(data);
  };

  useEffect(() => {
    getData();
  }, []);

  const { baseCount, studentCount, courseCount, researchCount, documentsCount, achievementCount } =
    data;
  return (
    <>
      <Col span={12}>
        <Row gutter={[16, 16]}>
          <Col span={8}>
            <Card bordered={false} style={{ textAlign: 'center' }}>
              <div className={style.title}>教师数</div>
              <span className={style.value}>{baseCount || 0}</span>
            </Card>
          </Col>
          <Col span={8}>
            <Card bordered={false} style={{ textAlign: 'center' }}>
              <div className={style.title}>学生数</div>
              <span className={style.value}>{studentCount || 0}</span>
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
          <Col span={8}>
            <Card bordered={false} style={{ textAlign: 'center' }}>
              <div className={style.title}>成绩数</div>
              <span className={style.value}>{achievementCount || 0}</span>
            </Card>
          </Col>
        </Row>
      </Col>
      <Col span={12}>
        <Card bordered={false} className={style.calendar}>
          <Calendar
            fullscreen={false}
            // headerRender={({ value, type, onChange, onTypeChange }) => {
            //   const start = 0;
            //   const end = 12;
            //   const monthOptions = [];

            //   const current = value.clone();
            //   const localeData = value.localeData();
            //   const months = [];
            //   for (let i = 0; i < 12; i++) {
            //     current.month(i);
            //     months.push(localeData.monthsShort(current));
            //   }

            //   for (let index = start; index < end; index++) {
            //     monthOptions.push(
            //       <Select.Option className="month-item" key={`${index}`}>
            //         {months[index]}
            //       </Select.Option>,
            //     );
            //   }
            //   const month = value.month();

            //   const year = value.year();
            //   const options = [];
            //   for (let i = year - 10; i < year + 10; i += 1) {
            //     options.push(
            //       <Select.Option key={i} value={i} className="year-item">
            //         {i}
            //       </Select.Option>,
            //     );
            //   }
            //   return (
            //     <div style={{ padding: 8 }}>
            //       <Typography.Title level={4}>Custom header</Typography.Title>
            //       <Row gutter={8}>
            //         <Col>
            //           <Radio.Group
            //             size="small"
            //             onChange={(e) => onTypeChange(e.target.value)}
            //             value={type}
            //           >
            //             <Radio.Button value="month">Month</Radio.Button>
            //             <Radio.Button value="year">Year</Radio.Button>
            //           </Radio.Group>
            //         </Col>
            //         <Col>
            //           <Select
            //             size="small"
            //             dropdownMatchSelectWidth={false}
            //             className="my-year-select"
            //             onChange={(newYear) => {
            //               const now = value.clone().year(newYear);
            //               onChange(now);
            //             }}
            //             value={String(year)}
            //           >
            //             {options}
            //           </Select>
            //         </Col>
            //         <Col>
            //           <Select
            //             size="small"
            //             dropdownMatchSelectWidth={false}
            //             value={String(month)}
            //             onChange={(selectedMonth) => {
            //               const newValue = value.clone();
            //               newValue.month(parseInt(selectedMonth, 10));
            //               onChange(newValue);
            //             }}
            //           >
            //             {monthOptions}
            //           </Select>
            //         </Col>
            //       </Row>
            //     </div>
            //   );
            // }}
          />
        </Card>
      </Col>
    </>
  );
};
