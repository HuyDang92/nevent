import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

type ButtonProps = {
  children: React.ReactNode;
};

const ZoomComp = ({ children }: ButtonProps) => {
  return <Zoom>{children}</Zoom>;
};

export default ZoomComp;
