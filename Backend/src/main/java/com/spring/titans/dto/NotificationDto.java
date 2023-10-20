package com.spring.titans.dto;

import com.spring.titans.entity.UserInfo;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class NotificationDto {
    private Long notifyId;
    private UserInfo userId;
    private Boolean status=false;
    private String content;
    private Date time;
}
