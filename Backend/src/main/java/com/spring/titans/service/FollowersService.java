package com.spring.titans.service;

import com.spring.titans.dto.FollowersPostDto;
import com.spring.titans.dto.ResponseDto;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface FollowersService {
    String follow(Long user1, Long user2);

    String followingCount(Long userId);

    String followers(Long userId);

//    ResponseEntity<ResponseDto> returnFollowing(Long userId);

    ResponseEntity<ResponseDto> returnFollowing(FollowersPostDto followersPostDto);
}
