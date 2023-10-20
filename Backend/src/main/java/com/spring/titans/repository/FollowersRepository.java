package com.spring.titans.repository;

import com.spring.titans.entity.Followers;
import com.spring.titans.entity.UserInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FollowersRepository extends JpaRepository<Followers,Long> {
    void deleteByUser1OrUser2(UserInfo user1, UserInfo user2);
}
