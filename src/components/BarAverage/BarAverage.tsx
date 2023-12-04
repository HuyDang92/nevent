import ReactECharts from 'echarts-for-react';
import { useEffect, useState } from 'react';
import { useLazyAnalyticsRevenueChartQuery } from '~/features/Business/business.service';
import moment from 'moment';
import LoadingLocal from '../customs/Loading/LoadingLocal';
import { useParams } from 'react-router-dom';

interface ChartBarProps {
  type?: string;
}

const ChartBarAverage: React.FC<ChartBarProps> = ({ type }) => {
  const { idEvent } = useParams();
  const [options, setOptions] = useState({} as any);
  const currentDate = new Date();
  const [dateData, setDateData] = useState<any>([]);
  const oneWeekAgo = moment(currentDate).subtract(7, 'days').format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
  const current = moment(currentDate).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
  const [reneue, result] = useLazyAnalyticsRevenueChartQuery();
  useEffect(() => {
    if (idEvent) {
      reneue({ eventId: idEvent, startDate: oneWeekAgo, endDate: current });
    } else {
      reneue({ startDate: oneWeekAgo, endDate: current });
    }
  }, []);
  // useEffect(() => {
  //   if (result.data) {
  //     const reData = result.data?.data?.map((item: any) => ({
  //       value: parseFloat(item?.revenue.replace(/,/g, '')),
  //       itemStyle: {
  //         color: '#13C6B3',
  //       },
  //     }));
  //     const ticketsData = result.data?.data?.map((item: any) => item?.totalTickets);
  //     const dateData = result.data?.data?.map((item: any) => item?.date);
  //     setRevenue(reData);
  //     setTickets(ticketsData);
  //     setDateData(dateData);
  //   }
  // }, [result.isFetching]);

  useEffect(() => {
    if (result.isSuccess) {
      const options = {
        tooltip: {
          trigger: 'axis',
        },
        legend: {
          data: type === 'revenue' ? ['Doanh thu'] : ['Số vé'],
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
            data: result.data?.data?.map((item: any) => item?.date),
          },
        ],
        yAxis: [
          {
            type: 'value',
          },
        ],
        series:
          type === 'ticket'
            ? {
                name: 'Số vé',
                type: 'bar',
                data: result.data?.data?.map((item: any) => item?.totalTickets),
                markPoint: {
                  data: [
                    { type: 'max', name: 'Max' },
                    { type: 'min', name: 'Min' },
                  ],
                },
                markLine: {
                  data: [{ type: 'average', name: 'Avg' }],
                },
              }
            : {
                name: 'Doanh thu',
                type: 'bar',
                data: result.data?.data?.map((item: any) => ({
                  value: parseFloat(item?.revenue.replace(/,/g, '')),
                  itemStyle: {
                    color: '#13C6B3',
                  },
                })),
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
      };
      setOptions(options);
    }
  }, [result.isFetching]);

  return result.isFetching ? (
    <LoadingLocal />
  ) : (
    <ReactECharts option={options} style={{ height: '332px', width: '100%' }} opts={{ renderer: 'svg' }} />
  );
};

export default ChartBarAverage;
