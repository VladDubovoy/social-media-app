import { useState, useRef, useEffect } from 'react';
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  Paper,
  Fade,
  IconButton,
  InputAdornment,
  Container,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { setLogin } from '../state/slices/authSlice';
import { API_ENDPOINTS } from '../config/api.config';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useTheme } from '@mui/material';
import { EditOutlined as EditOutlinedIcon } from '@mui/icons-material';
import FlexBetween from './FlexBetween';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Dropzone from 'react-dropzone';

const AuthForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobileScreens = useMediaQuery('(min-width: 1000px)');
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [authSuccess, setAuthSuccess] = useState(false);
  const theme = useTheme();
  const { palette } = theme;
  const toastShown = useRef(false);

  useEffect(() => {
    if (authSuccess) {
      toast.success(isLogin ? 'Welcome back! Login successful!' : 'Account created successfully!', {
        duration: 3000,
        position: 'top-center',
        style: {
          background: '#333',
          color: '#fff',
          borderRadius: '10px',
          padding: '16px',
        },
        icon: isLogin ? '👋' : '🎉',
      });
      setAuthSuccess(false);
    }
  }, [authSuccess, isLogin]);

  // Validation schema
  const validationSchema = Yup.object().shape({
    firstName: Yup.string()
      .when('isLogin', {
        is: false,
        then: () => Yup.string().required("required"),
      }),
    lastName: Yup.string()
      .when('isLogin', {
        is: false,
        then: () => Yup.string().required("required"),
      }),
    email: Yup.string()
      .email("invalid email")
      .required("required"),
    password: Yup.string()
      .required("required"),
    location: Yup.string()
      .when('isLogin', {
        is: false,
        then: () => Yup.string().required("required"),
      }),
    occupation: Yup.string()
      .when('isLogin', {
        is: false,
        then: () => Yup.string().required("required"),
      }),
    picture: Yup.mixed()
      .when('isLogin', {
        is: false,
        then: () => Yup.mixed().required("required"),
      }),
  });

  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    location: '',
    occupation: '',
    picture: '',
    isLogin: true,
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      if (isLogin) {
        // For login, send JSON data
        const response = await fetch(
          API_ENDPOINTS.AUTH.LOGIN,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: values.email,
              password: values.password,
            }),
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Authentication failed');
        }

        const data = await response.json();
        dispatch(setLogin({ user: data.user, token: data.token }));
        toast.success('Welcome back! Login successful!', {
          duration: 3000,
          position: 'top-center',
          style: {
            background: '#333',
            color: '#fff',
            borderRadius: '10px',
            padding: '16px',
          },
          icon: '👋',
        });
        navigate('/home');
      } else {
        // For registration, send FormData
        const formData = new FormData();
        
        // Add all text fields except picture and isLogin
        Object.keys(values).forEach(key => {
          if (key !== 'isLogin') {
            formData.append(key, values[key]);
          }
        });

        // Add the actual file with the correct field name
        if (values.picture) {
          formData.append('picturePath', values.picture.name);
        }

        const response = await fetch(
          API_ENDPOINTS.AUTH.REGISTER,
          {
            method: 'POST',
            body: formData,
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Registration failed');
        }

        const data = await response.json();
        dispatch(setLogin({ user: data.user, token: data.token }));
        toast.success('Account created successfully!', {
          duration: 3000,
          position: 'top-center',
          style: {
            background: '#333',
            color: '#fff',
            borderRadius: '10px',
            padding: '16px',
          },
          icon: '🎉',
        });
        navigate('/home');
      }
    } catch (error) {
      toast.error(error.message || 'Authentication failed', {
        duration: 3000,
        position: 'top-center',
        style: {
          background: '#333',
          color: '#fff',
          borderRadius: '10px',
          padding: '16px',
        },
        icon: '❌',
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container
      maxWidth={false}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(45deg, primary.main 30%, accent.main 90%)',
        py: 4,
        px: 2,
      }}
    >
      <Fade in timeout={800}>
        <Paper
          elevation={3}
          sx={{
            width: isNonMobileScreens ? '90%' : '95%',
            maxWidth: '1200px',
            p: { xs: '1.5rem', sm: '2rem' },
            borderRadius: '1.5rem',
            backgroundColor: 'background.alt',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
            overflow: 'auto',
            maxHeight: '80vh',
          }}
        >
          <Typography
            variant="h4"
            sx={{
              mb: '1.5rem',
              textAlign: 'center',
              fontWeight: 600,
              color: 'primary.main',
              letterSpacing: '0.5px',
            }}
          >
            {isLogin ? 'Welcome Back!' : 'Create Account'}
          </Typography>

          <Formik
            initialValues={{ ...initialValues, isLogin }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            enableReinitialize
          >
            {({ values, errors, touched, setFieldValue, isSubmitting }) => (
              <Form>
                <Box 
                  display="flex" 
                  flexDirection="column" 
                  gap="1.5rem"
                  sx={{
                    maxHeight: 'calc(80vh - 150px)',
                    overflowY: 'auto',
                    pr: 2,
                    py: 2,
                    '&::-webkit-scrollbar': {
                      width: '8px',
                    },
                    '&::-webkit-scrollbar-track': {
                      background: 'transparent',
                    },
                    '&::-webkit-scrollbar-thumb': {
                      background: 'primary.light',
                      borderRadius: '4px',
                    },
                  }}
                >
                  {!isLogin && (
                    <Fade in timeout={500}>
                      <Box 
                        display="flex" 
                        flexDirection="column" 
                        gap="1.5rem"
                        sx={{
                          width: '100%',
                          mb: 1,
                        }}
                      >
                        <Field
                          as={TextField}
                          label="First Name"
                          name="firstName"
                          fullWidth
                          size="small"
                          error={touched.firstName && Boolean(errors.firstName)}
                          helperText={touched.firstName && errors.firstName}
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              '&:hover fieldset': {
                                borderColor: 'primary.main',
                              },
                            },
                          }}
                        />
                        <Field
                          as={TextField}
                          label="Last Name"
                          name="lastName"
                          fullWidth
                          size="small"
                          error={touched.lastName && Boolean(errors.lastName)}
                          helperText={touched.lastName && errors.lastName}
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              '&:hover fieldset': {
                                borderColor: 'primary.main',
                              },
                            },
                          }}
                        />
                        <Field
                          as={TextField}
                          label="Location"
                          name="location"
                          fullWidth
                          size="small"
                          error={touched.location && Boolean(errors.location)}
                          helperText={touched.location && errors.location}
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              '&:hover fieldset': {
                                borderColor: 'primary.main',
                              },
                            },
                          }}
                        />
                        <Field
                          as={TextField}
                          label="Occupation"
                          name="occupation"
                          fullWidth
                          size="small"
                          error={touched.occupation && Boolean(errors.occupation)}
                          helperText={touched.occupation && errors.occupation}
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              '&:hover fieldset': {
                                borderColor: 'primary.main',
                              },
                            },
                          }}
                        />
                        <Box
                          border={`1px solid ${palette.neutral.medium}`}
                          borderRadius="5px"
                          p="1.5rem"
                          sx={{
                            mt: 1,
                          }}
                        >
                          <Dropzone
                            acceptedFiles=".jpg,.jpeg,.png"
                            multiple={false}
                            onDrop={(acceptedFiles) =>
                              setFieldValue("picture", acceptedFiles[0])
                            }
                          >
                            {({ getRootProps, getInputProps }) => (
                              <Box
                                {...getRootProps()}
                                border={`2px dashed ${palette.primary.main}`}
                                p="1rem"
                                sx={{ 
                                  "&:hover": { 
                                    cursor: "pointer",
                                    borderColor: palette.primary.light,
                                  },
                                  transition: 'all 0.3s ease',
                                }}
                              >
                                <input {...getInputProps()} />
                                {!values.picture ? (
                                  <Typography 
                                    sx={{ 
                                      textAlign: 'center',
                                      color: palette.neutral.medium,
                                    }}
                                  >
                                    Add Picture Here
                                  </Typography>
                                ) : (
                                  <FlexBetween>
                                    <Typography>{values.picture.name}</Typography>
                                    <EditOutlinedIcon sx={{ color: palette.primary.main }} />
                                  </FlexBetween>
                                )}
                              </Box>
                            )}
                          </Dropzone>
                        </Box>
                      </Box>
                    </Fade>
                  )}

                  <Field
                    as={TextField}
                    label="Email"
                    name="email"
                    type="email"
                    fullWidth
                    size="small"
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                    sx={{
                      mt: 1,
                      '& .MuiOutlinedInput-root': {
                        '&:hover fieldset': {
                          borderColor: 'primary.main',
                        },
                      },
                    }}
                  />
                  <Field
                    as={TextField}
                    label="Password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    fullWidth
                    size="small"
                    error={touched.password && Boolean(errors.password)}
                    helperText={touched.password && errors.password}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                            size="small"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      mt: 1,
                      '& .MuiOutlinedInput-root': {
                        '&:hover fieldset': {
                          borderColor: 'primary.main',
                        },
                      },
                    }}
                  />
                </Box>

                <Box sx={{ mt: '2rem', position: 'sticky', bottom: 0, backgroundColor: 'background.alt', pb: 2 }}>
                  <Button
                    fullWidth
                    type="submit"
                    disabled={isSubmitting}
                    sx={{
                      p: '0.75rem',
                      backgroundColor: 'primary.main',
                      color: 'background.alt',
                      borderRadius: '10px',
                      fontSize: '1rem',
                      fontWeight: 600,
                      textTransform: 'none',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        backgroundColor: 'primary.light',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                      },
                    }}
                  >
                    {isLogin ? 'Sign In' : 'Create Account'}
                  </Button>

                  <Typography
                    onClick={() => {
                      setIsLogin(!isLogin);
                      setFieldValue('isLogin', !isLogin);
                    }}
                    sx={{
                      textAlign: 'center',
                      color: 'primary.main',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      mt: 1,
                      fontSize: '0.9rem',
                      '&:hover': {
                        color: 'primary.light',
                        textDecoration: 'underline',
                      },
                    }}
                  >
                    {isLogin
                      ? "Don't have an account? Sign Up here."
                      : 'Already have an account? Sign In here.'}
                  </Typography>
                </Box>
              </Form>
            )}
          </Formik>
        </Paper>
      </Fade>
    </Container>
  );
};

export default AuthForm;
