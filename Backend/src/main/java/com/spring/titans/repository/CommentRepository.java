package com.spring.titans.repository;

import com.spring.titans.entity.Comments;

import com.spring.titans.entity.Post;
import com.spring.titans.entity.UserInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface CommentRepository extends JpaRepository<Comments,Long> {

    List<Comments> findAllById(Long commentId);

    List<Comments> findAllByPostIdOrderByIdAsc(Post postId);

    List<Comments> findAllByPostId(Post post);

    List<Comments> findAllByUserId(UserInfo userInfo);
}
