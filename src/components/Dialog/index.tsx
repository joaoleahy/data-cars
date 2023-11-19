import { ReactNode } from 'react';

import MuiDialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

interface DialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  content: ReactNode;
  actions: ReactNode;
}

function Dialog({ open, onClose, title, content, actions }: DialogProps) {
  const handleClose = () => onClose();

  return (
    <MuiDialog open={open} onClose={handleClose} scroll="paper">
      <DialogTitle>{title}</DialogTitle>
      <DialogContent
        dividers
        sx={{ width: '100%', minWidth: 480, maxWidth: 500, maxHeight: 600 }}
      >
        {content}
      </DialogContent>
      <DialogActions sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        {actions}
      </DialogActions>
    </MuiDialog>
  );
}

export default Dialog;
