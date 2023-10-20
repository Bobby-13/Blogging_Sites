package com.spring.titans.entity;

import jakarta.persistence.*;
import lombok.*;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Entity
@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long postId;
    @ManyToOne(targetEntity = UserInfo.class)
    @JoinColumn(name = "userId")
    private UserInfo userId;
    private String content;
    private Date postedAt;
    private String postTitle;
    private List<String> tags;
    private List<String> category;
    private String postType;
    private Long viewCounts=0L;
    private Long postLikesCount=0L;
    private Long postDisLikesCount=0L;
    private  Boolean postStatus=false;
    private String description;
    private String mediaContent;


    public Post(Long postId) {
        this.postId = postId;
    }

    @PrePersist
    public void onSave(){
        this.postedAt = new Timestamp(System.currentTimeMillis());
    }




}

