package com.spring.titans.repository;

import com.spring.titans.entity.UserInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserBioRepository extends JpaRepository<UserInfo,Long> {
}
