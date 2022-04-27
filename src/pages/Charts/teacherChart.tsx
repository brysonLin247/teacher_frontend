import { G2, Pie } from '@ant-design/plots';
import { useEffect, useState } from 'react';
import { getBaseCharts } from './services';

export const TeacherCharts = () => {
  const G = G2.getEngine('canvas');
  const [chartData, setChartData] = useState([]);

  const getData = async () => {
    let { data } = await getBaseCharts();
    data?.map((d) => (d.value = Number(d.value)));
    setChartData(data);
  };

  useEffect(() => {
    getData();
  }, []);

  const config = {
    appendPadding: 10,
    data: chartData,
    angleField: 'value',
    colorField: 'type',
    radius: 1,
    legend: false,
    label: {
      type: 'spider',
      labelHeight: 40,
      formatter: (data, mappingData) => {
        const group = new G.Group({});
        group.addShape({
          type: 'circle',
          attrs: {
            x: 0,
            y: 0,
            width: 40,
            height: 50,
            r: 5,
            fill: mappingData.color,
          },
        });
        group.addShape({
          type: 'text',
          attrs: {
            x: 10,
            y: 8,
            text: `${data.type}`,
            fill: mappingData.color,
          },
        });
        group.addShape({
          type: 'text',
          attrs: {
            x: 0,
            y: 25,
            text: `${data.value}个`,
            fill: 'rgba(0, 0, 0, 0.65)',
            fontWeight: 700,
          },
        });
        return group;
      },
    },
    interactions: [
      {
        type: 'pie-legend-active',
      },
      {
        type: 'element-active',
      },
    ],
  };
  return (
    <div style={{ height: '250px' }}>
      <Pie {...config} />
    </div>
  );
};
