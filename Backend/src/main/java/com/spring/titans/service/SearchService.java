package com.spring.titans.service;

import com.spring.titans.dto.ResponseDto;
import org.springframework.http.ResponseEntity;

public interface SearchService {
    ResponseEntity<ResponseDto> search(String searchWord);
}
