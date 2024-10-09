import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, Typography, CircularProgress } from '@mui/material';
import { getAllSclasses } from '../../../redux/sclassRelated/sclassHandle';
import { useNavigate } from 'react-router-dom';
import { PurpleButton } from '../../../components/buttonStyles';
import TableTemplate from '../../../components/TableTemplate';

const ChooseClass = ({ situation }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { sclassesList, loading, error, getresponse } = useSelector((state) => state.sclass);
    const { currentUser } = useSelector(state => state.user);

    useEffect(() => {
        dispatch(getAllSclasses(currentUser._id, "Sclass"));
    }, [currentUser._id, dispatch]);

    if (error) {
        console.error(error);
    }

    const navigateHandler = (classID) => {
        const path = situation === "Teacher" ? 
            `/Admin/teachers/choosesubject/${classID}` : 
            `/Admin/addsubject/${classID}`;
        navigate(path);
    };

    const sclassColumns = [
        { id: 'name', label: 'Class Name', minWidth: 170 },
    ];

    const sclassRows = sclassesList?.map((sclass) => ({
        name: sclass.sclassName,
        id: sclass._id,
    }));

    const SclassButtonHaver = ({ row }) => (
        <PurpleButton variant="contained" onClick={() => navigateHandler(row.id)}>
            Choose
        </PurpleButton>
    );

    return (
        <Box sx={{ padding: 2 }}>
            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 3 }}>
                    <CircularProgress />
                </Box>
            ) : (
                <>
                    {getresponse && (
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2 }}>
                            <Button variant="outlined" onClick={() => navigate("/Admin/addclass")}>
                                Add Class
                            </Button>
                        </Box>
                    )}
                    <Typography variant="h5" gutterBottom sx={{ marginTop: 3 }}>
                        Choose a Class
                    </Typography>
                    {sclassesList && (
                        <TableTemplate buttonHaver={SclassButtonHaver} columns={sclassColumns} rows={sclassRows} />
                    )}
                </>
            )}
        </Box>
    );
};

export default ChooseClass;
