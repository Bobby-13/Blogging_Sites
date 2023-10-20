package com.spring.titans.service.impl;

import com.spring.titans.dto.AdminApproveDto;
import com.spring.titans.dto.ResponseDto;
import com.spring.titans.entity.*;
import com.spring.titans.repository.*;
import com.spring.titans.service.AdminService;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;

@Service
public class AdminServiceIMPL implements AdminService {

    @Autowired
    private UserInfoRepository userInfoRepository;
    @Autowired
    private AdminRepository adminRepository;
    @Autowired
    private PostRepository postRepository;
    @Autowired
    private FollowersRepository followersRepository;
    @Autowired
    private NotificationRepository notificationRepository;

    @Autowired
    private EmailService emailService;
    @Override
    public ResponseEntity<ResponseDto> adminInbox() {
        List<Admin>allInbox=adminRepository.findAll(Sort.by(Sort.Direction.DESC,"inboxTime"));
        return ResponseEntity.status(HttpStatus.OK).body(new ResponseDto(HttpStatus.OK,"new notification inbox",allInbox));
    }

    @Override
    public ResponseEntity<ResponseDto> adminApprovePost(AdminApproveDto adminApproveDto) {
            if(adminApproveDto.getPostId()!=null) {
                if (adminApproveDto.getApprove()) {
                    Post post = postRepository.findById(adminApproveDto.getPostId()).get();
                    post.setPostStatus(true);
                    postRepository.save(post);
                    Admin admin = adminRepository.findById(adminApproveDto.getAdminId()).get();

                    List<Followers> followers1 = followersRepository.findAll();
                    for (Followers followers2 : followers1) {
                        UserInfo userInfo = new UserInfo();
                        userInfo.setUserId(adminApproveDto.getUserId());
                        UserInfo userInfo1 = new UserInfo();
                        userInfo1.setUserId(followers2.getUser2().getUserId());
                        if (userInfo.equals(userInfo1)) {
                            Notification notification = new Notification();
                            UserInfo userInfo2 = new UserInfo();
                            userInfo2.setUserId(adminApproveDto.getUserId());
                            notification.setUserId(followers2.getUser1());
                            notification.setStatus(true);
                            notification.setContent(userInfo2.getUserId() + "Hey there! Just wanted to drop a quick hello and catch up. Exciting News! I've just published a new blog post on \" "+post.getPostTitle()+"\".Dive into it for some \""+post.getContent()+"\". Your thoughts and comments are always welcome! #Blogging #NewPost");
                            notification.setTime(post.getPostedAt());
                            emailService.EmailSender(userInfo.getEmail(), "Tech Talk for Tomorrow ,Living Life, One Blog at a Time", notification.getContent());

                            notificationRepository.save(notification);
                        }
                    }
                    adminRepository.deleteById(adminApproveDto.getAdminId());

                    return ResponseEntity.status(HttpStatus.OK).body(new ResponseDto(HttpStatus.OK, "Post approved", admin));

                } else {


                    Admin admin = adminRepository.findById(adminApproveDto.getAdminId()).get();
                    adminRepository.deleteById(adminApproveDto.getAdminId());
                    Post post1 = postRepository.findById(adminApproveDto.getPostId()).get();
                    postRepository.deleteById(adminApproveDto.getPostId());
                    return ResponseEntity.status(HttpStatus.OK).body(new ResponseDto(HttpStatus.OK, "Post rejected", admin));

                }
            }else{
                if(adminApproveDto.getApprove()) {
                    UserInfo userInfo = userInfoRepository.findById(adminApproveDto.getUserId()).get();
                    userInfo.setUserType("author");
                    userInfoRepository.save(userInfo);
                    adminRepository.deleteById(adminApproveDto.getAdminId());
                    return ResponseEntity.status(HttpStatus.OK).body(new ResponseDto(HttpStatus.OK, "Author updated", userInfo));
                }else{
                    adminRepository.deleteById(adminApproveDto.getAdminId());
                    return ResponseEntity.status(HttpStatus.OK).body(new ResponseDto(HttpStatus.OK, "Author Not updated", ""));

                }
            }


    }


}