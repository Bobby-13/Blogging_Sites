package com.spring.titans.controller;

import com.spring.titans.dto.ResponseDto;
import com.spring.titans.entity.Post;
import com.spring.titans.service.TrendingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin
@RestController
@RequestMapping("/trending")
public class TrendingController {

    @Autowired
    private TrendingService service;
    @PostMapping ("/{postType}")
    public ResponseEntity<ResponseDto> trending(@PathVariable String postType){
        return service.trending(postType);
    }

    @PostMapping("/top3")
    public ResponseEntity<ResponseDto> topThree(){
        return service.topThree();
    }
}
