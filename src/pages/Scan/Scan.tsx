import { QrScanner } from '@yudiel/react-qr-scanner';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useVerifyTicketMutation } from '~/features/Auth/authApi.service';

export default function Scan() {
  const { idEvent } = useParams();
  const [scanSuccess, setScanSuccess] = useState(false);
  const [verifyTicket, result] = useVerifyTicketMutation();

  useEffect(() => {
    if (result.error) {
      Swal.fire((result.error as any).data.message, '', 'error').then(() => setScanSuccess(false));
      return;
    }
    if (result.isSuccess) {
      console.log(result.data.message);
      Swal.fire('Vé hợp lệ!', '', 'success').then(() => setScanSuccess(false));
      return;
    }
  }, [result.isLoading]);

  const handleScan = async (result: string | null) => {
    if (result && scanSuccess === false) {
      await verifyTicket({ signature: result, event: idEvent });
      setScanSuccess(true);
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
            scanDelay={500}
          />
        )}
      </div>
    </div>
  );
}
