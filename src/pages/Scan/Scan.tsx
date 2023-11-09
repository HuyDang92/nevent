import { QrScanner } from '@yudiel/react-qr-scanner';
import { useState } from 'react';
import { errorNotify, successNotify } from '~/components/customs/Toast';
import Swal from 'sweetalert2';

export default function Scan() {
  const [value, setValue] = useState<string>('');
  const [scanSuccess, setScanSuccess] = useState(false);

  // let count = 0;
  // const handleScan = (result: string | null) => {
  //   count++;
  //   if (result) {
  //     console.log(result);
  //     if (value === result) {
  //       if (count > 1 && result === value) {
  //         return;
  //       }
  //       Swal.fire(
  //         'Sự kiện đã check in!',
  //         '',
  //         'error'
  //       ).then(e => setScanSuccess(false));
  //       return;
  //     }
  //     setValue(result);
  //     Swal.fire(
  //       'Đã quét thành công!',
  //       '',
  //       'success'
  //     ).then(e => setScanSuccess(false));
  //     count = 0;
  //     return;
  //   }
  // };

  const handleScan = async (result: string | null) => {
    if (result) {
      setScanSuccess(true);
      try {
        Swal.fire(
          'Vé hợp lệ!',
          '',
          'success'
        ).then(e => setScanSuccess(false));
        return
      } catch (e) {
        Swal.fire(
          'Vé không hợp lệ!',
          '',
          'error'
        ).then(e => setScanSuccess(false));
        return
      }
    }
  }

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="h-[40rem] w-[40rem] overflow-hidden rounded-lg border-4 border-cs_semi_green">

        {
          !scanSuccess && (
            <QrScanner
              onDecode={(result) => handleScan(result)}
              onError={(error) => console.log(error?.message)}
              scanDelay={300}
            />
          )
        }

      </div>
    </div>
  );
}
