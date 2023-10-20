package com.spring.titans.AuthenticationandAuthorization.ExceptionHandling;

import org.springframework.security.core.context.SecurityContextHolder;

public class RoleAuthorization {

     public static boolean userHasAdminRole() {
        return SecurityContextHolder.getContext().getAuthentication().getAuthorities()
                .stream()
                .anyMatch(grantedAuthority -> grantedAuthority.getAuthority().equals("ADMIN"));
    }

    public static boolean userHasUserRole() {
        return SecurityContextHolder.getContext().getAuthentication().getAuthorities()
                .stream()
                .anyMatch(grantedAuthority -> grantedAuthority.getAuthority().equals("USER"));
    }
}
