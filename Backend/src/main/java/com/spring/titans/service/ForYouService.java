package com.spring.titans.service;


import com.spring.titans.dto.ResponseDto;
import com.spring.titans.dto.forYouDto;
import com.spring.titans.entity.Post;
import org.springframework.http.ResponseEntity;


import java.util.List;

public interface ForYouService {

//    ResponseEntity<ResponseDto> forYou(Long userId);
    ResponseEntity<ResponseDto> forYou(forYouDto forYouDto);
}
