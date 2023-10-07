import * as Yup from 'yup';
import { Formik, Field, useFormik } from 'formik';
import AuthImage from '~/assets/images/bgLogin.webp';
import { Link, useNavigate } from 'react-router-dom';
import logoDark from '~/assets/images/logoDark.png';
import logoWhite from '~/assets/images/logoWhite.png';
import Button from '~/components/customs/Button';
import Input from '~/components/customs/Input';
import { Checkbox } from '@material-tailwind/react';
import { motion } from 'framer-motion';
import { useState, useMemo, useEffect } from 'react';
import { useSignUpWithEmailMutation } from '~/features/Auth/authApi.service';
import Loading from '~/components/customs/Loading';
import { errorNotify } from '~/components/customs/Toast';
import { isFetchBaseQueryError } from '~/utils/helper';
import { useDispatch } from 'react-redux';
import { assignNewRefreshToken, assignNewToken, setAuthCurrentUser } from '~/features/Auth/authSlice';

interface ISignUp {
  name: string;
  email: string;
  password: string;
  repassword: string;
}

function LogIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [signUp, { data, isError, isLoading, error, isSuccess }] = useSignUpWithEmailMutation();

  const errorForm = useMemo(() => {
    if (isFetchBaseQueryError(error)) {
      return error;
    }
    return null;
  }, [error]);

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      repassword: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Tên không được bỏ trống').min(3, 'Tên ít nhất 4 ký tự'),
      email: Yup.string()
        .required('Email không được bỏ trống')
        .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Email không đúng'),
      password: Yup.string()
        .required('Mật khẩu không được bỏ trống')
        .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/, 'Tối thiểu 6 ký tự, ít nhất 1 chữ cái và 1 số'),
      repassword: Yup.string()
        .required('Xác nhận mật khẩu không được bỏ trống')
        .oneOf([Yup.ref('password')], 'Mật khẩu không trùng khớp'),
    }),
    onSubmit: async (value: ISignUp, { resetForm }) => {
      await signUp({ email: value.email, password: value.password, fullName: value.name });
    },
  });
  useEffect(() => {
    if (isSuccess) {
      console.log(data.data);
      dispatch(setAuthCurrentUser(data.data.user));
      dispatch(assignNewToken(data.data.token.accessToken));
      dispatch(assignNewRefreshToken(data.data.token.refreshToken));
      navigate('/');
    }
    if (isError) {
      errorNotify('Đăng ký thất bại');
    }
  }, [isSuccess, isError]);
  return (
    <>
      {isLoading && <Loading />}
      <div className="relative flex h-screen w-screen flex-row justify-between text-cs_semi_green">
        <div className="absolute left-[30px] top-[15px]">
          <Link to="/">
            <div className="flex items-center gap-2 py-3">
              <img src={logoDark} alt="logo" className="hidden h-[20px] w-[40px] dark:hidden sm:block" />
              <img src={logoWhite} alt="logo" className="hidden h-[20px] w-[40px] dark:block" />
              <span className="text-xl font-black text-cs_semi_green dark:text-cs_light">NEVENT</span>
            </div>
          </Link>
        </div>
        <motion.div
          initial={{ x: 400 }} // Chuyển từ bên trái vào
          animate={{ x: 0 }} // Chạy đến vị trí ban đầu
          transition={{
            duration: 0.5,
            type: 'spring', // Loại hiệu ứng rung lắc
            damping: 15, // Độ nảy của rung lắc (điều chỉnh để phù hợp với mong muốn của bạn)
            stiffness: 100, // Độ cứng của rung lắc (điều chỉnh để phù hợp với mong muốn của bạn)
          }}
          className="grid w-1/2  place-content-center "
        >
          <div className="w-[400px] space-y-4">
            <div>
              <h1 className="text-center text-2xl font-extrabold">ĐĂNG KÝ TÀI KHOẢN!</h1>
              <p className=" py-2 text-center text-cs_blur_black">
                Đăng ký tài khoản miễn phí để sử dụng dịch vụ của Nevent một cách nhanh chóng nào!
              </p>
            </div>
            <form onSubmit={formik.handleSubmit} className="space-y-3">
              {errorForm && (
                <small className="px-2 text-center text-[12px] text-red-600">{(errorForm.data as any).message}</small>
              )}
              <div className="space-y-1">
                {isSubmitted && formik.errors.name && (
                  <small className="px-2 text-[12px] text-red-600">{formik.errors.name}</small>
                )}
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Họ và tên"
                  classNameInput={`w-full ${isSubmitted && formik.errors.name && 'border border-red-400'}`}
                  onChange={formik.handleChange}
                  value={formik.values.name}
                />
              </div>
              <div className="space-y-1">
                {isSubmitted && formik.errors.email && (
                  <small className="px-2 text-[12px] text-red-600">{formik.errors.email}</small>
                )}
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Email"
                  classNameInput={`w-full ${isSubmitted && formik.errors.email && 'border border-red-400'}`}
                  value={formik.values.email}
                  onChange={formik.handleChange}
                />
              </div>
              <div className="space-y-1">
                {isSubmitted && formik.errors.password && (
                  <small className="px-2 text-[12px] text-red-600">{formik.errors.password}</small>
                )}
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Mật khẩu"
                  classNameInput={`w-full ${isSubmitted && formik.errors.password && 'border border-red-400'}`}
                  value={formik.values.password}
                  onChange={formik.handleChange}
                />
              </div>
              <div className="space-y-1">
                {isSubmitted && formik.errors.repassword && (
                  <small className="px-2 text-[12px] text-red-600">{formik.errors.repassword}</small>
                )}
                <Input
                  id="repassword"
                  name="repassword"
                  type="password"
                  placeholder="Xác nhận mật khẩu"
                  classNameInput={`w-full ${isSubmitted && formik.errors.repassword && 'border border-red-400'}`}
                  value={formik.values.repassword}
                  onChange={formik.handleChange}
                />
              </div>

              <div className="flex items-center text-sm">
                <Checkbox
                  label="Tôi đồng ý với điều khoản dịch vụ của của Nevent."
                  crossOrigin={{}}
                  className="h-4 w-4"
                />
                <p></p>
              </div>
              <Button
                type="submit"
                onClick={() => setIsSubmitted(true)}
                className="w-full font-normal "
                mode="dark"
                value="Đăng ký"
              />
            </form>
            <div className="relative flex items-center justify-center gap-4">
              <span className="h-[1px] w-32 rounded-full bg-cs_dark dark:bg-cs_light "></span>
              <span className="text-cs_dark dark:text-cs_light">hoặc</span>
              <span className="h-[1px] w-32 rounded-full bg-cs_dark dark:bg-cs_light "></span>
            </div>
            <div className="flex justify-center gap-1">
              <Button className="font-semibold " value="Google" icon="logo-google" />
              <Button className="" value="Facebook" icon="logo-facebook" />
            </div>
            <div className="text-center">
              <span className="text-cs_dark dark:text-cs_light ">Bạn đã có tài khoản? </span>
              <Link to="/login" className="font-bold hover:underline">
                Đăng nhập
              </Link>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ x: -400 }} // Chuyển từ bên trái vào
          animate={{ x: 0 }} // Chạy đến vị trí ban đầu
          transition={{
            duration: 0.5,
            type: 'spring', // Loại hiệu ứng rung lắc
            damping: 15, // Độ nảy của rung lắc (điều chỉnh để phù hợp với mong muốn của bạn)
            stiffness: 100, // Độ cứng của rung lắc (điều chỉnh để phù hợp với mong muốn của bạn)
          }}
          className="h-full w-1/2 p-3"
        >
          <img className="h-full w-full rounded-xl object-cover" src={AuthImage} alt="" />
        </motion.div>
      </div>
    </>
  );
}

export default LogIn;
