import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { getSubjectList } from '../../../redux/sclassRelated/sclassHandle';
import { deleteUser } from '../../../redux/userRelated/userHandle';
import PostAddIcon from '@mui/icons-material/PostAdd';
import DeleteIcon from "@mui/icons-material/Delete";
import {
    Paper, Box, IconButton, Typography, Grid, CircularProgress
} from '@mui/material';
import TableTemplate from '../../../components/TableTemplate';
import { BlueButton, GreenButton } from '../../../components/buttonStyles';
import SpeedDialTemplate from '../../../components/SpeedDialTemplate';
import Popup from '../../../components/Popup';

const ShowSubjects = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { subjectsList, loading, error, response } = useSelector((state) => state.sclass);
    const { currentUser } = useSelector(state => state.user);

    useEffect(() => {
        dispatch(getSubjectList(currentUser._id, "AllSubjects"));
    }, [currentUser._id, dispatch]);

    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");

    const deleteHandler = (deleteID, address) => {
        dispatch(deleteUser(deleteID, address))
            .then(() => {
                dispatch(getSubjectList(currentUser._id, "AllSubjects"));
            })
            .catch((err) => {
                setMessage("Failed to delete subject. Please try again.");
                setShowPopup(true);
            });
    }

    const subjectColumns = [
        { id: 'subName', label: 'Subject Name', minWidth: 170 },
        { id: 'sessions', label: 'Sessions', minWidth: 170 },
        { id: 'sclassName', label: 'Class', minWidth: 170 },
    ];

    const subjectRows = subjectsList.map((subject) => ({
        subName: subject.subName,
        sessions: subject.sessions,
        sclassName: subject.sclassName.sclassName,
        sclassID: subject.sclassName._id,
        id: subject._id,
    }));

    const SubjectsButtonHaver = ({ row }) => (
        <>
            <IconButton onClick={() => deleteHandler(row.id, "Subject")} aria-label="delete subject">
                <DeleteIcon color="error" />
            </IconButton>
            <BlueButton variant="contained" onClick={() => navigate(`/Admin/subjects/subject/${row.sclassID}/${row.id}`)}>
                View
            </BlueButton>
        </>
    );

    const actions = [
        {
            icon: <PostAddIcon color="primary" />, name: 'Add New Subject',
            action: () => navigate("/Admin/subjects/chooseclass")
        },
        {
            icon: <DeleteIcon color="error" />, name: 'Delete All Subjects',
            action: () => deleteHandler(currentUser._id, "Subjects")
        }
    ];

    return (
        <Box sx={{ padding: 2 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Manage Subjects
            </Typography>
            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}>
                    <CircularProgress />
                </Box>
            ) : (
                <>
                    {response && (
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 2 }}>
                            <GreenButton variant="contained" onClick={() => navigate("/Admin/subjects/chooseclass")}>
                                Add Subjects
                            </GreenButton>
                        </Box>
                    )}
                    <Paper sx={{ width: '100%', overflow: 'hidden', padding: 2 }}>
                        {Array.isArray(subjectsList) && subjectsList.length > 0 ? (
                            <TableTemplate buttonHaver={SubjectsButtonHaver} columns={subjectColumns} rows={subjectRows} />
                        ) : (
                            <Typography variant="body1" color="textSecondary" align="center">
                                No subjects found.
                            </Typography>
                        )}
                        <SpeedDialTemplate actions={actions} />
                    </Paper>
                </>
            )}
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </Box>
    );
};

export default ShowSubjects;
