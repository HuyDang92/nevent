import { useState } from 'react';
import { Card, CardHeader, CardBody, CardFooter, Typography, Button } from '@material-tailwind/react';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="card">
        <Button className="text-lg border-2 p-5" onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </Button>
      </div>
    </>
  );
}

export default App;
