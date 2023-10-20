package com.spring.titans.controller;

import com.spring.titans.dto.CommentDto;

import com.spring.titans.dto.ResponseDto;
import com.spring.titans.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;
@CrossOrigin
@RestController
@RequestMapping("/comment")
public class CommentController {
    @Autowired
    private CommentService service;
    @PostMapping
    public ResponseEntity<ResponseDto> comment(@RequestBody CommentDto commentDto){
        return service.comment(commentDto);
    }
    @PostMapping("/likes/{commentId}/{likesMaintain}")
    public String likescount(@PathVariable Long commentId,@PathVariable Boolean likesMaintain){
        return service.likescount(commentId,likesMaintain);
    }
}
