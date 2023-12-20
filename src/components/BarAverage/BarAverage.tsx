import ReactECharts from 'echarts-for-react';
import { useEffect, useState } from 'react';
import { useLazyAnalyticsRevenueChartQuery } from '~/features/Business/business.service';
import moment from 'moment';
import LoadingLocal from '../customs/Loading/LoadingLocal';
import { useParams } from 'react-router-dom';
import Button from '../customs/Button';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

interface ChartBarProps {
  type?: string;
  className?: string;
}

const ChartBarAverage: React.FC<ChartBarProps> = ({ type, className }) => {
  const { idEvent } = useParams();
  const [options, setOptions] = useState({} as any);
  const [DS, setDS] = useState({} as any);
  const currentDate = new Date();
  const currentMonth = moment(currentDate).format('MM');
  // const firstDayOfMonth = moment(currentDate).startOf('month').format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
  // const endDate = moment(currentDate).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');

  const [startDate, setStartDate] = useState(moment(currentDate).startOf('month').format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'));
  const [endDate, setEndDate] = useState(moment(currentDate).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'));
  const [reneue, result] = useLazyAnalyticsRevenueChartQuery();

  useEffect(() => {
    if (idEvent) {
      reneue({ eventId: idEvent, startDate, endDate });
    } else {
      reneue({ startDate, endDate });
    }
  }, [startDate]);

  const exportDSSV = () => {
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';

    const ws = XLSX.utils.json_to_sheet(DS);
    const wb = { Sheets: { data: ws }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, `Thống kê doanh thu (Tháng ${currentMonth})` + fileExtension);
  };
  const handleChangeDate = (value: any) => {
    console.log(value);
    setStartDate(`2023-${value}-01T00:00:00.000Z`);
    setEndDate(`2023-${value}-30T00:00:00.000Z`);
  };
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
    const formattedData = result?.data?.data?.map((item: any, index: number) => ({
      STT: index + 1,
      'Số vé đã bán': item?.totalTickets,
      'Doanh thu': item?.revenue,
      Ngày: item?.date,
    }));
    setDS(formattedData);
  }, [result.isFetching]);

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
            data: result.data?.data?.map((item: any) => item?.date) ?? [],
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
                data: result.data?.data?.map((item: any) => item?.totalTickets) ?? [],
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
                data:
                  result.data?.data?.map((item: any) => ({
                    value: parseFloat(item?.revenue.replace(/,/g, '')),
                    itemStyle: {
                      color: '#13C6B3',
                    },
                  })) ?? [],
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
    <div className={`${className}`}>
      {type === 'ticket' ? (
        <div className="mb-5 flex justify-between">
          <h3 className="text-xl font-bold dark:text-cs_light">
            Biểu đồ bán vé {!idEvent && `(Tháng ${currentMonth})`}
          </h3>
          {/* <Button onClick={exportDSSV} value={'Xuất thống kê'} /> */}
        </div>
      ) : (
        <div className="my-5 flex justify-between">
          <div>
            {!idEvent && (
              <select onChange={(e) => handleChangeDate(e.target.value)} className="rounded-lg border p-1">
                <option value="">Chọn tháng </option>
                <option value="12">Tháng {currentMonth} năm 2023</option>
                <option value="11">Tháng {Number(currentMonth) - 1} năm 2023</option>
              </select>
            )}
            <h3 className="text-xl font-bold dark:text-cs_light">
              Biểu đồ danh thu {!idEvent && `(Tháng ${currentMonth})`}
            </h3>
          </div>
          <Button onClick={exportDSSV} value={'Xuất thống kê'} className="h-fit" />
        </div>
      )}
      <ReactECharts option={options} style={{ height: '332px', width: '100%' }} opts={{ renderer: 'svg' }} />
    </div>
  );
};

export default ChartBarAverage;
