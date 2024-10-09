import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getClassDetails, getClassStudents, getSubjectList } from "../../../redux/sclassRelated/sclassHandle";
import { deleteUser } from '../../../redux/userRelated/userHandle';
import { Box, Container, Typography, Tab, IconButton, CircularProgress } from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { resetSubjects } from "../../../redux/sclassRelated/sclassSlice";
import { BlueButton, GreenButton, PurpleButton } from "../../../components/buttonStyles";
import TableTemplate from "../../../components/TableTemplate";
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import SpeedDialTemplate from "../../../components/SpeedDialTemplate";
import Popup from "../../../components/Popup";
import DeleteIcon from "@mui/icons-material/Delete";
import PostAddIcon from '@mui/icons-material/PostAdd';

const ClassDetails = () => {
    const params = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { subjectsList, sclassStudents, sclassDetails, loading, error, response, getresponse } = useSelector((state) => state.sclass);

    const classID = params.id;

    useEffect(() => {
        dispatch(getClassDetails(classID, "Sclass"));
        dispatch(getSubjectList(classID, "ClassSubjects"));
        dispatch(getClassStudents(classID));
    }, [dispatch, classID]);

    if (error) {
        console.error(error);
    }

    const [value, setValue] = useState('1');
    const [showPopup, setShowPopup] = useState(false);
    // eslint-disable-next-line
    const [message, setMessage] = useState("");

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const deleteHandler = (deleteID, address) => {
        dispatch(deleteUser(deleteID, address))
            .then(() => {
                dispatch(getClassStudents(classID));
                dispatch(resetSubjects());
                dispatch(getSubjectList(classID, "ClassSubjects"));
            });
    };

    const subjectColumns = [
        { id: 'name', label: 'Subject Name', minWidth: 170 },
        { id: 'code', label: 'Subject Code', minWidth: 100 },
    ];

    const subjectRows = subjectsList?.map((subject) => ({
        name: subject.subName,
        code: subject.subCode,
        id: subject._id,
    }));

    const SubjectsButtonHaver = ({ row }) => (
        <>
            <IconButton onClick={() => deleteHandler(row.id, "Subject")}>
                <DeleteIcon color="error" />
            </IconButton>
            <BlueButton variant="contained" onClick={() => navigate(`/Admin/class/subject/${classID}/${row.id}`)}>
                View
            </BlueButton>
        </>
    );

    const subjectActions = [
        {
            icon: <PostAddIcon color="primary" />, name: 'Add New Subject',
            action: () => navigate(`/Admin/addsubject/${classID}`)
        },
        {
            icon: <DeleteIcon color="error" />, name: 'Delete All Subjects',
            action: () => deleteHandler(classID, "SubjectsClass")
        }
    ];

    const ClassSubjectsSection = () => (
        <>
            {response ? (
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2 }}>
                    <GreenButton variant="contained" onClick={() => navigate(`/Admin/addsubject/${classID}`)}>
                        Add Subjects
                    </GreenButton>
                </Box>
            ) : (
                <>
                    <Typography variant="h5" gutterBottom>
                        Subjects List:
                    </Typography>
                    <TableTemplate buttonHaver={SubjectsButtonHaver} columns={subjectColumns} rows={subjectRows} />
                    <SpeedDialTemplate actions={subjectActions} />
                </>
            )}
        </>
    );

    const studentColumns = [
        { id: 'name', label: 'Name', minWidth: 170 },
        { id: 'rollNum', label: 'Roll Number', minWidth: 100 },
    ];

    const studentRows = sclassStudents?.map((student) => ({
        name: student.name,
        rollNum: student.rollNum,
        id: student._id,
    }));

    const StudentsButtonHaver = ({ row }) => (
        <>
            <IconButton onClick={() => deleteHandler(row.id, "Student")}>
                <PersonRemoveIcon color="error" />
            </IconButton>
            <BlueButton variant="contained" onClick={() => navigate(`/Admin/students/student/${row.id}`)}>
                View
            </BlueButton>
            <PurpleButton variant="contained" onClick={() => navigate(`/Admin/students/student/attendance/${row.id}`)}>
                Attendance
            </PurpleButton>
        </>
    );

    const studentActions = [
        {
            icon: <PersonAddAlt1Icon color="primary" />, name: 'Add New Student',
            action: () => navigate(`/Admin/class/addstudents/${classID}`)
        },
        {
            icon: <PersonRemoveIcon color="error" />, name: 'Delete All Students',
            action: () => deleteHandler(classID, "StudentsClass")
        },
    ];

    const ClassStudentsSection = () => (
        <>
            {getresponse ? (
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2 }}>
                    <GreenButton variant="contained" onClick={() => navigate(`/Admin/class/addstudents/${classID}`)}>
                        Add Students
                    </GreenButton>
                </Box>
            ) : (
                <>
                    <Typography variant="h5" gutterBottom>
                        Students List:
                    </Typography>
                    <TableTemplate buttonHaver={StudentsButtonHaver} columns={studentColumns} rows={studentRows} />
                    <SpeedDialTemplate actions={studentActions} />
                </>
            )}
        </>
    );

    const ClassTeachersSection = () => (
        <Typography variant="h5">Teachers</Typography>
    );

    const ClassDetailsSection = () => {
        const numberOfSubjects = subjectsList.length;
        const numberOfStudents = sclassStudents.length;

        return (
            <>
                <Typography variant="h4" align="center" gutterBottom>
                    Class Details
                </Typography>
                <Typography variant="h5" gutterBottom>
                    This is Class {sclassDetails.sclassName}
                </Typography>
                <Typography variant="body1">Total Subjects: {numberOfSubjects}</Typography>
                <Typography variant="body1">Total Students: {numberOfStudents}</Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
                    <BlueButton variant="contained" onClick={() => navigate(-1)}>
                        Go Back
                    </BlueButton>
                </Box>
            </>
        );
    };
    return (
        <Container maxWidth="lg" sx={{ padding: 2 }}>
            <ClassDetailsSection />
            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 3 }}>
                    <CircularProgress />
                </Box>
            ) : (
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleChange} aria-label="class tabs">
                            <Tab label="Class Subjects" value="1" />
                            <Tab label="Class Students" value="2" />
                            <Tab label="Class Teachers" value="3" />
                        </TabList>
                    </Box>
                    <TabPanel value="1"><ClassSubjectsSection /></TabPanel>
                    <TabPanel value="2"><ClassStudentsSection /></TabPanel>
                    <TabPanel value="3"><ClassTeachersSection /></TabPanel>
                </TabContext>
            )}
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </Container>
    );
};

export default ClassDetails;
