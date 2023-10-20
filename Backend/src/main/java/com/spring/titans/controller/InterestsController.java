package com.spring.titans.controller;

import com.spring.titans.dto.InterestsDto;
import com.spring.titans.dto.ResponseDto;
import com.spring.titans.entity.Post;
import com.spring.titans.service.InterestsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin
@RestController
@RequestMapping("/interest")
public class InterestsController {
    @Autowired
    private InterestsService service;
    @PostMapping()
    public ResponseEntity<ResponseDto> interest(@RequestBody InterestsDto interestsDto){
        return service.interest(interestsDto);
    }
}
