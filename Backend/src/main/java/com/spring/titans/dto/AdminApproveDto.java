package com.spring.titans.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AdminApproveDto {
    private Long adminId;
    private Long postId;
    private Long userId;
    private Boolean approve;
}
