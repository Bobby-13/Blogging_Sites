package com.spring.titans.dto;

import com.spring.titans.entity.Post;
import com.spring.titans.entity.UserInfo;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.*;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SavedPostDto {
    private Long savedId;
    private Long postId;
    private Long userId;
    private Boolean isSave=false;
}
