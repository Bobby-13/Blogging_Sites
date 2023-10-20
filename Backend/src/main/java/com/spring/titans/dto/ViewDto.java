package com.spring.titans.dto;

import com.spring.titans.entity.Post;
import com.spring.titans.entity.UserInfo;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ViewDto {
    private Long postId;
}
