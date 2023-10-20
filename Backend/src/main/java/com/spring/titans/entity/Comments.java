package com.spring.titans.entity;

import jakarta.persistence.*;
import lombok.*;


import java.util.Date;


@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Comments {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String content;
    @ManyToOne(targetEntity = Post.class)
    @JoinColumn(name = "postId")
    private Post postId;
    @ManyToOne(targetEntity = UserInfo.class)
    @JoinColumn(name = "userId")
    private UserInfo userId;

    private Long commentLikes=0L;
    private Long commentDisLikes=0L;
    private Date commentedAt;

    @PrePersist
    public void onSave(){
        this.commentedAt=new Date(System.currentTimeMillis());
    }

}
