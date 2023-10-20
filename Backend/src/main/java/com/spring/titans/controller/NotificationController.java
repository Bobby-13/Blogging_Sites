package com.spring.titans.controller;

import com.spring.titans.dto.ResponseDto;
import com.spring.titans.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/notify")
public class NotificationController {
    @Autowired
    private NotificationService service;
    @GetMapping()
    public ResponseEntity<ResponseDto> notification(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        long userId = UserInfoController.GetUser_id(authentication);
        return service.notification(userId);
    }
    @PostMapping("/clear/{notifyId}")
    public ResponseEntity<ResponseDto> clearUserNotification(@PathVariable Long notifyId){
        return service.clearUserNotification(notifyId);
    }
}
