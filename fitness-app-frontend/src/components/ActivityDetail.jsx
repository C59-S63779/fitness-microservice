/** @format */

import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getActivityDetail } from "../services/api";
import {
  Box,
  Card,
  CardContent,
  Divider,
  Typography,
  Grid,
  Container,
  useTheme,
  useMediaQuery,
  Skeleton,
  Paper,
  Avatar,
  IconButton,
  Tooltip,
} from "@mui/material";

const ActivityDetail = () => {
  const { id } = useParams();
  const [activity, setActivity] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const isDarkMode = theme.palette.mode === "dark";

  useEffect(() => {
    const fetchActivityDetail = async () => {
      setIsLoading(true);
      try {
        const response = await getActivityDetail(id);
        setActivity(response.data);
        setError(null);
      } catch (error) {
        console.error("Error fetching activity detail:", error);
        setError("Failed to load activity data. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchActivityDetail();
  }, [id]);

  // Activity type to text mapping
  const getActivityLetter = (type) => {
    switch (type?.toLowerCase()) {
      case "running":
        return "R";
      case "cycling":
        return "C";
      case "swimming":
        return "S";
      case "walking":
        return "W";
      case "yoga":
        return "Y";
      default:
        return "A";
    }
  };

  // Format date nicely
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  if (isLoading) {
    return (
      <Container maxWidth="lg" sx={{ pt: 4, pb: 8 }}>
        <Skeleton variant="rectangular" height={60} sx={{ mb: 2 }} />
        <Skeleton variant="rectangular" height={200} sx={{ mb: 3 }} />
        <Skeleton variant="rectangular" height={400} />
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ pt: 4, pb: 8 }}>
        <Paper
          elevation={3}
          sx={{
            p: 4,
            textAlign: "center",
            bgcolor: isDarkMode ? "#3d2c2c" : "#fff4f4",
          }}
        >
          <Typography variant="h6" color="error" gutterBottom>
            {error}
          </Typography>
          <Typography>Please check your connection and try again.</Typography>
        </Paper>
      </Container>
    );
  }

  if (!activity) {
    return null;
  }

  // Determine background colors based on theme
  const cardBgColor = isDarkMode ? "rgba(255, 255, 255, 0.05)" : "#ffffff";
  const paperBgColor = isDarkMode ? "rgba(255, 255, 255, 0.08)" : "#f8f9fa";
  const improvementsBgColor = isDarkMode
    ? "rgba(25, 118, 210, 0.15)"
    : "#f1f8ff";
  const safetyBgColor = isDarkMode ? "rgba(211, 47, 47, 0.15)" : "#fff4f4";
  const headerBgColor = isDarkMode
    ? theme.palette.primary.dark
    : theme.palette.primary.main;
  const textColor = isDarkMode ? "#ffffff" : "inherit";

  return (
    <Container maxWidth="lg" sx={{ pt: 2, pb: 6 }}>
      {/* Header with back button */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
        <IconButton
          sx={{ mr: 1, color: textColor }}
          onClick={() => window.history.back()}
        >
          ←
        </IconButton>
        <Typography
          variant={isMobile ? "h5" : "h4"}
          component="h1"
          sx={{ flexGrow: 1, fontWeight: 600, color: textColor }}
        >
          Activity Details
        </Typography>
        <Tooltip title="Share">
          <IconButton sx={{ color: textColor }}>📤</IconButton>
        </Tooltip>
      </Box>

      {/* Main activity card */}
      <Card
        elevation={3}
        sx={{
          mb: 4,
          borderRadius: 2,
          overflow: "hidden",
          bgcolor: cardBgColor,
        }}
      >
        <Box
          sx={{
            bgcolor: headerBgColor,
            color: "white",
            p: 2,
            display: "flex",
            alignItems: "center",
            flexDirection: isMobile ? "column" : "row",
          }}
        >
          <Avatar
            sx={{
              bgcolor: "white",
              color: headerBgColor,
              width: 60,
              height: 60,
              mr: isMobile ? 0 : 2,
              mb: isMobile ? 2 : 0,
              fontSize: "1.8rem",
              fontWeight: "bold",
            }}
          >
            {getActivityLetter(activity.type)}
          </Avatar>
          <Box>
            <Typography variant="h5" fontWeight="bold">
              {activity.type || "Unknown Activity"}
            </Typography>
            <Typography variant="body2">
              📅 {formatDate(activity.createdAt)}
            </Typography>
          </Box>
        </Box>

        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={4}>
              <Paper
                elevation={1}
                sx={{
                  p: 2,
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  bgcolor: paperBgColor,
                }}
              >
                <Box
                  sx={{
                    fontSize: 40,
                    mb: 1,
                    color: theme.palette.primary.main,
                  }}
                >
                  ⏱️
                </Box>
                <Typography variant="body2" color="text.secondary">
                  DURATION
                </Typography>
                <Typography variant="h5" fontWeight="bold" color={textColor}>
                  {activity.duration} min
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Paper
                elevation={1}
                sx={{
                  p: 2,
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  bgcolor: paperBgColor,
                }}
              >
                <Box
                  sx={{ fontSize: 40, mb: 1, color: theme.palette.error.main }}
                >
                  🔥
                </Box>
                <Typography variant="body2" color="text.secondary">
                  CALORIES
                </Typography>
                <Typography variant="h5" fontWeight="bold" color={textColor}>
                  {activity.caloriesBurned}
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Paper
                elevation={1}
                sx={{
                  p: 2,
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  bgcolor: paperBgColor,
                }}
              >
                <Box
                  sx={{
                    fontSize: 40,
                    mb: 1,
                    color: theme.palette.success.main,
                  }}
                >
                  📈
                </Box>
                <Typography variant="body2" color="text.secondary">
                  INTENSITY
                </Typography>
                <Typography variant="h5" fontWeight="bold" color={textColor}>
                  {activity.intensity || "Moderate"}
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* AI Recommendation Section */}
      {activity.recommendation && (
        <Card
          elevation={2}
          sx={{ borderRadius: 2, mb: 2, bgcolor: cardBgColor }}
        >
          <CardContent>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Box component="span" sx={{ mr: 1, fontSize: "1.5rem" }}>
                💡
              </Box>
              <Typography
                variant="h5"
                component="h2"
                fontWeight={500}
                color={textColor}
              >
                AI Recommendation
              </Typography>
            </Box>

            <Paper
              elevation={0}
              sx={{ p: 2, bgcolor: paperBgColor, mb: 3, borderRadius: 2 }}
            >
              <Typography
                variant="subtitle1"
                fontWeight={500}
                gutterBottom
                color={textColor}
              >
                Analysis
              </Typography>
              <Typography
                paragraph
                sx={{ whiteSpace: "pre-line", color: textColor }}
              >
                {activity.recommendation}
              </Typography>
            </Paper>

            {activity.improvements &&
              (Array.isArray(activity.improvements)
                ? activity.improvements.length > 0
                : activity.improvements) && (
                <>
                  <Divider
                    sx={{
                      my: 3,
                      borderColor: isDarkMode
                        ? "rgba(255, 255, 255, 0.12)"
                        : "rgba(0, 0, 0, 0.12)",
                    }}
                  />

                  <Box sx={{ mb: 3 }}>
                    <Typography
                      variant="subtitle1"
                      fontWeight={500}
                      gutterBottom
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        color: textColor,
                      }}
                    >
                      <Box component="span" sx={{ mr: 1, fontSize: "1.2rem" }}>
                        📈
                      </Box>
                      Suggested Improvements
                    </Typography>

                    <Grid container spacing={2} sx={{ mt: 1 }}>
                      {Array.isArray(activity.improvements) ? (
                        activity.improvements.map((improvement, index) => (
                          <Grid item xs={12} key={`improvement-${index}`}>
                            <Paper
                              elevation={0}
                              sx={{
                                p: 2,
                                bgcolor: improvementsBgColor,
                                borderRadius: 2,
                              }}
                            >
                              <Typography color={textColor}>
                                • {improvement}
                              </Typography>
                            </Paper>
                          </Grid>
                        ))
                      ) : (
                        <Grid item xs={12} key="improvement-single">
                          <Paper
                            elevation={0}
                            sx={{
                              p: 2,
                              bgcolor: improvementsBgColor,
                              borderRadius: 2,
                            }}
                          >
                            <Typography color={textColor}>
                              • {activity.improvements}
                            </Typography>
                          </Paper>
                        </Grid>
                      )}
                    </Grid>
                  </Box>
                </>
              )}

            {activity.suggestions && activity.suggestions.length > 0 && (
              <>
                <Divider
                  sx={{
                    my: 3,
                    borderColor: isDarkMode
                      ? "rgba(255, 255, 255, 0.12)"
                      : "rgba(0, 0, 0, 0.12)",
                  }}
                />

                <Box sx={{ mb: 3 }}>
                  <Typography
                    variant="subtitle1"
                    fontWeight={500}
                    gutterBottom
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      color: textColor,
                    }}
                  >
                    <Box component="span" sx={{ mr: 1, fontSize: "1.2rem" }}>
                      💡
                    </Box>
                    Personalized Suggestions
                  </Typography>

                  <Grid container spacing={2} sx={{ mt: 1 }}>
                    {activity.suggestions.map((suggestion, index) => (
                      <Grid
                        item
                        xs={12}
                        sm={6}
                        md={4}
                        key={`suggestion-${index}`}
                      >
                        <Card
                          elevation={1}
                          sx={{ height: "100%", bgcolor: paperBgColor }}
                        >
                          <CardContent>
                            <Typography variant="body1" color={textColor}>
                              {suggestion}
                            </Typography>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              </>
            )}

            {activity.safety && activity.safety.length > 0 && (
              <>
                <Divider
                  sx={{
                    my: 3,
                    borderColor: isDarkMode
                      ? "rgba(255, 255, 255, 0.12)"
                      : "rgba(0, 0, 0, 0.12)",
                  }}
                />

                <Box>
                  <Typography
                    variant="subtitle1"
                    fontWeight={500}
                    gutterBottom
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      color: textColor,
                    }}
                  >
                    <Box component="span" sx={{ mr: 1, fontSize: "1.2rem" }}>
                      🛡️
                    </Box>
                    Safety Guidelines
                  </Typography>

                  <Paper
                    elevation={0}
                    sx={{ p: 2, bgcolor: safetyBgColor, borderRadius: 2 }}
                  >
                    {activity.safety.map((item, index) => (
                      <Typography
                        key={`safety-${index}`}
                        paragraph
                        sx={{
                          display: "flex",
                          alignItems: "flex-start",
                          color: textColor,
                        }}
                      >
                        <Box component="span" sx={{ mr: 1, mt: 0.5 }}>
                          •
                        </Box>
                        <Box component="span">{item}</Box>
                      </Typography>
                    ))}
                  </Paper>
                </Box>
              </>
            )}
          </CardContent>
        </Card>
      )}
    </Container>
  );
};

export default ActivityDetail;
