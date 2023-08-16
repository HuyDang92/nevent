import { useState } from 'react';
import { Button } from '@material-tailwind/react';
import './App.css';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import AppRoutes from './routes';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <AppRoutes />
    </>
  );
}

export default App;
