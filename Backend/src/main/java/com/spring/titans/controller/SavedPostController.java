package com.spring.titans.controller;

import com.spring.titans.dto.ResponseDto;
import com.spring.titans.entity.UserInfo;
import com.spring.titans.repository.UserInfoRepository;
import com.spring.titans.service.SavedPostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping("/isSaved")
public class SavedPostController {

    @Autowired
    private SavedPostService service;

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
    @PostMapping ("/{postId}/{isSave}")
    public Boolean isSaved(@PathVariable Long postId,@PathVariable Boolean isSave){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        long userId = GetUser_id(authentication);
        return service.isSaved(userId,postId,isSave);
    }

    @GetMapping("/post")
    public ResponseEntity<ResponseDto> returnSavedPosts(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        long userId = GetUser_id(authentication);
        return service.returnSavedPost(userId);
    }


}
