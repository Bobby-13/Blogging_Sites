package com.spring.titans.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@Getter
@Setter

@AllArgsConstructor
@NoArgsConstructor
public class Followers {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long followId;
    @ManyToOne(targetEntity = UserInfo.class)
    @JoinColumn(name = "user1")
    private UserInfo user1;
    @ManyToOne(targetEntity = UserInfo.class)
    @JoinColumn(name = "user2")
    private UserInfo user2;

}
