import { FlapperSpinner } from 'react-spinners-kit';
type InputProps = {
  title?: string;
  size?: number;
};

const Loading = ({ title, size = 60 }: InputProps) => {
  return (
    <div className="flex items-center justify-center">
      <FlapperSpinner className="" loading={true} size={size} color="#13C6B3" />
    </div>
  );
};

export default Loading;
