package com.spring.titans.dto;

import com.spring.titans.entity.Post;
import com.spring.titans.entity.UserInfo;

import lombok.*;
import java.util.Date;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class CommentDto {
    private Long commentId;
    private String content;
    private Long postId;
    private Long userId;
    private Long commentLikes;
    private Long commentDisLikes;
    private Date commentedAt;

}
