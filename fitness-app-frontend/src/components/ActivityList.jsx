/** @format */
import {
  Card,
  CardContent,
  Grid,
  Typography,
  Container,
  Box,
  Chip,
  CircularProgress,
  Divider,
  Paper,
  Fade,
  Skeleton,
  useTheme,
  IconButton,
  Tooltip,
  alpha,
  Button,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getActivities } from "../services/api";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import DirectionsWalkIcon from "@mui/icons-material/DirectionsWalk";
import DirectionsBikeIcon from "@mui/icons-material/DirectionsBike";
import PoolIcon from "@mui/icons-material/Pool";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import RefreshIcon from "@mui/icons-material/Refresh";

const ActivityList = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();

  const activityIcons = {
    RUNNING: <DirectionsRunIcon fontSize="large" color="primary" />,
    WALKING: <DirectionsWalkIcon fontSize="large" color="primary" />,
    CYCLING: <DirectionsBikeIcon fontSize="large" color="primary" />,
    SWIMMING: <PoolIcon fontSize="large" color="primary" />,
  };

  const activityColors = {
    RUNNING: theme.palette.primary.main,
    WALKING: theme.palette.success.main,
    CYCLING: theme.palette.info.main,
    SWIMMING: theme.palette.secondary.main,
  };

  const fetchActivities = async () => {
    setLoading(true);
    try {
      const response = await getActivities();
      setActivities(response.data);
      setError("");
    } catch (error) {
      console.error("Error fetching activities:", error);
      setError("Failed to load activities. Please try again later.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    fetchActivities();
  };

  // Removed handleAddActivity function as it's no longer needed

  useEffect(() => {
    fetchActivities();
  }, []);

  const formatDuration = (minutes) => {
    if (minutes < 60) {
      return `${minutes} min`;
    }
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  };

  if (loading && !refreshing) {
    return (
      <Container
        maxWidth="lg"
        sx={{
          py: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box sx={{ textAlign: "center", mb: 4, width: "100%" }}>
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: "bold",
              color: "primary.main",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <FitnessCenterIcon sx={{ mr: 1 }} />
            Your Activities
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Track your fitness journey
          </Typography>
        </Box>
        <Grid container spacing={3} justifyContent="center">
          {[1, 2, 3].map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item}>
              <Paper
                elevation={3}
                sx={{
                  height: "100%",
                  borderRadius: 2,
                  overflow: "hidden",
                }}
              >
                <Skeleton variant="rectangular" height={140} />
                <Box sx={{ p: 2 }}>
                  <Skeleton variant="text" height={32} width="60%" />
                  <Skeleton variant="text" height={24} width="40%" />
                  <Skeleton variant="text" height={24} width="70%" />
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Paper
          elevation={3}
          sx={{
            p: 4,
            borderRadius: 2,
            textAlign: "center",
            bgcolor: alpha(theme.palette.error.main, 0.1),
          }}
        >
          <Typography color="error" variant="h6">
            {error}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={fetchActivities}
            sx={{ mt: 2 }}
          >
            Try Again
          </Button>
        </Paper>
      </Container>
    );
  }

  return (
    <Container
      maxWidth="lg"
      sx={{
        py: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* Header Section with Title and Refresh Button */}
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mb: 4,
        }}
      >
        {/* Title (Centered) */}
        <Box sx={{ textAlign: "center", mb: 3 }}>
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: "bold",
              color: "primary.main",
              textShadow: "0 1px 2px rgba(0,0,0,0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <FitnessCenterIcon sx={{ mr: 1 }} />
            Your Activities
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Track your fitness journey with {activities.length} recorded
            activities
          </Typography>
        </Box>

        {/* Refresh Button - Right Aligned */}
        <Box
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: "flex-end",
          }}
        >
          <Tooltip title="Refresh Activities">
            <Button
              variant="outlined"
              color="primary"
              onClick={handleRefresh}
              startIcon={<RefreshIcon />}
              disabled={refreshing}
              sx={{
                borderRadius: 28,
                minWidth: "auto",
              }}
            >
              {refreshing ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Refresh"
              )}
            </Button>
          </Tooltip>
        </Box>
      </Box>

      {/* Activity Cards */}
      {activities.length === 0 ? (
        <Paper
          elevation={3}
          sx={{
            p: 4,
            borderRadius: 2,
            textAlign: "center",
            bgcolor: alpha(theme.palette.background.paper, 0.1),
            width: "100%",
            maxWidth: "600px",
            mx: "auto",
          }}
        >
          <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
            No activities recorded yet
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Start tracking your fitness journey by adding your first activity
          </Typography>
        </Paper>
      ) : (
        <Grid container spacing={3} justifyContent="center">
          {activities.map((activity) => (
            <Grid item xs={12} sm={6} md={4} key={activity.id}>
              <Fade in={true} timeout={500}>
                <Card
                  elevation={4}
                  sx={{
                    height: "100%",
                    borderRadius: 2,
                    cursor: "pointer",
                    position: "relative",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-8px)",
                      boxShadow: theme.shadows[8],
                      "& .arrow-icon": {
                        opacity: 1,
                        transform: "translateX(0)",
                      },
                    },
                    overflow: "hidden",
                    border: `1px solid ${alpha(
                      activityColors[activity.type] ||
                        theme.palette.primary.main,
                      0.3
                    )}`,
                    backgroundColor: "#121212", // Dark background to match image
                  }}
                  onClick={() => navigate(`/activities/${activity.id}`)}
                >
                  <Box
                    sx={{
                      bgcolor: alpha(
                        activityColors[activity.type] ||
                          theme.palette.primary.main,
                        0.15
                      ),
                      p: 2,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      {activityIcons[activity.type] || (
                        <DirectionsRunIcon fontSize="large" color="primary" />
                      )}
                      <Typography
                        variant="h6"
                        component="h3"
                        sx={{
                          ml: 1,
                          fontWeight: "bold",
                          color:
                            activityColors[activity.type] ||
                            theme.palette.primary.main,
                        }}
                      >
                        {activity.type}
                      </Typography>
                    </Box>
                    <Tooltip title="View Details">
                      <IconButton
                        className="arrow-icon"
                        sx={{
                          opacity: 0,
                          transform: "translateX(10px)",
                          transition: "all 0.3s ease",
                          bgcolor: alpha(
                            activityColors[activity.type] ||
                              theme.palette.primary.main,
                            0.2
                          ),
                          "&:hover": {
                            bgcolor: alpha(
                              activityColors[activity.type] ||
                                theme.palette.primary.main,
                              0.3
                            ),
                          },
                        }}
                      >
                        <ArrowForwardIcon />
                      </IconButton>
                    </Tooltip>
                  </Box>

                  <CardContent sx={{ p: 3 }}>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <AccessTimeIcon
                            sx={{
                              color: "text.secondary",
                              mr: 1,
                              fontSize: "1.2rem",
                            }}
                          />
                          <Typography variant="body1">
                            {formatDuration(activity.duration)}
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={6}>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <LocalFireDepartmentIcon
                            sx={{
                              color: theme.palette.error.main,
                              mr: 1,
                              fontSize: "1.2rem",
                            }}
                          />
                          <Typography variant="body1">
                            {activity.caloriesBurned} kcal
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>

                    {activity.additionalMetrics &&
                      Object.keys(activity.additionalMetrics).length > 0 && (
                        <>
                          <Divider sx={{ my: 2 }} />
                          <Box sx={{ mt: 2 }}>
                            <Typography
                              variant="subtitle2"
                              color="text.secondary"
                              gutterBottom
                            >
                              Additional Metrics
                            </Typography>
                            <Box
                              sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}
                            >
                              {Object.entries(activity.additionalMetrics).map(
                                ([key, value]) => (
                                  <Chip
                                    key={key}
                                    label={`${key}: ${value}`}
                                    size="small"
                                    variant="outlined"
                                    sx={{
                                      bgcolor: alpha(
                                        theme.palette.primary.main,
                                        0.1
                                      ),
                                    }}
                                  />
                                )
                              )}
                            </Box>
                          </Box>
                        </>
                      )}
                  </CardContent>
                </Card>
              </Fade>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default ActivityList;
