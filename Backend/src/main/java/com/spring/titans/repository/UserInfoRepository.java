package com.spring.titans.repository;

import com.spring.titans.entity.UserInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.rmi.server.UID;

import java.util.List;
import java.util.Optional;

import java.util.UUID;

@Repository
public interface UserInfoRepository extends JpaRepository<UserInfo, Long>{
    Optional<UserInfo> findByEmail(String username);
}
