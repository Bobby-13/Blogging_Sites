package com.spring.titans.controller;

import com.spring.titans.dto.ResponseDto;
import com.spring.titans.service.SearchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/search")
public class SearchController {
    @Autowired
    private SearchService service;

    @PostMapping("/{searchWord}")
    public ResponseEntity<ResponseDto> search(@PathVariable String searchWord){
        return service.search(searchWord);
    }
}
