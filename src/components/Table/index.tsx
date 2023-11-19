import { ReactNode } from 'react';

import MuiTable from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Paper from '@mui/material/Paper';
import { SxProps, Theme } from '@mui/material';

interface TableProps {
  children: ReactNode;
  headings: string[];
  styles: SxProps<Theme> | undefined;
}

function Table({ children, headings, styles }: TableProps) {
  return (
    <TableContainer component={Paper} sx={styles}>
      <MuiTable stickyHeader>
        <TableHead>
          <TableRow>
            {headings.map((heading) => (
              <TableCell key={heading} sx={{ textTransform: 'capitalize' }}>
                {heading}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>{children}</TableBody>
      </MuiTable>
    </TableContainer>
  );
}

export default Table;
