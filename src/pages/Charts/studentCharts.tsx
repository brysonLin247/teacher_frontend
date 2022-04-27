import { Bar } from '@ant-design/charts';
import { useEffect, useState } from 'react';
import { sztuCollege } from '../StudentList/contant';
import { getStudentCharts } from './services';

export const StudentCharts = () => {
  const [chartData, setChartData] = useState([]);

  const getData = async () => {
    let { data } = await getStudentCharts();
    data?.map((d) => {
      d.人数 = Number(d.人数);
      d.type = sztuCollege[d.type];
      return d;
    });
    setChartData(data);
  };

  useEffect(() => {
    getData();
  }, []);

  const config = {
    data: chartData,
    xField: '人数',
    yField: 'type',
    yAxis: {
      label: {
        autoRotate: false,
      },
    },
    scrollbar: {
      type: 'vertical',
    },
  };
  return (
    <div style={{ height: '250px' }}>
      <Bar {...config} />
    </div>
  );
};
