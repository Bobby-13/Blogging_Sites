package com.spring.titans.repository;

import com.spring.titans.entity.Post;
import com.spring.titans.entity.UserInfo;
import com.spring.titans.entity.View;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ViewRepository extends JpaRepository<View,Long> {
    View findViewByUserId_UserIdAndPostId_PostId(Long userId,Long postId);

    List<View> findAllByPostId(Post post);

    List<View> findAllByUserId(UserInfo userInfo);


    void deleteAllByUserId(UserInfo userInfo);
}
