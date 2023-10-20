package com.spring.titans.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Admin {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long adminId;
    @ManyToOne(targetEntity = UserInfo.class)
    @JoinColumn(name = "userId")
    private UserInfo userId;
    @ManyToOne(targetEntity = Post.class)
    @JoinColumn(name = "postId")
    private Post postId;
    private Date inboxTime;
    @PrePersist
    public void onSave(){
        this.inboxTime=new Date(System.currentTimeMillis());
    }
}
