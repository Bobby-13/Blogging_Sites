package com.spring.titans.controller;

import com.spring.titans.dto.ResponseDto;
import com.spring.titans.service.TodayService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/today")
public class TodayController {
    @Autowired
    private TodayService service;
    @PostMapping("/{postType}")
    public ResponseEntity<ResponseDto> today(@PathVariable String postType){
        return service.today(postType);
    }
}
