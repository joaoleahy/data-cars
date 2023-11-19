import { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import LogoutIcon from '@mui/icons-material/Logout';

import { useAuthContext } from '~/contexts/AuthContext';

interface DashBoardProps {
  asideMenu: ReactNode;
}

function DashBoard({ asideMenu }: DashBoardProps) {
  const { logout } = useAuthContext();

  const handleLogout = () => logout();

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }} component="main">
      <Paper
        sx={{ flex: 1, minHeight: '100%', minWidth: 280, position: 'relative' }}
        elevation={2}
        component="aside"
      >
        {asideMenu}
        <Button
          onClick={handleLogout}
          endIcon={<LogoutIcon />}
          variant="outlined"
          sx={{
            width: '96%',
            margin: '0 auto',
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 8,
          }}
        >
          Logout
        </Button>
      </Paper>
      <Box sx={{ flex: 4, minHeight: '100%' }} component="section">
        <Outlet />
      </Box>
    </Box>
  );
}

export default DashBoard;
