package com.spring.titans.controller;

import com.spring.titans.dto.AdminApproveDto;
import com.spring.titans.dto.ResponseDto;
import com.spring.titans.service.AdminService;
import com.spring.titans.service.UserInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/admin")
public class AdminController {
    @Autowired
    private AdminService service;

    @Autowired
    private UserInfoService userInfoService;
    @GetMapping
    public ResponseEntity<ResponseDto> adminInbox(){
        return service.adminInbox();
    }

    @GetMapping("/getAllusers")
    public ResponseEntity<ResponseDto> getAllusers(){
        return userInfoService.getAllusers();
    }

    @PostMapping("/adminApprove")
    public ResponseEntity<ResponseDto> adminApprovePost(@RequestBody AdminApproveDto adminApproveDto){
        return service.adminApprovePost(adminApproveDto);
    }


    @DeleteMapping("/deleteUser/{userId}")
    public ResponseEntity<ResponseDto> deleteUser(@PathVariable Long userId){
        return userInfoService.deleteUser(userId);
    }

}
