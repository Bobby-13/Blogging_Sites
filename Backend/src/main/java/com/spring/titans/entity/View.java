package com.spring.titans.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class View {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long viewId;
    @ManyToOne(targetEntity = UserInfo.class)
    @JoinColumn(name = "userId")
    private UserInfo userId;
    @ManyToOne(targetEntity = Post.class)
    @JoinColumn(name = "postId")
    private Post postId;
}
