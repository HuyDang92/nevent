import bg from '~/assets/images/bgForgot.webp';
import Button from '~/components/customs/Button';
import Input from '~/components/customs/Input';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import logo from '~/assets/images/logoWhite.png';
import { useEffect, useState } from 'react';
import { useForgotPassWordMutation, useVerifyForgotPasswordMutation } from '~/features/Auth/authApi.service';
import Loading from '~/components/customs/Loading';
import { Dialog, DialogBody, DialogFooter } from '@material-tailwind/react';

function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>('');
  const [code, setCode] = useState<string>('');
  const [secret, setSecret] = useState<string>('');
  const [open, setOpen] = useState<boolean>(false);
  const [openMessage, setOpenMessage] = useState<boolean>(false);
  const [count, setCount] = useState<number>(0);

  const [changePass, result] = useForgotPassWordMutation();
  const [verify, resultVerify] = useVerifyForgotPasswordMutation();
  const handleSubmit = async (type: string) => {
    if (!email) return;
    if (type === 'send') {
      if (count > 0) {
        setOpen(true);
        return;
      }
      await changePass({ email: email });
      setCount(count + 60);
      setOpen(true);

      return;
    }
    if (type === 'confirm') {
      await verify({ email: email, code: Number(code), secret: secret });
      setOpenMessage(true);
    }
  };
  const handleDone = () => {
    navigate('/login');
    setOpenMessage(false);
  };
  useEffect(() => {
    if (result.isSuccess) {
      setOpen(false);
      setSecret(result.data?.data?.secret);
    }
    if (resultVerify.isSuccess) {
      setOpen(false);
    }
  }, [result.isLoading, resultVerify.isLoading]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (count > 0) {
        setCount(count - 1);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [count]);

  return (
    <div className="">
      {result.isLoading || resultVerify.isLoading && <Loading />}
      <img src={bg} className="fixed -top-12 bottom-0 left-0 right-0" alt="" />
      <Dialog
        open={open}
        handler={setOpen}
        className="dark:bg-cs_lightDark"
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
        size="xs"
      >
        <DialogBody className="relative space-y-5 text-center font-normal">
          <p className="text-center text-lg font-bold uppercase text-cs_semi_green">Nhập mã OTP</p>
          <span className="">Email: {email}</span>
          <Input
            placeholder="Nhập mã OTP"
            classNameInput="w-full"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />

          <p className="">
            Gửi lại mã sau{' '}
            {count === 0 ? (
              <span className="cursor-pointer text-cs_semi_green" onClick={() => handleSubmit('send')}>
                Gửi lại mã
              </span>
            ) : (
              <span className="text-cs_semi_green">{count} giây</span>
            )}
          </p>
        </DialogBody>
        <DialogFooter className="flex justify-center pt-0">
          <Button value="Xác nhận" className="!bg-cs_semi_green !text-white" onClick={() => handleSubmit('confirm')} />
        </DialogFooter>
      </Dialog>
      <Dialog
        open={openMessage}
        handler={setOpenMessage}
        className="dark:bg-cs_lightDark"
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
        size="xs"
      >
        <DialogBody className="relative space-y-5 text-center font-normal">
          <p className="text-center text-lg font-bold uppercase text-cs_semi_green">Thông báo</p>
          <p>Mật khẩu mới đã được gửi về {email}! Vui lòng kiểm trả trong hợp thư</p>
        </DialogBody>
        <DialogFooter className="flex justify-center pt-0">
          <Button value="Đã hiểu" className="!bg-cs_semi_green !text-white" onClick={handleDone} />
        </DialogFooter>
      </Dialog>
      <div className="absolute left-[30px] top-[15px] z-10">
        <Link to="/">
          <div className="flex items-center gap-2">
            <img src={logo} alt="logo" className=" h-[20px] w-[40px] " />
            <span className="text-xl font-extrabold text-cs_light dark:text-cs_light">NEVENT</span>
          </div>
        </Link>
      </div>
      {/* <motion.div
        initial={{ scale: 0 }} // Chuyển từ bên phải vào
        animate={{ scale: 100 }} // Chạy đến vị trí ban đầu
        transition={{ duration: 0.5 }}
        className=""
      >
      </motion.div> */}
      <div className="absolute left-1/2 top-1/2 w-[400px] -translate-x-1/2 -translate-y-1/2 space-y-5 rounded-xl bg-cs_light p-5 text-center shadow-border-full">
        <h1 className="text-center text-xl font-bold">Quên mật khẩu</h1>
        <Input
          placeholder="Nhập email"
          classNameInput="w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button onClick={() => handleSubmit('send')} value="Gửi mã xác nhận" className="w-full" mode="dark" />
        <p className="text-cs_grayText">
          <p>
            Bạn chưa có tài khoản?{' '}
            <Link to="/signup" className="text-cs_semi_green hover:underline">
              Đăng ký
            </Link>
          </p>
          <p>
            Bạn đã có tài khoản?{' '}
            <Link to="/login" className="text-cs_semi_green hover:underline">
              Đăng nhập
            </Link>
          </p>
        </p>
      </div>
    </div>
  );
}

export default ForgotPassword;
