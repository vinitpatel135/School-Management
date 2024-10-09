import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import {
    Paper,
    Box,
    IconButton,
    Typography,
    CircularProgress,
    Grid,
} from '@mui/material';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import DeleteIcon from "@mui/icons-material/Delete";
import { getAllNotices } from '../../../redux/noticeRelated/noticeHandle';
import { deleteUser } from '../../../redux/userRelated/userHandle';
import TableTemplate from '../../../components/TableTemplate';
import { GreenButton } from '../../../components/buttonStyles';
import SpeedDialTemplate from '../../../components/SpeedDialTemplate';

const ShowNotices = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { noticesList, loading, error, response } = useSelector((state) => state.notice);
    const { currentUser } = useSelector(state => state.user);

    useEffect(() => {
        dispatch(getAllNotices(currentUser._id, "Notice"));
    }, [currentUser._id, dispatch]);

    const deleteHandler = (deleteID, address) => {
        dispatch(deleteUser(deleteID, address))
            .then(() => {
                dispatch(getAllNotices(currentUser._id, "Notice"));
            });
    };

    const noticeColumns = [
        { id: 'title', label: 'Title', minWidth: 170 },
        { id: 'details', label: 'Details', minWidth: 250 },
        { id: 'date', label: 'Date', minWidth: 170 },
    ];

    const noticeRows = noticesList && noticesList.map((notice) => {
        const date = new Date(notice.date);
        const dateString = date.toString() !== "Invalid Date" ? date.toISOString().substring(0, 10) : "Invalid Date";
        return {
            title: notice.title,
            details: notice.details,
            date: dateString,
            id: notice._id,
        };
    });

    const NoticeButtonHaver = ({ row }) => {
        return (
            <IconButton onClick={() => deleteHandler(row.id, "Notice")}>
                <DeleteIcon color="error" />
            </IconButton>
        );
    };

    const actions = [
        {
            icon: <NoteAddIcon color="primary" />,
            name: 'Add New Notice',
            action: () => navigate("/Admin/addnotice"),
        },
        {
            icon: <DeleteIcon color="error" />,
            name: 'Delete All Notices',
            action: () => deleteHandler(currentUser._id, "Notices"),
        },
    ];

    return (
        <Box sx={{ padding: 3 }}>
            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
                    <CircularProgress />
                </Box>
            ) : (
                <>
                    {response ? (
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                            <Typography variant="h5">No Notices Found</Typography>
                            <GreenButton variant="contained" onClick={() => navigate("/Admin/addnotice")}>
                                Add Notice
                            </GreenButton>
                        </Box>
                    ) : (
                        <Paper sx={{ width: '100%', overflow: 'hidden', padding: 2 }}>
                            <Typography variant="h6" sx={{ marginBottom: 2 }}>Notices</Typography>
                            {Array.isArray(noticesList) && noticesList.length > 0 && (
                                <TableTemplate buttonHaver={NoticeButtonHaver} columns={noticeColumns} rows={noticeRows} />
                            )}
                            <SpeedDialTemplate actions={actions} />
                        </Paper>
                    )}
                </>
            )}
            {error && (
                <Box sx={{ color: 'red', marginTop: '16px' }}>
                    <Typography variant="body2">{error.message || "An error occurred while fetching notices."}</Typography>
                </Box>
            )}
        </Box>
    );
};

export default ShowNotices;
