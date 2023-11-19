import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

function Spinner() {
  return (
    <Box
      sx={{
        height: '100vh',
        width: '100%',
        position: 'fixed',
        top: 0,
        left: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <CircularProgress />
    </Box>
  );
}

export default Spinner;
