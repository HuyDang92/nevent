import { Navigate, Route, Routes } from 'react-router-dom';
import DefaultLayout from 'Layout/DefaultLayout/DefaultLayout';
import Home from 'pages/Home/Home';
import NotFound from 'pages/NotFound';

export default function AppRoutes() {
  return (
    <>
      <Routes>
        <Route element={<DefaultLayout />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route path="*" element={<Navigate to="/NotFound-404" />} />
        <Route path="/NotFound-404" element={<NotFound />} />
      </Routes>
    </>
  );
}
