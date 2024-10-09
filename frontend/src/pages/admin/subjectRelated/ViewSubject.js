import React, { useEffect, useState } from 'react';
import { getClassStudents, getSubjectDetails } from '../../../redux/sclassRelated/sclassHandle';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Tab, Container, Typography, Paper } from '@mui/material';
import { BlueButton, GreenButton, PurpleButton } from '../../../components/buttonStyles';
import TableTemplate from '../../../components/TableTemplate';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import InsertChartIcon from '@mui/icons-material/InsertChart';
import InsertChartOutlinedIcon from '@mui/icons-material/InsertChartOutlined';
import TableChartIcon from '@mui/icons-material/TableChart';
import TableChartOutlinedIcon from '@mui/icons-material/TableChartOutlined';

const ViewSubject = () => {
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  const { subloading, subjectDetails, sclassStudents, getresponse, error } = useSelector((state) => state.sclass);
  const { classID, subjectID } = params;

  useEffect(() => {
    dispatch(getSubjectDetails(subjectID, "Subject"));
    dispatch(getClassStudents(classID));
  }, [dispatch, subjectID, classID]);

  if (error) {
    console.error(error);
  }

  const [value, setValue] = useState('1');
  const handleChange = (event, newValue) => setValue(newValue);
  const [selectedSection, setSelectedSection] = useState('attendance');
  const handleSectionChange = (event, newSection) => setSelectedSection(newSection);

  const studentColumns = [
    { id: 'rollNum', label: 'Roll No.', minWidth: 100 },
    { id: 'name', label: 'Name', minWidth: 170 },
  ];

  const studentRows = sclassStudents.map((student) => ({
    rollNum: student.rollNum,
    name: student.name,
    id: student._id,
  }));

  const StudentsAttendanceButtonHaver = ({ row }) => (
    <>
      <BlueButton variant="contained" onClick={() => navigate("/Admin/students/student/" + row.id)}>
        View
      </BlueButton>
      <PurpleButton variant="contained" onClick={() => navigate(`/Admin/subject/student/attendance/${row.id}/${subjectID}`)}>
        Take Attendance
      </PurpleButton>
    </>
  );

  const StudentsMarksButtonHaver = ({ row }) => (
    <>
      <BlueButton variant="contained" onClick={() => navigate("/Admin/students/student/" + row.id)}>
        View
      </BlueButton>
      <PurpleButton variant="contained" onClick={() => navigate(`/Admin/subject/student/marks/${row.id}/${subjectID}`)}>
        Provide Marks
      </PurpleButton>
    </>
  );

  const SubjectStudentsSection = () => (
    <>
      {getresponse ? (
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
          <GreenButton variant="contained" onClick={() => navigate("/Admin/class/addstudents/" + classID)}>
            Add Students
          </GreenButton>
        </Box>
      ) : (
        <>
          <Typography variant="h5" gutterBottom>
            Students List:
          </Typography>

          {selectedSection === 'attendance' && <TableTemplate buttonHaver={StudentsAttendanceButtonHaver} columns={studentColumns} rows={studentRows} />}
          {selectedSection === 'marks' && <TableTemplate buttonHaver={StudentsMarksButtonHaver} columns={studentColumns} rows={studentRows} />}
        </>
      )}
    </>
  );

  const SubjectDetailsSection = () => (
    <Box sx={{ padding: '16px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
      <Typography variant="h4" align="center" gutterBottom>
        Subject Details
      </Typography>
      <Typography variant="h6" gutterBottom>
        Subject Name : {subjectDetails?.subName}
      </Typography>
      <Typography variant="h6" gutterBottom>
        Subject Code : {subjectDetails?.subCode}
      </Typography>
      <Typography variant="h6" gutterBottom>
        Subject Sessions : {subjectDetails?.sessions}
      </Typography>
      <Typography variant="h6" gutterBottom>
        Number of Students: {sclassStudents.length}
      </Typography>
      <Typography variant="h6" gutterBottom>
        Class Name : {subjectDetails?.sclassName?.sclassName}
      </Typography>
      {subjectDetails?.teacher ? (
        <Typography variant="h6" gutterBottom>
          Teacher Name : {subjectDetails.teacher.name}
        </Typography>
      ) : (
        <GreenButton variant="contained" onClick={() => navigate("/Admin/teachers/addteacher/" + subjectDetails._id)}>
          Add Subject Teacher
        </GreenButton>
      )}
    </Box>
  );

  return (
    <Container>
      {subloading ? (
        <Typography variant="h6">Loading...</Typography>
      ) : (
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} sx={{ bgcolor: 'background.paper' }}>
              <Tab label="Details" value="1" />
              <Tab label="Students" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <SubjectDetailsSection />
          </TabPanel>
          <TabPanel value="2">
            <SubjectStudentsSection />
          </TabPanel>
        </TabContext>
      )}
    </Container>
  );
};

export default ViewSubject;
