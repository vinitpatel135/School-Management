import { Container, Grid, Paper } from '@mui/material';
import SeeNotice from '../../components/SeeNotice';
import styled from 'styled-components';
import CountUp from 'react-countup';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getAllSclasses } from '../../redux/sclassRelated/sclassHandle';
import { getAllStudents } from '../../redux/studentRelated/studentHandle';
import { getAllTeachers } from '../../redux/teacherRelated/teacherHandle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserGraduate, faChalkboardTeacher, faFolderOpen, faDollarSign } from '@fortawesome/free-solid-svg-icons';

const AdminHomePage = () => {
    const dispatch = useDispatch();
    const { studentsList } = useSelector((state) => state.student);
    const { sclassesList } = useSelector((state) => state.sclass);
    const { teachersList } = useSelector((state) => state.teacher);

    const { currentUser } = useSelector(state => state.user);

    const adminID = currentUser._id;

    useEffect(() => {
        dispatch(getAllStudents(adminID));
        dispatch(getAllSclasses(adminID, "Sclass"));
        dispatch(getAllTeachers(adminID));
    }, [adminID, dispatch]);

    const numberOfStudents = studentsList?.length || 0;
    const numberOfClasses = sclassesList?.length || 0;
    const numberOfTeachers = teachersList?.length || 0;

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Heading>Total Overview</Heading>
                </Grid>
                <Grid item xs={12} md={3}>
                    <StyledCard>
                        <IconWrapper>
                            <FontAwesomeIcon icon={faUserGraduate} size="3x" />
                        </IconWrapper>
                        <CardTitle>Total Students</CardTitle>
                        <CountData start={0} end={numberOfStudents} duration={2.5} />
                    </StyledCard>
                </Grid>
                <Grid item xs={12} md={3}>
                    <StyledCard>
                        <IconWrapper>
                            <FontAwesomeIcon icon={faFolderOpen} size="3x" />
                        </IconWrapper>
                        <CardTitle>Total Classes</CardTitle>
                        <CountData start={0} end={numberOfClasses} duration={2.5} />
                    </StyledCard>
                </Grid>
                <Grid item xs={12} md={3}>
                    <StyledCard>
                        <IconWrapper>
                            <FontAwesomeIcon icon={faChalkboardTeacher} size="3x" />
                        </IconWrapper>
                        <CardTitle>Total Teachers</CardTitle>
                        <CountData start={0} end={numberOfTeachers} duration={2.5} />
                    </StyledCard>
                </Grid>
                <Grid item xs={12} md={3}>
                    <StyledCard>
                        <IconWrapper>
                            <FontAwesomeIcon icon={faDollarSign} size="3x" />
                        </IconWrapper>
                        <CardTitle>Fees Collection</CardTitle>
                        <CountData start={0} end={23000} duration={2.5} prefix="$" />
                    </StyledCard>
                </Grid>
                <Grid item xs={12}>
                    <StyledPaper>
                        <SeeNotice />
                    </StyledPaper>
                </Grid>
            </Grid>
        </Container>
    );
};

// Styled Components
const Heading = styled.h1`
    font-size: 2.5rem;
    color: #2C2C2C;
    text-align: center;
    margin-bottom: 20px;
`;

const StyledCard = styled(Paper)`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
    height: 180px;
    border-radius: 15px;
    background-color: #f8f9fa;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s;
    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
    }
`;

const IconWrapper = styled.div`
    color: #FF6F61;
    margin-bottom: 10px;
`;

const CardTitle = styled.p`
    font-size: 1.25rem;
    font-weight: 600;
    margin: 10px 0;
`;

const CountData = styled(CountUp)`
    font-size: 2rem;
    color: #4caf50;
`;

const StyledPaper = styled(Paper)`
    padding: 20px;
    display: flex;
    flex-direction: column;
    border-radius: 15px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
`;

export default AdminHomePage;
