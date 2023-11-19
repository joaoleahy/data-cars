import { Navigate, Route, Routes } from 'react-router-dom';

import DashBoard from '~/pages/DashBoard';
import AsideMenu from '~/pages/DashBoard/components/AsideMenu';
import VehicleRegistrationPanel from '~/pages/DashBoard/components/VehicleRegistrationPanel';
import VehicleSupplyRegistrationPanel from '~/pages/DashBoard/components/VehicleSupplyRegistrationPanel';

function PrivateRoutes() {
  return (
    <Routes>
      <Route
        path="/dashboard"
        element={<DashBoard asideMenu={<AsideMenu />} />}
      >
        <Route path="vehicle-panel" element={<VehicleRegistrationPanel />} />
        <Route
          path="vehicle-supply-panel"
          element={<VehicleSupplyRegistrationPanel />}
        />
      </Route>
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

export default PrivateRoutes;
