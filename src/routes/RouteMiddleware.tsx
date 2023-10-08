import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export function NotLoggedMiddleware() {
  const auth = useSelector((state: any) => state.auth);
  return auth.loggedIn ? <Navigate to={'/'} /> : <Outlet />;
}
