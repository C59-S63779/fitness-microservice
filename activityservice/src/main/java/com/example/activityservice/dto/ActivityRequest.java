package com.example.activityservice.dto;

import com.example.activityservice.model.ActivityType;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.Map;

@Data
public class ActivityRequest {
    private String userId;
    private ActivityType type;
    private Integer duration;
    private Integer caloriesBurned;
    private LocalDateTime startTime;
    private Map<String, Object> additionalMetrics;

}

//{
//        "userId": 1,
//        "type": "RUNNING",
//        "duration": 30,
//        "caloriesBurned": 300,
//        "startTime": "2025-02-12T10:00:00",
//        "additionalMetrics": {
//        "distance": 5.2,
//        "averageSpeed": 10.4,
//        "maxHeartRate": 165
//        }
//        }
