import { useEffect, useState } from 'react'; // Make sure to import useState
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { getAllStudents } from '../../../redux/studentRelated/studentHandle';
import { deleteUser } from '../../../redux/userRelated/userHandle';
import {
    Paper,
    Box,
    IconButton,
    Typography,
    CircularProgress
} from '@mui/material';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import { BlackButton, BlueButton, GreenButton } from '../../../components/buttonStyles';
import TableTemplate from '../../../components/TableTemplate';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import SpeedDialTemplate from '../../../components/SpeedDialTemplate';

import * as React from 'react';
import ButtonGroup from '@mui/material/ButtonGroup';
import { KeyboardArrowUp, KeyboardArrowDown } from '@mui/icons-material';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Popup from '../../../components/Popup';

const ShowStudents = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { studentsList, loading, error, response } = useSelector((state) => state.student);
    const { currentUser } = useSelector(state => state.user);

    // Define state for the popup
    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        dispatch(getAllStudents(currentUser._id));
    }, [currentUser._id, dispatch]);

    const deleteHandler = (deleteID, address) => {
        dispatch(deleteUser(deleteID, address))
            .then(() => {
                dispatch(getAllStudents(currentUser._id));
                setMessage("Student deleted successfully!"); // Set success message
                setShowPopup(true); // Show popup
            })
            .catch(err => {
                setMessage("Error deleting student!"); // Set error message
                setShowPopup(true); // Show popup
            });
    };

    const studentColumns = [
        { id: 'name', label: 'Name', minWidth: 170 },
        { id: 'rollNum', label: 'Roll Number', minWidth: 100 },
        { id: 'sclassName', label: 'Class', minWidth: 170 },
    ];

    const studentRows = studentsList && studentsList.map((student) => {
        return {
            name: student.name,
            rollNum: student.rollNum,
            sclassName: student.sclassName.sclassName,
            id: student._id,
        };
    });

    const StudentButtonHaver = ({ row }) => {
        const options = ['Take Attendance', 'Provide Marks'];

        const [open, setOpen] = React.useState(false);
        const anchorRef = React.useRef(null);
        const [selectedIndex, setSelectedIndex] = React.useState(0);

        const handleClick = () => {
            if (selectedIndex === 0) {
                navigate(`/Admin/students/student/attendance/${row.id}`);
            } else if (selectedIndex === 1) {
                navigate(`/Admin/students/student/marks/${row.id}`);
            }
        };

        const handleToggle = () => {
            setOpen((prevOpen) => !prevOpen);
        };

        const handleClose = (event) => {
            if (anchorRef.current && anchorRef.current.contains(event.target)) {
                return;
            }
            setOpen(false);
        };

        return (
            <>
                <IconButton onClick={() => deleteHandler(row.id, "Student")}>
                    <PersonRemoveIcon color="error" />
                </IconButton>
                <BlueButton variant="contained"
                    onClick={() => navigate(`/Admin/students/student/${row.id}`)}>
                    View
                </BlueButton>
                <ButtonGroup variant="contained" ref={anchorRef} aria-label="split button">
                    <BlackButton onClick={handleClick}>{options[selectedIndex]}</BlackButton>
                    <BlackButton
                        size="small"
                        onClick={handleToggle}
                    >
                        {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                    </BlackButton>
                    <Popper
                        sx={{ zIndex: 1 }}
                        open={open}
                        anchorEl={anchorRef.current}
                        role={undefined}
                        transition
                        disablePortal
                    >
                        {({ TransitionProps, placement }) => (
                            <Grow
                                {...TransitionProps}
                                style={{
                                    transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
                                }}
                            >
                                <Paper>
                                    <ClickAwayListener onClickAway={handleClose}>
                                        <MenuList id="split-button-menu" autoFocusItem>
                                            {options.map((option, index) => (
                                                <MenuItem
                                                    key={option}
                                                    selected={index === selectedIndex}
                                                    onClick={(event) => {
                                                        setSelectedIndex(index);
                                                        handleClose(event);
                                                    }}
                                                >
                                                    {option}
                                                </MenuItem>
                                            ))}
                                        </MenuList>
                                    </ClickAwayListener>
                                </Paper>
                            </Grow>
                        )}
                    </Popper>
                </ButtonGroup>
            </>
        );
    };

    const actions = [
        {
            icon: <PersonAddAlt1Icon color="primary" />, name: 'Add New Student',
            action: () => navigate("/Admin/addstudents")
        },
        {
            icon: <PersonRemoveIcon color="error" />, name: 'Delete All Students',
            action: () => deleteHandler(currentUser._id, "Students")
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
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '16px' }}>
                            <GreenButton variant="contained" onClick={() => navigate("/Admin/addstudents")}>
                                Add Students
                            </GreenButton>
                        </Box>
                    ) : (
                        <Paper sx={{ width: '100%', overflow: 'hidden', padding: 2 }}>
                            <Typography variant="h6" sx={{ marginBottom: 2 }}>Students</Typography>
                            {Array.isArray(studentsList) && studentsList.length > 0 && (
                                <TableTemplate buttonHaver={StudentButtonHaver} columns={studentColumns} rows={studentRows} />
                            )}
                            <SpeedDialTemplate actions={actions} />
                        </Paper>
                    )}
                </>
            )}
            {error && (
                <Box sx={{ color: 'red', marginTop: '16px' }}>
                    <Typography variant="body2">{error.message || "An error occurred while fetching students."}</Typography>
                </Box>
            )}
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </Box>
    );
};

export default ShowStudents;
