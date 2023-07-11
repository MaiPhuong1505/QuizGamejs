import React, { useEffect, useState } from 'react';
import './viewHistory.scss';
import { useSelector } from 'react-redux';

import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import {
  Box,
  Paper,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { historyServices } from '../../services/historyServices';

const ViewHistory = () => {
  const { user } = useSelector((state) => state);
  console.log('user in view history', user.user._id);
  const [historyList, setHistoryList] = useState([]);

  useEffect(() => {
    const getAllHistories = async () => {
      try {
        if (user?.user?._id) {
          const response = await historyServices.getAllHistories(user.user._id, user.token);
          if (response?.data) {
            setHistoryList(response?.data?.gameHistoryList);
            console.log('response?.data?.allGameHistories', response?.data?.gameHistoryList);
          }
        }
      } catch (error) {
        console.log('error', error);
      }
    };
    getAllHistories();
  }, []);
  return (
    <>
      <Box className="view__result">
        <div className="view__result--inner">
          <div className="view__result--content">
            <Typography variant="h5" gutterBottom>
              All game results
            </Typography>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table" className="table">
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
                  {historyList?.map((history, index) => (
                    <TableRow>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{history.quizTitle}</TableCell>
                      <TableCell>{history.createdAt}</TableCell>
                      <TableCell>{history.numberOfPlayers}</TableCell>
                      <TableCell>
                        <RemoveRedEyeIcon className="eye-icon" />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </Box>
    </>
  );
};

export default ViewHistory;
