package com.spring.titans.entity;


import com.spring.titans.dto.Provider;
import com.spring.titans.dto.Role;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor

@Builder
public class UserInfo {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long userId;
    private String userName;
    private String email;
    private String phNo;
    private String password;
    private String dob;
    private String userProfile;
    private String userType;
    private String bioDescription;
    private List<String> interests;

    @Enumerated(EnumType.STRING)
    private Role roles;

    @Enumerated(EnumType.STRING)
    private Provider provider;


    public UserInfo(Long userId) {
        this.userId = userId;
    }

}

