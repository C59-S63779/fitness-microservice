/** @format */

import { useContext, useEffect, useState, useMemo } from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Typography,
  Paper,
  AppBar,
  Toolbar,
  IconButton,
  CssBaseline,
  useMediaQuery,
  Avatar,
  Menu,
  MenuItem,
  createTheme,
  ThemeProvider,
  alpha,
  CircularProgress,
  Fade,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { AuthContext } from "react-oauth2-code-pkce";
import { setCredentials } from "./store/authSlice";

import ActivityForm from "./components/ActivityForm";
import ActivityDetail from "./components/ActivityDetail";
import ActivityList from "./components/ActivityList";

// Icons
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";

// Create a Layout component to maintain consistent structure
const Layout = ({ children, token, logOut, tokenData }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const isSmallScreen = useMediaQuery("(max-width:600px)");

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleProfileMenuClose();
    logOut();
  };

  // Get first letter of username for avatar
  const getUserInitial = () => {
    if (tokenData && tokenData.name) {
      return tokenData.name.charAt(0).toUpperCase();
    }
    return "U";
  };

  const getUserName = () => {
    return tokenData && tokenData.name ? tokenData.name : "User";
  };

  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              display: "flex",
              alignItems: "center",
              fontWeight: "bold",
            }}
          >
            <FitnessCenterIcon sx={{ mr: 1 }} />
            Fitness Tracker
          </Typography>

          {token && (
            <>
              <IconButton
                onClick={handleProfileMenuOpen}
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-haspopup="true"
                color="inherit"
              >
                <Avatar
                  sx={{
                    width: 32,
                    height: 32,
                    bgcolor: "secondary.main",
                    fontSize: "0.9rem",
                  }}
                >
                  {getUserInitial()}
                </Avatar>
              </IconButton>

              <Menu
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleProfileMenuClose}
              >
                <MenuItem onClick={handleProfileMenuClose}>
                  <ListItemIcon>
                    <AccountCircleIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>{getUserName()}</ListItemText>
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  <ListItemIcon>
                    <LogoutIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Logout</ListItemText>
                </MenuItem>
              </Menu>
            </>
          )}
        </Toolbar>
      </AppBar>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          mt: "64px",
          minHeight: "calc(100vh - 64px)",
        }}
      >
        {children}
      </Box>
    </>
  );
};

// Preserved ActivitiesPage component as specified
const ActivitiesPage = () => (
  <Box sx={{ p: 2 }}>
    <ActivityForm onActivitiesAdded={() => window.location.reload()} />
    <ActivityList />
  </Box>
);

// Login Screen Component
const LoginScreen = ({ onLogin }) => {
  return (
    <Container
      maxWidth="sm"
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Fade in={true} timeout={800}>
        <Paper
          elevation={6}
          sx={{
            p: 4,
            borderRadius: 2,
            textAlign: "center",
            backgroundColor: (theme) =>
              alpha(theme.palette.background.paper, 0.9),
            backdropFilter: "blur(10px)",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 3,
            }}
          >
            <FitnessCenterIcon color="primary" sx={{ fontSize: 60 }} />

            <Typography
              variant="h4"
              component="h1"
              gutterBottom
              sx={{ fontWeight: "bold" }}
            >
              Fitness Tracker
            </Typography>

            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              Track your workouts, monitor progress, and achieve your fitness
              goals
            </Typography>

            <Button
              variant="contained"
              size="large"
              onClick={() => onLogin()}
              startIcon={<AccountCircleIcon />}
              sx={{
                py: 1.5,
                px: 4,
                borderRadius: 2,
                textTransform: "none",
                fontSize: "1rem",
                fontWeight: "medium",
                boxShadow: 4,
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: 6,
                },
                transition: "all 0.2s",
              }}
            >
              Sign In
            </Button>
          </Box>
        </Paper>
      </Fade>
    </Container>
  );
};

function App() {
  // Preserved core functionality as specified
  const { token, tokenData, logIn, logOut } = useContext(AuthContext);
  const dispatch = useDispatch();
  const [authReady, setAuthReady] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      dispatch(setCredentials({ token, user: tokenData }));
      setAuthReady(true);
    }

    // Simulate loading to prevent UI flash
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [token, tokenData, dispatch]);

  // Theme configuration
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: "dark",
          primary: {
            main: "#8ab4f8",
            light: "#aecbfa",
            dark: "#669df6",
            contrastText: "#000000",
          },
          secondary: {
            main: "#bb86fc",
            light: "#c7a4ff",
            dark: "#9a67ea",
          },
          error: {
            main: "#f28b82",
          },
          success: {
            main: "#81c995",
          },
          info: {
            main: "#8cb2ff",
          },
          background: {
            default: "#121212",
            paper: "#1e1e1e",
          },
          text: {
            primary: "#e8eaed",
            secondary: "#9aa0a6",
          },
        },
        typography: {
          fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
          h1: { fontWeight: 500 },
          h2: { fontWeight: 500 },
          h3: { fontWeight: 500 },
          h4: { fontWeight: 500 },
          h5: { fontWeight: 500 },
          h6: { fontWeight: 500 },
        },
        shape: {
          borderRadius: 8,
        },
        components: {
          MuiButton: {
            styleOverrides: {
              root: {
                textTransform: "none",
                fontWeight: 500,
              },
              contained: {
                boxShadow: "0 1px 2px 0 rgba(0,0,0,0.3)",
              },
            },
          },
          MuiPaper: {
            styleOverrides: {
              root: {
                backgroundImage: "none",
              },
            },
          },
          MuiCard: {
            styleOverrides: {
              root: {
                backgroundImage: "none",
              },
            },
          },
          MuiInputBase: {
            styleOverrides: {
              input: {
                "&::placeholder": {
                  opacity: 0.7,
                },
              },
            },
          },
        },
      }),
    []
  );

  if (loading) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <CircularProgress />
        </Box>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Layout token={token} logOut={logOut} tokenData={tokenData}>
          {!token ? (
            <LoginScreen onLogin={logIn} />
          ) : (
            <Routes>
              <Route path="/activities" element={<ActivitiesPage />} />
              <Route path="/activities/:id" element={<ActivityDetail />} />
              <Route
                path="/"
                element={
                  token ? (
                    <Navigate to="/activities" replace />
                  ) : (
                    <Navigate to="/login" replace />
                  )
                }
              />
            </Routes>
          )}
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
