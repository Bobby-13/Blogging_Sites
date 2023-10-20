package com.spring.titans.repository;

import com.spring.titans.entity.Notification;
import com.spring.titans.entity.UserInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotificationRepository extends JpaRepository<Notification,Long> {
    List<Notification> findAllByUserId(UserInfo userInfo);
}
