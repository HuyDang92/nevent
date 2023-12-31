import { WhisperSpinner } from 'react-spinners-kit';
type InputProps = {
  size?: number;
};

const LoadingLocal = ({ size = 60 }: InputProps) => {
  return (
    <div className="flex items-center justify-center py-20">
      <WhisperSpinner className="" loading={true} size={size} color="#13C6B3" />
    </div>
  );
};

export default LoadingLocal;
