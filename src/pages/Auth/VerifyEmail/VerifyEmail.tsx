import { Link, useNavigate } from 'react-router-dom';
import logoWhite from '~/assets/images/logoWhite.png';
import Input from '~/components/customs/Input';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Loading from '~/components/customs/Loading';
import { errorNotify } from '~/components/customs/Toast';
import { useAppDispatch } from '~/hooks/useActionRedux';
import logo from '~/assets/images/logo.png';
import { addCode, addSecret } from '~/features/OTP/otpSlice';
import { useForgotPassWordMutation, useSendOtpNoLoginMutation } from '~/features/OTP/otpApi.service';
import Button from '~/components/customs/Button';

interface ISignUp {
  name: string;
  email: string;
  password: string;
  repassword: string;
}

function VerifyEmail() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState<string>('');
  const [code, setCode] = useState<string>('');
  const [secret, setSecret] = useState<string>('');
  const [open, setOpen] = useState<boolean>(false);
  const [openMessage, setOpenMessage] = useState<boolean>(false);
  const [count, setCount] = useState<number>(0);

  const [verify, resultVerify] = useForgotPassWordMutation();
  const [sendOtp, result] = useSendOtpNoLoginMutation();
  const handleSubmit = async (type: string) => {
    if (!email) return;
    if (type === 'send') {
      if (count > 0) {
        setOpen(true);
        return;
      }
      await sendOtp({ email: email });
      setCount(count + 60);
      setOpen(true);
      setCode('');
      return;
    }
    if (type === 'confirm') {
      dispatch(addCode(code));
      dispatch(addSecret(secret));
      await verify({ email: email });
    }
  };
  const handleDone = () => {
    navigate('/login');
    setOpenMessage(false);
  };
  useEffect(() => {
    if (resultVerify.isSuccess) {
      setOpen(false);
      setOpenMessage(true);
    }
    if (resultVerify.isError) {
      errorNotify((resultVerify.error as any)?.data?.message);
      setOpen(false);
    }
  }, [resultVerify.isLoading]);

  useEffect(() => {
    if (result.isSuccess) {
      setOpen(false);
      setSecret(result.data?.data?.secret);
    }
  }, [result.isLoading]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (count > 0) {
        setCount(count - 1);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [count]);

  return (
    <>
      {(result.isLoading || resultVerify.isLoading) && <Loading />}
      <div className="relative block text-cs_semi_green">
        <div className="absolute left-[30px] top-[15px] z-10">
          <Link to="/">
            <div className="flex items-center gap-2">
              <img src={logo} alt="logo" className=" h-[20px] w-[40px] dark:hidden" />
              <img src={logoWhite} alt="logo" className=" hidden h-[20px] w-[40px] dark:block" />
              <span className="text-xl font-extrabold text-cs_semi_green dark:text-cs_light">NEVENT</span>
            </div>
          </Link>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.8,
            delay: 0.3,
            ease: [0, 0.71, 0.2, 1.01],
          }}
          className="flex items-center justify-center"
        >
          <div className="mt-40 w-full space-y-4 rounded-xl bg-cs_light p-5 shadow-border-full xl:w-[400px]">
            <p className="text-center text-lg font-bold uppercase text-cs_semi_green">Xác nhận Email</p>
            <span className="">
              Mã OTP đã được gửi đến email: <span className="font-semibold">{email}</span> . Vui lòng kiểm tra trong hộp
              thư
            </span>
            <Input
              placeholder="Nhập mã OTP"
              classNameInput="w-full"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />

            <p className=" text-center font-medium text-cs_grayText">
              Chưa nhận được mã?{' '}
              {count === 0 ? (
                <span className="cursor-pointer text-cs_semi_green" onClick={() => handleSubmit('send')}>
                  Gửi lại OTP
                </span>
              ) : (
                <span className="text-cs_semi_green">{count} giây</span>
              )}
            </p>
           <div className='flex justify-center'>
              <Button
                disabled={!code}
                value="Xác nhận"
                className={`  ${
                  code ? '!bg-cs_semi_green !text-white' : 'cursor-not-allowed bg-gray-500 !text-gray-400'
                }`}
                onClick={() => handleSubmit('confirm')}
              />
           </div>
          </div>
        </motion.div>
      </div>
    </>
  );
}

export default VerifyEmail;