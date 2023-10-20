package com.spring.titans.repository;

import com.spring.titans.entity.Admin;
import com.spring.titans.entity.Post;
import com.spring.titans.entity.UserInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AdminRepository extends JpaRepository<Admin,Long> {
    Admin findByPostId(Post post);

    List<Admin> findAllByUserId(UserInfo userInfo);

    List<Admin> findAllByPostId(Post post);
}
