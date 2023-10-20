package com.spring.titans.controller;

import com.spring.titans.dto.ViewDto;
import com.spring.titans.entity.View;
import com.spring.titans.service.PostService;
import com.spring.titans.service.ViewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
@CrossOrigin
@RestController
@RequestMapping("/view")
public class ViewController {

    @Autowired
    private ViewService service;
    @PostMapping("/addView")
    public String view(@RequestBody ViewDto viewDto){
        return service.view(viewDto);
    }
}
