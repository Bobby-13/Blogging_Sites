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
public class Notification {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long notifyId;
    @ManyToOne(targetEntity = UserInfo.class)
    @JoinColumn(name = "userId")
    private UserInfo userId;
    private Boolean status=false;
    private String content;
    private Date time;
}
