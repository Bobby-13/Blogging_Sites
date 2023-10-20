package com.spring.titans.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PasswordReset {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String otp;
    private Instant expiryTime;

    @ManyToOne(targetEntity = UserInfo.class)
    @JoinColumn(name="user_id")
    private UserInfo userInfo;
}
