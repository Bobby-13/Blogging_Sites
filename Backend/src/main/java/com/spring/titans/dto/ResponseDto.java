package com.spring.titans.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor

public class ResponseDto {
    private HttpStatus status;
    private String message;
    private Object data;
}
