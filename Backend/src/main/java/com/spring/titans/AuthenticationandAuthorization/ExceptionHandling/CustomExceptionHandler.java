package com.spring.titans.AuthenticationandAuthorization.ExceptionHandling;

import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

import java.nio.file.AccessDeniedException;

@ControllerAdvice
public class CustomExceptionHandler {
    @ExceptionHandler(AccessDeniedException.class)
    @ResponseBody
    public String handleAccessDeniedException(AccessDeniedException ex) {
        return "Access denied: " + ex.getMessage();
    }
}
