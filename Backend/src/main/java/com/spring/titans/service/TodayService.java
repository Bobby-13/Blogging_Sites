package com.spring.titans.service;

import com.spring.titans.dto.ResponseDto;
import org.springframework.http.ResponseEntity;

public interface TodayService {
    ResponseEntity<ResponseDto> today(String postType);
}
