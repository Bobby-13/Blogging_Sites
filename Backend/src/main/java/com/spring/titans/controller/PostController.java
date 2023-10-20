package com.spring.titans.controller;

import com.spring.titans.dto.PostDto;

import com.spring.titans.dto.PostLikesDto;
import com.spring.titans.dto.ResponseDto;
import com.spring.titans.repository.PostRepository;
import com.spring.titans.service.PostService;
import com.spring.titans.service.impl.PostServiceIMPL;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
@CrossOrigin
@RestController
@RequestMapping("/post")
public class PostController {

    @Autowired
    private PostService service;
    @PostMapping
    public ResponseEntity<ResponseDto> post(@RequestBody PostDto postDto){
        return service.post(postDto);
    }

    @PostMapping("/newLikes")
    public ResponseEntity<ResponseDto> newLikes(@RequestBody PostLikesDto postLikesDto){
        System.out.println("postId "+postLikesDto.getPostId()+" "+postLikesDto.getIsLiked());
        return service.newLikes(postLikesDto);
    }

    @PostMapping("/editPost/{postId}")
    public ResponseEntity<ResponseDto> editPost(@RequestBody PostDto postDto,@PathVariable Long postId){
        return service.editPost(postDto,postId);
    }
    @DeleteMapping("/deletePost/{postId}")
    private ResponseEntity<ResponseDto> deletePost(@PathVariable Long postId){
        return service.deletePost(postId);
    }



}
