package com.spring.titans.dto;

import lombok.*;

import java.util.Date;
import java.util.List;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PostDto {
    private String content;
    private String postTitle;
    private List<String> tags;
    private List<String> category;
    private String postType;
    private String description;
    private String mediaContent;

}
