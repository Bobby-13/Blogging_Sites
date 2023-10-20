package com.spring.titans.service;

import com.spring.titans.dto.ResponseDto;
import org.springframework.http.ResponseEntity;

public interface SavedPostService {
    Boolean isSaved(Long userId, Long postId,Boolean isSave);

    ResponseEntity<ResponseDto> returnSavedPost(Long userId);

}
