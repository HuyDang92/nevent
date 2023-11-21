import ReactECharts from 'echarts-for-react';
import { useEffect, useState } from 'react';
interface ChartBar {
  title: string;
  xAxisData: string[];
  barData: number[][];
  names: string[];
  barColors: string[];
}

interface ChartBarProps {
  data?: ChartBar;
}

const ChartBarAverage: React.FC<ChartBarProps> = ({ data }) => {
  const [options, setOptions] = useState({} as any);

  useEffect(() => {
    if (!data) {
      const options = {
        tooltip: {
          trigger: 'axis',
        },
        legend: {
          data: ['Lợi nhuận', 'Doanh thu'],
        },
        toolbox: {
          show: true,
          feature: {
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ['line', 'bar'] },
            restore: { show: true },
            saveAsImage: { show: true },
          },
        },
        calculable: true,
        xAxis: [
          {
            type: 'category',
            // prettier-ignore
            data: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12'],
          },
        ],
        yAxis: [
          {
            type: 'value',
          },
        ],
        series: [
          {
            name: 'Số vé',
            type: 'bar',
            data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
            markPoint: {
              data: [
                { type: 'max', name: 'Max' },
                { type: 'min', name: 'Min' },
              ],
            },
            markLine: {
              data: [{ type: 'average', name: 'Avg' }],
            },
          },
          {
            name: 'Doanh thu',
            type: 'bar',
            data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 1000, 48.7, 18.8, 6.0, 2.3],
            markPoint: {
              data: [
                { name: 'Max', value: 182.2, xAxis: 7, yAxis: 183 },
                { name: 'Min', value: 2.3, xAxis: 11, yAxis: 3 },
              ],
            },
            markLine: {
              data: [{ type: 'average', name: 'Avg' }],
            },
          },
        ],
      };

      setOptions(options);
    }
  }, [data]);

  return <ReactECharts option={options} style={{ height: '332px', width: '100%' }} opts={{ renderer: 'svg' }} />;
};

export default ChartBarAverage;
