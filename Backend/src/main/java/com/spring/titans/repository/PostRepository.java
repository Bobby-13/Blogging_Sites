package com.spring.titans.repository;

import com.spring.titans.dto.PostDto;
import com.spring.titans.entity.Post;
import com.spring.titans.entity.UserInfo;
import com.spring.titans.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

import com.spring.titans.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post,Long> {


    Post findByPostId(Long post1);


    List<Post> findAllByUserId(UserInfo userInfo);
}
