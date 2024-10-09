import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Grid, Box, Button, Typography } from '@mui/material';
import styled from 'styled-components';
import Students from '../assets/login.png';

const Homepage = () => {
    return (
        <StyledBackground>
            <StyledContainer maxWidth="lg">
                <Grid container spacing={3} alignItems="center">
                    <Grid item xs={12} md={6}>
                        <StyledImageContainer>
                            <StyledImage src={Students} alt="students" />
                        </StyledImageContainer>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
                            <StyledTitle variant="h2">
                                Elevate Your Learning Experience
                            </StyledTitle>
                            <StyledText variant="body1">
                                Manage school operations effortlessly. From tracking attendance to organizing classes, we provide a powerful system to enhance your school's performance.
                            </StyledText>
                            <ButtonGroupContainer>
                                <StyledLink to="/choose">
                                    <StyledPrimaryButton variant="contained">
                                        Get Started
                                    </StyledPrimaryButton>
                                </StyledLink>
                                <StyledLink to="/chooseasguest">
                                    <StyledSecondaryButton variant="outlined">
                                        Try as Guest
                                    </StyledSecondaryButton>
                                </StyledLink>
                            </ButtonGroupContainer>
                            <StyledText variant="body2">
                                New here?{' '}
                                <Link to="/Adminregister" style={{ color: '#ff914d', textDecoration: 'none', fontWeight: 'bold' }}>
                                    Create an Account
                                </Link>
                            </StyledText>
                        </Box>
                    </Grid>
                </Grid>
            </StyledContainer>
        </StyledBackground>
    );
};

export default Homepage;

// Styled Components
const StyledBackground = styled.div`
    background: linear-gradient(45deg, #85FFBD, #FFFB7D);
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
`;

const StyledContainer = styled(Container)`
    background: white;
    border-radius: 20px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
    padding: 50px;
`;

const StyledImageContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const StyledImage = styled.img`
    border-radius: 20px;
    max-width: 100%;
    height: auto;
    transition: transform 0.5s ease;
    &:hover {
        transform: scale(1.05);
    }
`;

const StyledTitle = styled(Typography)`
    font-family: 'Poppins', sans-serif;
    color: #333;
    font-weight: 700;
    text-align: center;
    margin-bottom: 20px;
    font-size: 2.7rem;
    text-transform: uppercase;
`;

const StyledText = styled(Typography)`
    font-family: 'Roboto', sans-serif;
    color: #777;
    text-align: center;
    margin-bottom: 40px;
`;

const ButtonGroupContainer = styled.div`
    display: flex;
    gap: 16px;
    margin-bottom: 20px;
    justify-content: center;
`;

const StyledPrimaryButton = styled(Button)`
    background-color: #4A90E2;
    color: white;
    padding: 12px 28px;
    font-weight: bold;
    border-radius: 50px;
    text-transform: uppercase;
    transition: background-color 0.3s ease;
    &:hover {
        background-color: #357ABD;
    }
`;

const StyledSecondaryButton = styled(Button)`
    border: 2px solid #FF6B6B;
    color: #FF6B6B;
    padding: 12px 28px;
    font-weight: bold;
    border-radius: 50px;
    text-transform: uppercase;
    transition: all 0.3s ease;
    &:hover {
        background-color: rgba(255, 107, 107, 0.1);
        border-color: #E55D5D;
    }
`;

const StyledLink = styled(Link)`
    text-decoration: none;
    width: 100%;
    display: flex;
    justify-content: center;
`;
