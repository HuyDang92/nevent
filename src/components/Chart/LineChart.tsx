import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip } from 'chart.js';
interface Props {
  title?: string;
  labels: any[];
  data: number[];
}
const LineChart = ({ title, labels, data }: Props) => {
  ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip);
  const options = {
    responsive: true,
    plugins: {
      title: {
        display: title ? true : false,
        text: title ? title : '',
      },
    },
  };
  const ChartData = {
    labels: labels,
    datasets: [
      {
        data: data,
        borderColor: 'rgb(255, 255, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };
  return <Line options={options} data={ChartData} />;
};

export default LineChart;
