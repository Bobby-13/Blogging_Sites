package com.spring.titans.entity;


import jakarta.persistence.*;
import lombok.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.bind.DefaultValue;

@Entity
@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PostLikes {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long postLikesId;
    @ManyToOne(targetEntity = Post.class)
    @JoinColumn(name = "postId")
    private Post postId;
    @ManyToOne(targetEntity = UserInfo.class)
    @JoinColumn(name = "userId")
    private UserInfo userId;
    private Boolean isLiked=false;
    private Boolean isDisLiked=false;

}
