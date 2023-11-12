import { QrScanner } from '@yudiel/react-qr-scanner';
import { useState } from 'react';
import { errorNotify, successNotify } from '~/components/customs/Toast';
import Swal from 'sweetalert2';
import { useLazyVerifyTicketQuery } from '~/features/Auth/authApi.service';

export default function Scan() {
  const [value, setValue] = useState<string>('');
  const [scanSuccess, setScanSuccess] = useState(false);
  const [verifyTicket, result] = useLazyVerifyTicketQuery();

  const handleScan = async (result: string | null) => {
    if (result) {
      console.log(result);
      await verifyTicket(result);
      setScanSuccess(true);
      try {
        Swal.fire('Vé hợp lệ!', '', 'success').then((e) => setScanSuccess(false));
        return;
      } catch (e) {
        Swal.fire('Vé không hợp lệ!', '', 'error').then((e) => setScanSuccess(false));
        return;
      }
    }
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-cs_light">
      <h1 className="text-center text-[40px] font-bold">Vui lòng quét vé của bạn</h1>
      <div className="h-[40rem] w-[40rem] overflow-hidden rounded-lg border-4 border-cs_semi_green">
        {!scanSuccess && (
          <QrScanner
            onDecode={(result) => handleScan(result)}
            onError={(error) => console.log(error?.message)}
            scanDelay={300}
          />
        )}
      </div>
    </div>
  );
}
