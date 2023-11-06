import { QrScanner } from '@yudiel/react-qr-scanner';
import { useState } from 'react';
import { errorNotify, successNotify } from '~/components/customs/Toast';

export default function Scan() {
  const [value, setValue] = useState<string>('');
  let count = 0;
  const handleScan = (result: string | null) => {
    count++;
    if (result) {
      console.log(result);
      if (value === result) {
        if (count > 1 && result === value) {
          return;
        }
        errorNotify('Sự kiện đã check in');
        return;
      }
      setValue(result);
      successNotify('Đã quét thành công');
      count = 0;
      return;
    }
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-cs_light">
      <h1 className="text-center text-[40px] font-bold">Vui lòng quét vé của bạn</h1>
      <div className="h-[40rem] w-[40rem] overflow-hidden rounded-lg border-4 border-cs_semi_green">
        <QrScanner
          onDecode={(result) => handleScan(result)}
          onError={(error) => console.log(error?.message)}
          scanDelay={300}
        />
      </div>
    </div>
  );
}
