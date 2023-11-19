import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';

interface FeedbackProps {
  successMessage: string;
  errorMessage: string;
  isSuccess: boolean;
  isError: boolean;
  isLoading: boolean;
}

function Feedback({
  successMessage,
  errorMessage,
  isSuccess,
  isError,
  isLoading,
}: FeedbackProps) {
  let feedback: JSX.Element = <div />;

  if (isSuccess) {
    feedback = <Alert severity="success">{successMessage}</Alert>;
  }

  if (isError) {
    feedback = <Alert severity="error">{errorMessage}</Alert>;
  }

  if (isLoading) {
    feedback = (
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <CircularProgress size={32} />
      </Box>
    );
  }

  return feedback;
}

export default Feedback;
