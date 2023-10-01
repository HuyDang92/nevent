import { useState } from 'react';
import { Button } from '@material-tailwind/react';

import AppRoutes from './routes';

function App() {
  return (
    <div className="bg-[#f5f7fc] dark:bg-cs_dark">
      <AppRoutes />
    </div>
  );
}

export default App;
