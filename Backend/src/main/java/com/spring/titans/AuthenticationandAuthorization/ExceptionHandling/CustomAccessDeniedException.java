package com.spring.titans.AuthenticationandAuthorization.ExceptionHandling;

import java.nio.file.AccessDeniedException;

public class CustomAccessDeniedException extends AccessDeniedException {

    public CustomAccessDeniedException(String message) {
        super(message);
    }
}