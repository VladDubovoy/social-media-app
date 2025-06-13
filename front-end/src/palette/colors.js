import { createTheme } from '@mui/material/styles';

// Color design tokens
export const colorTokens = {
  grey: {
    0: '#FFFFFF',
    10: '#F8F9FA',
    50: '#F1F3F5',
    100: '#E9ECEF',
    200: '#DEE2E6',
    300: '#CED4DA',
    400: '#ADB5BD',
    500: '#6C757D',
    600: '#495057',
    700: '#343A40',
    800: '#212529',
    900: '#121417',
    1000: '#000000',
  },
  primary: {
    50: '#FFF0F0',
    100: '#FFE3E3',
    200: '#FFC7C7',
    300: '#FFABAB',
    400: '#FF8F8F',
    500: '#FF7373',
    600: '#CC5C5C',
    700: '#994545',
    800: '#662E2E',
    900: '#331717',
  },
  secondary: {
    50: '#F0FFF0',
    100: '#E3FFE3',
    200: '#C7FFC7',
    300: '#ABFFAB',
    400: '#8FFF8F',
    500: '#73FF73',
    600: '#5CCC5C',
    700: '#459945',
    800: '#2E662E',
    900: '#173317',
  },
  accent: {
    50: '#F0F0FF',
    100: '#E3E3FF',
    200: '#C7C7FF',
    300: '#ABABFF',
    400: '#8F8FFF',
    500: '#7373FF',
    600: '#5C5CCC',
    700: '#454599',
    800: '#2E2E66',
    900: '#171733',
  },
};

// Typography settings
const typography = {
  fontFamily: ['Inter', 'Poppins', 'sans-serif'].join(','),
  fontSize: 12,
  h1: {
    fontFamily: ['Inter', 'Poppins', 'sans-serif'].join(','),
    fontSize: 32,
    fontWeight: 600,
    letterSpacing: 0.5,
  },
  h2: {
    fontFamily: ['Inter', 'Poppins', 'sans-serif'].join(','),
    fontSize: 24,
    fontWeight: 600,
    letterSpacing: 0.5,
  },
  h3: {
    fontFamily: ['Inter', 'Poppins', 'sans-serif'].join(','),
    fontSize: 20,
    fontWeight: 500,
    letterSpacing: 0.15,
  },
  h4: {
    fontFamily: ['Inter', 'Poppins', 'sans-serif'].join(','),
    fontSize: 16,
    fontWeight: 500,
    letterSpacing: 0.15,
  },
  h5: {
    fontFamily: ['Inter', 'Poppins', 'sans-serif'].join(','),
    fontSize: 14,
    fontWeight: 500,
    letterSpacing: 0.15,
  },
  h6: {
    fontFamily: ['Inter', 'Poppins', 'sans-serif'].join(','),
    fontSize: 12,
    fontWeight: 500,
    letterSpacing: 0.15,
  },
  body1: {
    fontSize: 14,
    lineHeight: 1.5,
  },
  body2: {
    fontSize: 12,
    lineHeight: 1.5,
  },
  button: {
    textTransform: 'none',
    fontWeight: 500,
  },
};

// Theme settings
export const themeSettings = (mode) => {
  return {
    palette: {
      mode,
      ...(mode === 'dark'
        ? {
            primary: {
              main: colorTokens.primary[500],
              light: colorTokens.primary[400],
            },
            secondary: {
              main: colorTokens.secondary[500],
              light: colorTokens.secondary[400],
            },
            accent: {
              main: colorTokens.accent[500],
              light: colorTokens.accent[400],
            },
            neutral: {
              dark: colorTokens.grey[700],
              main: colorTokens.grey[500],
              light: colorTokens.grey[100],
            },
            background: {
              default: '#000000',
              alt: colorTokens.grey[900],
              paper: colorTokens.grey[900],
            },
            text: {
              primary: '#FFFFFF',
              secondary: colorTokens.grey[100],
              disabled: colorTokens.grey[500],
            },
          }
        : {
            primary: {
              main: colorTokens.primary[500],
              light: colorTokens.primary[400],
            },
            secondary: {
              main: colorTokens.secondary[500],
              light: colorTokens.secondary[400],
            },
            accent: {
              main: colorTokens.accent[500],
              light: colorTokens.accent[400],
            },
            neutral: {
              dark: colorTokens.grey[700],
              main: colorTokens.grey[500],
              light: colorTokens.grey[100],
            },
            background: {
              default: colorTokens.grey[10],
              alt: colorTokens.grey[0],
              paper: colorTokens.grey[0],
            },
            text: {
              primary: colorTokens.grey[900],
              secondary: colorTokens.grey[700],
              disabled: colorTokens.grey[400],
            },
          }),
    },
    typography,
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            textTransform: 'none',
            fontWeight: 500,
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            boxShadow: mode === 'dark' 
              ? '0 4px 6px rgba(0, 0, 0, 0.5)'
              : '0 4px 6px rgba(0, 0, 0, 0.1)',
            backgroundColor: mode === 'dark' ? colorTokens.grey[900] : colorTokens.grey[0],
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundColor: mode === 'dark' ? colorTokens.grey[900] : colorTokens.grey[0],
          },
        },
      },
      MuiTypography: {
        styleOverrides: {
          root: {
            color: mode === 'dark' ? '#FFFFFF' : colorTokens.grey[900],
          },
        },
      },
      MuiInputBase: {
        styleOverrides: {
          root: {
            backgroundColor: mode === 'dark' ? colorTokens.grey[900] : colorTokens.grey[0],
            '& .MuiInputBase-input': {
              color: mode === 'dark' ? '#FFFFFF' : colorTokens.grey[900],
            },
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: mode === 'dark' ? colorTokens.grey[700] : colorTokens.grey[300],
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: mode === 'dark' ? colorTokens.grey[600] : colorTokens.grey[400],
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: mode === 'dark' ? colorTokens.primary[500] : colorTokens.primary[500],
            },
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            backgroundColor: mode === 'dark' ? colorTokens.grey[900] : colorTokens.grey[0],
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiInputLabel-root': {
              color: mode === 'dark' ? colorTokens.grey[200] : colorTokens.grey[700],
            },
            '& .MuiInputLabel-root.Mui-focused': {
              color: mode === 'dark' ? colorTokens.primary[500] : colorTokens.primary[500],
            },
          },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            color: mode === 'dark' ? '#FFFFFF' : colorTokens.grey[900],
            '&:hover': {
              backgroundColor: mode === 'dark' ? colorTokens.grey[800] : colorTokens.grey[100],
            },
          },
        },
      },
      MuiAvatar: {
        styleOverrides: {
          root: {
            backgroundColor: mode === 'dark' ? colorTokens.grey[800] : colorTokens.grey[300],
          },
        },
      },
      MuiDivider: {
        styleOverrides: {
          root: {
            borderColor: mode === 'dark' ? colorTokens.grey[800] : colorTokens.grey[200],
          },
        },
      },
      MuiList: {
        styleOverrides: {
          root: {
            backgroundColor: mode === 'dark' ? colorTokens.grey[900] : colorTokens.grey[0],
          },
        },
      },
      MuiMenuItem: {
        styleOverrides: {
          root: {
            '&:hover': {
              backgroundColor: mode === 'dark' ? colorTokens.grey[800] : colorTokens.grey[100],
            },
          },
        },
      },
      MuiPopover: {
        styleOverrides: {
          paper: {
            backgroundColor: mode === 'dark' ? colorTokens.grey[900] : colorTokens.grey[0],
          },
        },
      },
      MuiDialog: {
        styleOverrides: {
          paper: {
            backgroundColor: mode === 'dark' ? colorTokens.grey[900] : colorTokens.grey[0],
          },
        },
      },
    },
  };
};

const theme = createTheme(themeSettings('light'));

export default theme;
