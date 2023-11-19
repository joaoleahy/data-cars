import { Navigate, Route, Routes } from 'react-router-dom';

import EnterAccount from '~/pages/EnterAccount';
import Login from '~/pages/EnterAccount/components/Login';
import Signup from '~/pages/EnterAccount/components/Signup';

function PublicRoutes() {
  return (
    <Routes>
      <Route path="/" element={<EnterAccount />}>
        <Route index element={<Login />} />
        <Route path="signup" element={<Signup />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default PublicRoutes;
