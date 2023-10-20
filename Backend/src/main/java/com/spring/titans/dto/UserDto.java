package com.spring.titans.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {
    private String userName;
    private String phNo;
    private String userProfile;
    private String bioDescription;
    private String dob;
    private List<String> interests;
}
