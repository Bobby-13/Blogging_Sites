package com.spring.titans.service.impl;

import com.spring.titans.dto.CommentDto;

import com.spring.titans.dto.ResponseDto;
import com.spring.titans.entity.*;
import com.spring.titans.repository.*;
import com.spring.titans.service.CommentService;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

import java.util.List;

import static java.lang.Boolean.TRUE;

@Service
public class CommentServiceIMPL implements CommentService {
    @Autowired
    private CommentRepository repository;

    @Autowired
    private PostRepository postRepository;
    @Autowired
    private UserInfoRepository userInfoRepository;
    @Autowired
    private CommentRepository commentRepository;
    @Autowired
    private FollowersRepository followersRepository;
    @Autowired
    private NotificationRepository notificationRepository;

    @Override
    public ResponseEntity<ResponseDto> comment(CommentDto commentDto) {
        Comments comments = new Comments();

        Post post = postRepository.findById(commentDto.getPostId()).get();
        System.out.println(post);
        System.out.println(commentDto);
        comments.setContent(commentDto.getContent());
        comments.setCommentLikes(commentDto.getCommentLikes());
        comments.setCommentDisLikes(commentDto.getCommentDisLikes());
        comments.setCommentedAt(commentDto.getCommentedAt());
        UserInfo user =userInfoRepository.findById(commentDto.getUserId()).get();
        comments.setUserId(user);
        comments.setPostId(post);
        comments.setCommentLikes(0L);
        comments.setCommentDisLikes(0L);

        Comments comments1 = repository.save(comments);

        //comment notification
        List<Followers> followers1=followersRepository.findAll();
        for(Followers followers2:followers1) {

            UserInfo userInfo = new UserInfo();
            userInfo.setUserId(commentDto.getUserId());
            UserInfo userInfo1 = new UserInfo();
            userInfo1.setUserId(followers2.getUser2().getUserId());
            if (userInfo.equals(userInfo1)) {
                Notification notification = new Notification();
                UserInfo userInfo2 = new UserInfo();
                userInfo2.setUserId(post.getUserId().getUserId());
//              System.out.println(followers2.getUser1().getUserId());
                notification.setUserId(followers2.getUser1());
//                System.out.println(post.getUserId().getUserId());
                notification.setStatus(false);
                Post post1=new Post();
                post1.setUserId(post.getUserId());
//                System.out.println(commentDto.getUserId());

                notification.setContent(commentDto.getUserId() + " commented on your post \""+post.getPostTitle()+"\"");
                notification.setTime(comments1.getCommentedAt());
                notificationRepository.save(notification);
            }
        }
        List<Comments>allCo=new ArrayList<>();
        allCo.add(comments);
        postRepository.save(post);
//        System.out.println(post);

        return ResponseEntity.status(HttpStatus.OK).body(new ResponseDto(HttpStatus.OK, "comment added successfully", comments1));
    }

    @Override
    public String likescount(Long commentId, Boolean likesMaintain) {

        Comments comments = repository.findById(commentId).get();

//        Comments comments = new Comments();
        if (likesMaintain) {
            comments.setCommentLikes(comments.getCommentLikes() + 1);
            repository.save(comments);
            return "likes added successfully";

        } else {
            comments.setCommentDisLikes(comments.getCommentDisLikes() + 1);
            repository.save(comments);
            return "disliked successfully";
        }

    }
}
