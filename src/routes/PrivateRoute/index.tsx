import { Outlet, useLocation, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { logout, assignNewToken, assignNewRefreshToken } from 'features/Auth/authSlice';
import { useLazyGetTokenFromRefreshTokenQuery } from '~/features/Auth/authApi.service';
import { RootState } from '~/store/store';

interface PrivateRouteProps {
  allowedRoles?: string[];
}

function PrivateRoute({ allowedRoles = [] }: PrivateRouteProps) {
  const dispatch = useDispatch();
  const location = useLocation();
  const auth = useSelector((state: RootState) => state.auth);
  const [getTokenFromRefreshToken, result] = useLazyGetTokenFromRefreshTokenQuery();
  console.log(auth.accessToken.exp);

  useEffect(() => {
    if (auth.loggedIn && auth.accessToken.exp < Date.now()) {
      if (auth.refreshToken.exp > Date.now()) {
        getTokenFromRefreshToken(auth.refreshToken.token ? auth.refreshToken.token : '');
      } else if (auth.refreshToken.exp < Date.now()) {
        dispatch(logout());
      }
    }
  }, [location.pathname, auth.loggedIn, auth.accessToken, dispatch]);

  useEffect(() => {
    const refreshInterval = setInterval(() => {
      if (auth.loggedIn && auth.refreshToken.exp > Date.now()) {
        getTokenFromRefreshToken(auth.refreshToken.token ? auth.refreshToken.token : '');
      }
    }, 1000 * 60 * 5);

    // Xóa interval khi component unmount hoặc khi dependency thay đổi
    return () => clearInterval(refreshInterval);
  }, [auth.loggedIn, auth.refreshToken, getTokenFromRefreshToken]);

  useEffect(() => {
    if (result.data?.statusCode) {
      dispatch(assignNewToken(result?.data?.data?.token?.accessToken));
      dispatch(assignNewRefreshToken(result?.data?.data?.token?.refreshToken));
    }
  }, [result.data?.statusCode, dispatch]);

  const authorized: boolean =
    allowedRoles.length > 0 ? allowedRoles.some((role) => role === auth?.currentUser?.role?.name) : true;

  return auth.loggedIn && auth.accessToken ? (
    authorized ? (
      <Outlet />
    ) : (
      <div className="text-slate-500 flex min-h-screen items-center justify-center">
        <p>403 | Forbidden</p>
      </div>
    )
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}

export default PrivateRoute;
