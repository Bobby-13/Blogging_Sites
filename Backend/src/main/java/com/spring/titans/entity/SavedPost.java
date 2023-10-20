package com.spring.titans.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class SavedPost {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long savedId;
    @ManyToOne(targetEntity = Post.class)
    @JoinColumn(name = "postId")
    private Post postId;
    @ManyToOne(targetEntity = UserInfo.class)
    @JoinColumn(name = "userId")
    private UserInfo userId;
    private Boolean isSave=false;
}
