package com.spring.titans.service;

import com.spring.titans.dto.NotificationDto;
import com.spring.titans.dto.ResponseDto;
import org.springframework.http.ResponseEntity;

public interface NotificationService {
    ResponseEntity<ResponseDto> notification(Long userId);

    ResponseEntity<ResponseDto> clearUserNotification(Long notifyId);
}
