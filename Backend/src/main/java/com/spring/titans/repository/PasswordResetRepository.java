package com.spring.titans.repository;

import com.spring.titans.entity.PasswordReset;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PasswordResetRepository extends JpaRepository<PasswordReset,Integer> {
    Optional<PasswordReset> findByOtp(String otp);
}
