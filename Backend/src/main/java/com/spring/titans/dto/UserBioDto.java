package com.spring.titans.dto;

import lombok.*;

import java.util.Date;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserBioDto {
    private Long userId;
    private String dob;
    private String userProfile;
    private String bioDescription;
}
