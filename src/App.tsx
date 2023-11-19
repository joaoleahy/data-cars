import { QueryClient, QueryClientProvider } from 'react-query';
import CssBaseline from '@mui/material/CssBaseline';

import { AuthContextProvider } from './contexts/AuthContext';
import Router from './routes/router';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <CssBaseline />
        <Router />
      </AuthContextProvider>
    </QueryClientProvider>
  );
}

export default App;
