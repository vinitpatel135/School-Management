import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Paper,
  Box,
  Checkbox,
  Typography,
  CircularProgress,
  Grid
} from '@mui/material';
import { getAllComplains } from '../../../redux/complainRelated/complainHandle';
import TableTemplate from '../../../components/TableTemplate';

const SeeComplains = () => {
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
  const dispatch = useDispatch();
  const { complainsList, loading, error, response } = useSelector((state) => state.complain);
  const { currentUser } = useSelector(state => state.user);

  useEffect(() => {
    dispatch(getAllComplains(currentUser._id, "Complain"));
  }, [currentUser._id, dispatch]);

  if (error) {
    console.log(error);
  }

  const complainColumns = [
    { id: 'user', label: 'User', minWidth: 170 },
    { id: 'complaint', label: 'Complaint', minWidth: 250 },
    { id: 'date', label: 'Date', minWidth: 170 },
  ];

  const complainRows = complainsList && complainsList.length > 0 && complainsList.map((complain) => {
    const date = new Date(complain.date);
    const dateString = date.toString() !== "Invalid Date" ? date.toISOString().substring(0, 10) : "Invalid Date";
    return {
      user: complain.user.name,
      complaint: complain.complaint,
      date: dateString,
      id: complain._id,
    };
  });

  const ComplainButtonHaver = ({ row }) => {
    return (
      <Checkbox {...label} />
    );
  };

  return (
    <Box sx={{ padding: 3 }}>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          {response ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '16px' }}>
              <Typography variant="h6" color="textSecondary">No Complaints Right Now</Typography>
            </Box>
          ) : (
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
              {Array.isArray(complainsList) && complainsList.length > 0 && (
                <TableTemplate
                  buttonHaver={ComplainButtonHaver}
                  columns={complainColumns}
                  rows={complainRows}
                />
              )}
            </Paper>
          )}
        </>
      )}
    </Box>
  );
};

export default SeeComplains;
