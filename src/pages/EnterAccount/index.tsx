import { Outlet } from 'react-router-dom';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

function EnterAccount() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      }}
    >
      <Paper
        elevation={2}
        sx={{ maxWidth: '400px', width: '100%', padding: 2 }}
      >
        <Outlet />
      </Paper>
    </Box>
  );
}

export default EnterAccount;
