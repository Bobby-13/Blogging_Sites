package com.spring.titans.service.impl;

import com.spring.titans.dto.NotificationDto;
import com.spring.titans.dto.ResponseDto;
import com.spring.titans.entity.Notification;
import com.spring.titans.entity.UserInfo;
import com.spring.titans.repository.NotificationRepository;
import com.spring.titans.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class NotificationServiceIMPL implements NotificationService {
    @Autowired
    private NotificationRepository repository;



    @Override
    public ResponseEntity<ResponseDto> notification(Long userId) {
        List<Notification> notification = repository.findAll();
        List<Notification> toNotify = new ArrayList<>();
        for(Notification notification1:notification){
            UserInfo userInfo=new UserInfo();
            userInfo.setUserId(userId);
               if(notification1.getUserId().getUserId().equals(userId)&&notification1.getStatus()) {
                   toNotify.add(notification1);
               }
        }
        return ResponseEntity.status(HttpStatus.OK).body(new ResponseDto(HttpStatus.OK, "Notification received",toNotify ));

    }

    @Override
    public ResponseEntity<ResponseDto> clearUserNotification(Long notifyId) {
        repository.deleteById(notifyId);
        return ResponseEntity.status(HttpStatus.OK).body(new ResponseDto(HttpStatus.OK, "Notification cleared",""));
    }
}
