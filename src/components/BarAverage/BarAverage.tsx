import ReactECharts from 'echarts-for-react';
import { useEffect, useState } from 'react';
import { useAnalyticsRevenueChartQuery } from '~/features/Business/business.service';
import moment from 'moment';

interface ChartBarProps {
  data?: any;
}

const ChartBarAverage: React.FC<ChartBarProps> = ({ data }) => {
  const [options, setOptions] = useState({} as any);
  const [revenue, setRevenue] = useState<any>([]);
  const currentDate = new Date();
  const oneWeekAgo = moment(currentDate).subtract(7, 'days').format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
  const current = moment(currentDate).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
  const reneue = useAnalyticsRevenueChartQuery({ startDate: oneWeekAgo, endDate: current });
  useEffect(() => {
    if (reneue.data) {
      setRevenue(data);
    }
  }, [reneue.isFetching]);
  console.log(revenue);
  
  useEffect(() => {
    if (!data) {
      const options = {
        tooltip: {
          trigger: 'axis',
        },
        legend: {
          data: ['Số vé', 'Doanh thu'],
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
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
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
            data: revenue,
            markPoint: {
              data: [
                { name: 'Max', value: 0, xAxis: 7, yAxis: 183 },
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
