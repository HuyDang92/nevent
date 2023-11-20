import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip } from 'chart.js';
interface Props {
  title?: string;
  labels: unknown[];
  data: number[];
  className?: string;
}
const LineChart = ({ title, labels, data, className }: Props) => {
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
  return <Line className={className} options={options} data={ChartData} />;
};

export default LineChart;
