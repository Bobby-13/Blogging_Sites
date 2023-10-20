package com.spring.titans.service;

import com.spring.titans.dto.PostDto;

import com.spring.titans.dto.PostLikesDto;
import com.spring.titans.dto.ResponseDto;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;

public interface PostService {

    ResponseEntity<ResponseDto> post(PostDto postDto);


    String postLikesCount(Long postId, Boolean postLikesMaintain);
//    ResponseEntity<ResponseDto> newLikes(PostLikesDto postLikesDto);

    ResponseEntity<ResponseDto> editPost(PostDto postDto,Long postId);

    ResponseEntity<ResponseDto> deletePost(Long postId);

    ResponseEntity<ResponseDto> newLikes(PostLikesDto postLikesDto);
}
