package com.spring.titans.service;

import com.spring.titans.dto.CommentDto;

import com.spring.titans.dto.ResponseDto;
import org.springframework.http.ResponseEntity;

public interface CommentService {
    ResponseEntity<ResponseDto> comment(CommentDto commentDto);
    String likescount(Long commentId,Boolean likesMaintain);
}
