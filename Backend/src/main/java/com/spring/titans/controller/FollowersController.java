package com.spring.titans.controller;


import com.spring.titans.dto.FollowersPostDto;
import com.spring.titans.dto.ResponseDto;
import com.spring.titans.entity.UserInfo;
import com.spring.titans.repository.UserInfoRepository;
import com.spring.titans.service.FollowersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping("/follow")
public class FollowersController {
    @Autowired
    private FollowersService service;
    @Autowired
    private UserInfoRepository repository;
    public  long GetUser_id(Authentication authentication){
        if (authentication != null && authentication.getPrincipal() instanceof UserDetails) {
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            String username = userDetails.getUsername();
            System.out.println(username);
            Optional<UserInfo> user = repository.findByEmail(username);
            if(user.isEmpty()){
                System.out.println("dhfkus");
            }
            System.out.println("Name :" + username);
            return user.get().getUserId();
        }
        return 0;
    }
    @PostMapping("/{user1}")
    public String follow(@PathVariable Long user1){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        long userId = GetUser_id(authentication);

        return service.follow(userId,user1);
    }

    @PostMapping("/followingCount")
    public String followingCount(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        long userId =GetUser_id(authentication);
        return service.followingCount(userId);
    }
    @PostMapping("/followersCount")
    public String followers(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        long userId = GetUser_id(authentication);
        return service.followers(userId);
    }

    @PostMapping("/following")
    public ResponseEntity<ResponseDto> returnFollowing(@RequestBody FollowersPostDto followersPostDto){
        return service.returnFollowing(followersPostDto);
    }

}
