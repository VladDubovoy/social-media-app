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
    900: '#1A1D20',
    1000: '#000000',
  },
  primary: {
    50: '#F0F7FF',
    100: '#E0EFFF',
    200: '#C1DFFF',
    300: '#A2CFFF',
    400: '#83BFFF',
    500: '#64AFFF',
    600: '#4F8FCC',
    700: '#3A6F99',
    800: '#254F66',
    900: '#102F33',
  },
  accent: {
    50: '#FFF0F7',
    100: '#FFE0EF',
    200: '#FFC1DF',
    300: '#FFA2CF',
    400: '#FF83BF',
    500: '#FF64AF',
    600: '#CC4F8F',
    700: '#993A6F',
    800: '#66254F',
    900: '#33102F',
  },
  success: {
    50: '#F0FFF4',
    100: '#E0FFE9',
    200: '#C1FFD3',
    300: '#A2FFBD',
    400: '#83FFA7',
    500: '#64FF91',
    600: '#4FCC74',
    700: '#3A9957',
    800: '#25663A',
    900: '#10331D',
  },
};

// Typography settings
const typography = {
  fontFamily: ['Inter', 'Poppins', 'sans-serif'].join(','),
  fontSize: 12,
  h1: {
    fontFamily: ['Poppins', 'Inter', 'sans-serif'].join(','),
    fontSize: 40,
    fontWeight: 600,
    letterSpacing: '-0.02em',
  },
  h2: {
    fontFamily: ['Poppins', 'Inter', 'sans-serif'].join(','),
    fontSize: 32,
    fontWeight: 600,
    letterSpacing: '-0.01em',
  },
  h3: {
    fontFamily: ['Poppins', 'Inter', 'sans-serif'].join(','),
    fontSize: 24,
    fontWeight: 500,
    letterSpacing: '-0.01em',
  },
  h4: {
    fontFamily: ['Poppins', 'Inter', 'sans-serif'].join(','),
    fontSize: 20,
    fontWeight: 500,
  },
  h5: {
    fontFamily: ['Inter', 'Poppins', 'sans-serif'].join(','),
    fontSize: 16,
    fontWeight: 500,
  },
  h6: {
    fontFamily: ['Inter', 'Poppins', 'sans-serif'].join(','),
    fontSize: 14,
    fontWeight: 500,
  },
  body1: {
    fontFamily: ['Inter', 'Poppins', 'sans-serif'].join(','),
    fontSize: 14,
    lineHeight: 1.5,
  },
  body2: {
    fontFamily: ['Inter', 'Poppins', 'sans-serif'].join(','),
    fontSize: 12,
    lineHeight: 1.5,
  },
  button: {
    fontFamily: ['Inter', 'Poppins', 'sans-serif'].join(','),
    fontSize: 14,
    fontWeight: 500,
    textTransform: 'none',
  },
};

// Theme settings
export const themeSettings = (mode) => {
  return {
    palette: {
      mode,
      ...(mode === 'dark'
        ? {
            // Dark mode palette
            primary: {
              dark: colorTokens.primary[300],
              main: colorTokens.primary[500],
              light: colorTokens.primary[700],
            },
            accent: {
              dark: colorTokens.accent[300],
              main: colorTokens.accent[500],
              light: colorTokens.accent[700],
            },
            success: {
              dark: colorTokens.success[300],
              main: colorTokens.success[500],
              light: colorTokens.success[700],
            },
            neutral: {
              dark: colorTokens.grey[100],
              main: colorTokens.grey[200],
              mediumMain: colorTokens.grey[300],
              medium: colorTokens.grey[400],
              light: colorTokens.grey[700],
            },
            background: {
              default: colorTokens.grey[900],
              alt: colorTokens.grey[800],
            },
          }
        : {
            // Light mode palette
            primary: {
              dark: colorTokens.primary[700],
              main: colorTokens.primary[500],
              light: colorTokens.primary[300],
            },
            accent: {
              dark: colorTokens.accent[700],
              main: colorTokens.accent[500],
              light: colorTokens.accent[300],
            },
            success: {
              dark: colorTokens.success[700],
              main: colorTokens.success[500],
              light: colorTokens.success[300],
            },
            neutral: {
              dark: colorTokens.grey[700],
              main: colorTokens.grey[500],
              mediumMain: colorTokens.grey[400],
              medium: colorTokens.grey[300],
              light: colorTokens.grey[50],
            },
            background: {
              default: colorTokens.grey[10],
              alt: colorTokens.grey[0],
            },
          }),
    },
    typography,
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: '8px',
            textTransform: 'none',
            fontWeight: 500,
            fontFamily: ['Inter', 'Poppins', 'sans-serif'].join(','),
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: '12px',
            boxShadow: mode === 'dark' 
              ? '0 4px 6px rgba(0, 0, 0, 0.3)'
              : '0 4px 6px rgba(0, 0, 0, 0.1)',
          },
        },
      },
      MuiTypography: {
        styleOverrides: {
          root: {
            fontFamily: ['Inter', 'Poppins', 'sans-serif'].join(','),
          },
        },
      },
    },
  };
};
