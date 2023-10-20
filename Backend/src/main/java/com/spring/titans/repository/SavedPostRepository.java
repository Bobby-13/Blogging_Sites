package com.spring.titans.repository;

import com.spring.titans.dto.PostDto;
import com.spring.titans.dto.SavedPostDto;
import com.spring.titans.entity.Post;
import com.spring.titans.entity.SavedPost;
import com.spring.titans.entity.UserInfo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface SavedPostRepository extends JpaRepository<SavedPost,Long> {



    Optional<SavedPost> findAllByUserIdAndPostId(UserInfo userInfo, Post post);

    List<SavedPost> findAllByUserIdAndIsSave(UserInfo userInfo,Boolean isSave);

    List<SavedPost> findAllByPostId(Post post2);
}
