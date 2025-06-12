import React, { useState, useCallback } from 'react';
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
} from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Dropzone from 'react-dropzone';
import FlexBetween from 'components/FlexBetween';
import { toast } from 'react-toastify';
import { setToken, setUser } from '../state';
import { API_ENDPOINTS } from '../config/api.config';

// Validation Schema
const registerSchema = yup.object().shape({
  firstName: yup.string().required('First Name is required'),
  lastName: yup.string().required('Last Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  location: yup.string().required('Location is required'),
  occupation: yup.string().required('Occupation is required'),
  picture: yup.mixed().required('Profile picture is required'), // Handling file upload validation
});

const loginSchema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required'),
});

// Initial values for form fields
const initialValuesRegister = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  location: '',
  occupation: '',
  picture: '',
};

const initialValuesLogin = {
  email: '',
  password: '',
};

const Form = React.memo(() => {
  const [pageType, setPageType] = useState('login');
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery('(min-width:600px)');
  const isLogin = pageType === 'login';
  const isRegister = pageType === 'register';

  // Registration handler
  const register = useCallback(async (values, onSubmitProps) => {
    const formData = new FormData();
    for (let value in values) {
      formData.append(value, values[value]);
    }
    formData.append('picturePath', values.picture.name);

    try {
      const savedUserResponse = await fetch(
        API_ENDPOINTS.AUTH.REGISTER,
        {
          method: 'POST',
          body: formData,
        }
      );

      if (!savedUserResponse.ok) {
        const error = await savedUserResponse.json();
        throw new Error(
          error.message || 'Registration failed. Please try again.'
        );
      }

      const savedUser = await savedUserResponse.json();
      onSubmitProps.resetForm();

      toast.success('Registration successful! Please log in.');
      setPageType('login');
      navigate('/login');
    } catch (error) {
      if (error.name === 'AbortError') {
        toast.error('Request was cancelled.');
      } else if (error.message === 'Failed to fetch') {
        toast.error('Network error. Please check your internet connection.');
      } else {
        toast.error(error.message || 'Registration failed. Please try again.');
      }
    }
  }, [navigate]);

  // Login handler
  const login = useCallback(async (values, onSubmitProps) => {
    try {
      const loggedInResponse = await fetch(API_ENDPOINTS.AUTH.LOGIN, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      if (!loggedInResponse.ok) {
        const error = await loggedInResponse.json();
        throw new Error(error.message || 'Login failed. Please try again.');
      }

      const loggedIn = await loggedInResponse.json();
      onSubmitProps.resetForm();

      dispatch(
        setUser({
          user: loggedIn.user,
        })
      );
      dispatch(
        setToken({
          token: loggedIn.token,
        })
      );
      toast.success('Login successful!');
      navigate('/home');
    } catch (error) {
      if (error.name === 'AbortError') {
        toast.error('Request was cancelled.');
      } else if (error.message === 'Failed to fetch') {
        toast.error('Network error. Please check your internet connection.');
      } else {
        toast.error(
          error.message || 'Login failed. Please check your credentials.'
        );
      }
    }
  }, [dispatch, navigate]);

  // Handle form submit
  const handleFormSubmit = useCallback(async (values, onSubmitProps) => {
    if (isLogin) {
      await login(values, onSubmitProps);
    }
    if (isRegister) {
      await register(values, onSubmitProps);
    }
  }, [isLogin, isRegister, login, register]);

  const handlePageTypeChange = useCallback(() => {
    setPageType(isLogin ? 'register' : 'login');
    resetForm();
  }, [isLogin, resetForm]);

  return (
    <>
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
        validationSchema={isLogin ? loginSchema : registerSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          setFieldValue,
          resetForm,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                '& > div': { gridColumn: isNonMobile ? undefined : 'span 4' },
              }}
            >
              {isRegister && (
                <>
                  <TextField
                    label="First Name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.firstName || ''} // Ensure value is always a string
                    name="firstName"
                    error={
                      Boolean(touched.firstName) && Boolean(errors.firstName)
                    }
                    helperText={touched.firstName && errors.firstName}
                    sx={{ gridColumn: 'span 2' }}
                  />
                  <TextField
                    label="Last Name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.lastName || ''} // Ensure value is always a string
                    name="lastName"
                    error={
                      Boolean(touched.lastName) && Boolean(errors.lastName)
                    }
                    helperText={touched.lastName && errors.lastName}
                    sx={{ gridColumn: 'span 2' }}
                  />
                  <TextField
                    label="Location"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.location || ''} // Ensure value is always a string
                    name="location"
                    error={
                      Boolean(touched.location) && Boolean(errors.location)
                    }
                    helperText={touched.location && errors.location}
                    sx={{ gridColumn: 'span 4' }}
                  />
                  <TextField
                    label="Occupation"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.occupation || ''} // Ensure value is always a string
                    name="occupation"
                    error={
                      Boolean(touched.occupation) && Boolean(errors.occupation)
                    }
                    helperText={touched.occupation && errors.occupation}
                    sx={{ gridColumn: 'span 4' }}
                  />
                  <Box
                    gridColumn="span 4"
                    border={`1px solid ${palette.neutral.medium}`}
                    borderRadius="5px"
                    p="1rem"
                  >
                    <Dropzone
                      acceptedFiles=".jpg,.jpeg,.png"
                      multiple={false}
                      onDrop={(acceptedFiles) =>
                        setFieldValue('picture', acceptedFiles[0])
                      }
                    >
                      {({ getRootProps, getInputProps }) => (
                        <Box
                          {...getRootProps()}
                          border={`2px dashed ${palette.primary.main}`}
                          p="1rem"
                          sx={{ '&:hover': { cursor: 'pointer' } }}
                        >
                          <input {...getInputProps()} />
                          {!values.picture ? (
                            <p>Add Picture Here</p>
                          ) : (
                            <FlexBetween>
                              <Typography>{values.picture.name}</Typography>
                              <EditOutlinedIcon />
                            </FlexBetween>
                          )}
                        </Box>
                      )}
                    </Dropzone>
                  </Box>
                </>
              )}

              <TextField
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email || ''} // Ensure value is always a string
                name="email"
                error={Boolean(touched.email) && Boolean(errors.email)}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: 'span 4' }}
              />
              <TextField
                label="Password"
                type="password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password || ''} // Ensure value is always a string
                name="password"
                error={Boolean(touched.password) && Boolean(errors.password)}
                helperText={touched.password && errors.password}
                sx={{ gridColumn: 'span 4' }}
              />
            </Box>

            {/* BUTTONS */}
            <Box>
              <Button
                fullWidth
                type="submit"
                sx={{
                  m: '2rem 0',
                  p: '1rem',
                  backgroundColor: palette.primary.main,
                  color: palette.background.alt,
                  '&:hover': { color: palette.primary.main },
                }}
              >
                {isLogin ? 'LOGIN' : 'REGISTER'}
              </Button>
              <Typography
                onClick={handlePageTypeChange}
                sx={{
                  textDecoration: 'underline',
                  color: palette.primary.main,
                  '&:hover': {
                    cursor: 'pointer',
                    color: palette.primary.light,
                  },
                }}
              >
                {isLogin
                  ? "Don't have an account? Sign Up here."
                  : 'Already have an account? Login here.'}
              </Typography>
            </Box>
          </form>
        )}
      </Formik>
    </>
  );
});

export default Form;
