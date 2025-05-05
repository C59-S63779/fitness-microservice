/** @format */
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Paper,
  Typography,
  Container,
  Grid,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import { addActivity } from "../services/api";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import DirectionsWalkIcon from "@mui/icons-material/DirectionsWalk";
import DirectionsBikeIcon from "@mui/icons-material/DirectionsBike";
import PoolIcon from "@mui/icons-material/Pool";
import AddIcon from "@mui/icons-material/Add";

const ActivityForm = ({ onActivityAdded }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [activity, setActivity] = useState({
    type: "RUNNING",
    duration: "",
    caloriesBurned: "",
    additionalMetrics: {},
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const activityIcons = {
    RUNNING: <DirectionsRunIcon />,
    WALKING: <DirectionsWalkIcon />,
    CYCLING: <DirectionsBikeIcon />,
    SWIMMING: <PoolIcon />,
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      await addActivity(activity);
      if (typeof onActivityAdded === "function") {
        onActivityAdded();
      }
      setActivity({
        type: "RUNNING",
        duration: "",
        caloriesBurned: "",
        additionalMetrics: {},
      });
    } catch (error) {
      console.error("Error adding activity:", error);
      setError("Failed to add activity. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ my: 4 }}>
      <Paper
        elevation={3}
        sx={{
          p: { xs: 2, sm: 4 },
          borderRadius: 2,
          bgcolor: "background.paper",
          transition: "transform 0.3s",
          "&:hover": {
            transform: "translateY(-4px)",
          },
        }}
      >
        <Typography
          variant="h5"
          component="h2"
          gutterBottom
          sx={{
            mb: 3,
            color: "primary.main",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Add New Activity
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3} justifyContent="center">
            <Grid item xs={12} md={10}>
              <FormControl fullWidth variant="outlined">
                <InputLabel id="activity-type-label">Activity Type</InputLabel>
                <Select
                  labelId="activity-type-label"
                  id="activity-type"
                  value={activity.type}
                  onChange={(e) =>
                    setActivity({ ...activity, type: e.target.value })
                  }
                  label="Activity Type"
                  startAdornment={activityIcons[activity.type]}
                  sx={{
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "primary.light",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "primary.main",
                    },
                  }}
                >
                  <MenuItem value="RUNNING">
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <DirectionsRunIcon sx={{ mr: 1 }} />
                      Running
                    </Box>
                  </MenuItem>
                  <MenuItem value="WALKING">
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <DirectionsWalkIcon sx={{ mr: 1 }} />
                      Walking
                    </Box>
                  </MenuItem>
                  <MenuItem value="CYCLING">
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <DirectionsBikeIcon sx={{ mr: 1 }} />
                      Cycling
                    </Box>
                  </MenuItem>
                  <MenuItem value="SWIMMING">
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <PoolIcon sx={{ mr: 1 }} />
                      Swimming
                    </Box>
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} container spacing={3} justifyContent="center">
              <Grid item xs={12} sm={5}>
                <TextField
                  fullWidth
                  label="Duration (minutes)"
                  variant="outlined"
                  type="number"
                  value={activity.duration}
                  onChange={(e) =>
                    setActivity({ ...activity, duration: e.target.value })
                  }
                  InputProps={{ inputProps: { min: 0 } }}
                  required
                  sx={{
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "primary.light",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "primary.main",
                    },
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={5}>
                <TextField
                  fullWidth
                  label="Calories Burned"
                  variant="outlined"
                  type="number"
                  value={activity.caloriesBurned}
                  onChange={(e) =>
                    setActivity({ ...activity, caloriesBurned: e.target.value })
                  }
                  InputProps={{ inputProps: { min: 0 } }}
                  required
                  sx={{
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "primary.light",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "primary.main",
                    },
                  }}
                />
              </Grid>
            </Grid>

            <Grid item xs={12} container justifyContent="center" sx={{ mt: 2 }}>
              <Grid item xs={12} sm={6} md={4} sx={{ textAlign: "center" }}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                  disabled={loading}
                  fullWidth
                  startIcon={<AddIcon />}
                  sx={{
                    py: 1.5,
                    borderRadius: 2,
                    textTransform: "none",
                    fontWeight: "bold",
                    boxShadow: 4,
                    "&:hover": {
                      transform: "scale(1.02)",
                      boxShadow: 6,
                    },
                    transition: "all 0.2s",
                  }}
                >
                  {loading ? "Adding..." : "Add Activity"}
                </Button>
              </Grid>
            </Grid>

            {error && (
              <Grid item xs={12} sx={{ textAlign: "center" }}>
                <Typography color="error" variant="body2">
                  {error}
                </Typography>
              </Grid>
            )}
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

ActivityForm.defaultProps = {
  onActivityAdded: () => {},
};

export default ActivityForm;
