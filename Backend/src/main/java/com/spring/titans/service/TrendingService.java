package com.spring.titans.service;

import com.spring.titans.dto.ResponseDto;
import com.spring.titans.entity.Post;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface TrendingService {
    ResponseEntity<ResponseDto> trending(String postType);

    ResponseEntity<ResponseDto> topThree();
}
