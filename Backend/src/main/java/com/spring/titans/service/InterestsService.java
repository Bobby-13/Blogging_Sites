package com.spring.titans.service;

import com.spring.titans.dto.InterestsDto;
import com.spring.titans.dto.ResponseDto;
import com.spring.titans.entity.Post;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface InterestsService {
    ResponseEntity<ResponseDto> interest(InterestsDto interestsDto);
}
