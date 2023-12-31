// import { Outlet, useLocation, Navigate, useNavigate } from 'react-router-dom';
// import { useEffect } from 'react';
// import { logout, assignNewToken, assignNewRefreshToken } from 'features/Auth/authSlice';
// import { useLazyGetTokenFromRefreshTokenQuery } from '~/features/Auth/authApi.service';
// import { useAppDispatch, useAppSelector } from '~/hooks/useActionRedux';
// import jwt_decode from 'jwt-decode';

// interface PrivateRouteProps {
//   allowedRoles?: string[];
// }
// interface IJwtDecode {
//   exp: number;
// }
// function PrivateRoute({ allowedRoles = [] }: PrivateRouteProps) {
//   const dispatch = useAppDispatch();
//   const location = useLocation();
//   const auth = useAppSelector((state) => state.auth);
//   const [getTokenFromRefreshToken, result] = useLazyGetTokenFromRefreshTokenQuery();
//   const currentTime = Math.floor(Date.now() / 1000);

//   useEffect(() => {
//     if (!auth.loggedIn) return;
//     const jwtDecodeAccess: IJwtDecode = jwt_decode(auth?.accessToken?.token ?? '');
//     const jwtDecodeRefresh: IJwtDecode = jwt_decode(auth?.refreshToken?.token ?? '');
//     if (auth.loggedIn && jwtDecodeAccess.exp < currentTime) {
//       if (jwtDecodeRefresh.exp > currentTime) {
//         getTokenFromRefreshToken(auth?.refreshToken.token ? auth?.refreshToken.token : '');
//       } else {
//         dispatch(logout());
//       }
//     }
//   }, [location.pathname, auth.loggedIn]);

//   // use useEffect

//   // useEffect(() => {
//   //   const refreshInterval = setInterval(() => {
//   //     if (auth.loggedIn && jwtDecodeRefresh.exp > currentTime) {
//   //       getTokenFromRefreshToken(auth.refreshToken ? auth.refreshToken : '');
//   //     }
//   //   }, 1000 * 60 * 1);

//   //   // Xóa interval khi component unmount hoặc khi dependency thay đổi
//   //   return () => clearInterval(refreshInterval);
//   // }, [auth.loggedIn, auth.refreshToken, getTokenFromRefreshToken]);

//   useEffect(() => {
//     if (result.isSuccess) {
//       dispatch(assignNewToken(result?.data?.data?.token?.accessToken));
//       dispatch(assignNewRefreshToken(result?.data?.data?.token?.refreshToken));
//     }
//   }, [result.isSuccess, dispatch]);

//   const authorized: boolean =
//     allowedRoles.length > 0 ? allowedRoles.some((role) => role === auth?.currentUser?.role?.name) : true;

//   return auth.loggedIn ? (
//     authorized ? (
//       <Outlet />
//     ) : (
//       <div className="text-slate-500 flex min-h-screen items-center justify-center bg-cs_light">
//         <p>403 | Forbidden</p>
//       </div>
//     )
//   ) : (
//     <Navigate to="/login" />
//   );
// }

// export default PrivateRoute;
import { Outlet, Navigate } from 'react-router-dom';
import { useAppSelector } from '~/hooks/useActionRedux';
import Page403 from '~/pages/Page403';

interface PrivateRouteProps {
  allowedRoles?: string[];
}

function PrivateRoute({ allowedRoles = [] }: PrivateRouteProps) {
  const auth = useAppSelector((state) => state.auth);

  const authorized: boolean =
    allowedRoles.length > 0 ? allowedRoles.some((role) => role === auth?.currentUser?.role?.name) : true;
  
  return auth.loggedIn ? authorized ? <Outlet /> : <Page403 /> : <Navigate to="/login" />;
}

export default PrivateRoute;
