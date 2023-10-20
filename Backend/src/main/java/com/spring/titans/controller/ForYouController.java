package com.spring.titans.controller;


import com.spring.titans.dto.ResponseDto;
import com.spring.titans.dto.forYouDto;
import com.spring.titans.entity.Post;
import com.spring.titans.service.ForYouService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin
@RestController
@RequestMapping("/forYou")
public class ForYouController {
    @Autowired
    private ForYouService service;

    @PostMapping()
    public ResponseEntity<ResponseDto> forYou(@RequestBody forYouDto forYouDto){
        return service.forYou(forYouDto);
    }

}
