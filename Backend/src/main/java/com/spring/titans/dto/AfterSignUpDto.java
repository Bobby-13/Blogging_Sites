package com.spring.titans.dto;

import lombok.*;
import org.apache.catalina.LifecycleState;

import java.util.Date;
import java.util.List;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AfterSignUpDto {
    private Long userId;
    private List<String>interests;
}
