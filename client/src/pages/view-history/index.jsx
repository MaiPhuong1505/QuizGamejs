import { default as React } from 'react';
import './viewHistory.scss';

import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { Box, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';

const ViewHistory = () => {
  return (
    <>
      <Box className="view__result">
        <div className="view__result--header">QuizGame</div>
        <div className="view__result--inner">
          <div className="view__result--content">
            <Typography variant="h4" component="h2" gutterBottom>
              Flashcard title
            </Typography>
            <Table
              sx={{ minWidth: 650, boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', borderRadius: '8px', height: '100%' }}
              aria-label="simple table"
              className="table"
            >
              <TableHead className="table__header">
                <TableRow>
                  <TableCell sx={{ fontWeight: '700', width: '5%' }}>No.</TableCell>
                  <TableCell sx={{ fontWeight: '700', width: '30%' }}>Quiz name title</TableCell>
                  <TableCell sx={{ fontWeight: '700', width: '30%' }}>Date</TableCell>
                  <TableCell sx={{ fontWeight: '700', width: '20%' }}>Number of playes</TableCell>
                  <TableCell sx={{ fontWeight: '700', width: '5%' }}></TableCell>
                </TableRow>
              </TableHead>
              <TableBody className="table__body">
                <TableRow>
                  <TableCell>1</TableCell>
                  <TableCell>Quiz 1</TableCell>
                  <TableCell>April 17, 2023 2:40PM</TableCell>
                  <TableCell>15</TableCell>
                  <TableCell>
                    <RemoveRedEyeIcon className="eye-icon" />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>2</TableCell>
                  <TableCell>Quiz 1</TableCell>
                  <TableCell>April 17, 2023 2:40PM</TableCell>
                  <TableCell>15</TableCell>
                  <TableCell>
                    <RemoveRedEyeIcon className="eye-icon" />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>3</TableCell>
                  <TableCell>Quiz 1</TableCell>
                  <TableCell>April 17, 2023 2:40PM</TableCell>
                  <TableCell>15</TableCell>
                  <TableCell>
                    <RemoveRedEyeIcon className="eye-icon" />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      </Box>
    </>
  );
};

export default ViewHistory;
