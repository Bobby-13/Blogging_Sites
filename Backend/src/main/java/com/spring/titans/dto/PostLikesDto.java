package com.spring.titans.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PostLikesDto {
    private Long postId;
    private Boolean isLiked;
    private Boolean isDisLiked;
}
