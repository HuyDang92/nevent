import { QrScanner } from '@yudiel/react-qr-scanner';

export default function Scan() {

    const handleScan = (result: string | null) => {
        if (result) {
            console.log(result);
            return
        }
    }

    return (
        <div className='flex justify-center items-center h-screen'>
            <div className='w-[40rem] h-[40rem] rounded-lg overflow-hidden border-4 border-cs_semi_green'>
                <QrScanner
                    onDecode={(result) => handleScan(result)}
                    onError={(error) => console.log(error?.message)}
                    scanDelay={300}
                />
            </div>
        </div>
    )
}
