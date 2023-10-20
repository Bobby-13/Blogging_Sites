package com.spring.titans.repository;

import com.spring.titans.entity.Post;
import com.spring.titans.entity.PostLikes;
import com.spring.titans.entity.UserInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PostLikesRepository extends JpaRepository<PostLikes,Long> {

    Optional<PostLikes> findAllByUserIdAndPostId(UserInfo user, Post postl);
    List<PostLikes> findAllByPostId(Post post);

    List<PostLikes> findAllByUserId(UserInfo userInfo);

    void deleteAllByUserId(UserInfo userInfo);
}
