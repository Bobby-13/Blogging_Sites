package com.spring.titans.service.impl;


import com.spring.titans.dto.CommentsWithPostDTO;
import com.spring.titans.dto.FollowersPostDto;
import com.spring.titans.dto.ResponseDto;
import com.spring.titans.entity.*;
import com.spring.titans.repository.*;
import com.spring.titans.service.CommentService;
import com.spring.titans.service.FollowersService;
import com.spring.titans.service.UserInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;

@Service
public class FollowersServiceIMPL implements FollowersService {
    @Autowired
    private FollowersRepository repository;

    @Autowired
    private PostRepository postRepository;
    @Autowired
    private CommentRepository commentRepository;
    @Autowired
    private UserInfoRepository userInfoRepository;
    @Autowired
    private PostLikesRepository postLikesRepository;
    @Autowired
    private SavedPostRepository savedPostRepository;

    public  long GetUser_id(Authentication authentication){
        if (authentication != null && authentication.getPrincipal() instanceof UserDetails) {
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            String username = userDetails.getUsername();
            System.out.println(username);
            Optional<UserInfo> user = userInfoRepository.findByEmail(username);
            if(user.isEmpty()){
                System.out.println("dhfkus");
            }
            System.out.println("Name :" + username);
            return user.get().getUserId();
        }
        return 0;
    }

    @Override
    public String follow(Long user1, Long user2) {
        Followers followers=new Followers();
        UserInfo userA=new UserInfo();
        userA.setUserId(user1);
        UserInfo userB=new UserInfo();
        userB.setUserId(user2);
        followers.setUser1(userA);
        followers.setUser2(userB);
        repository.save(followers);
        return "followed successfully";
    }

    @Override
    public String followingCount(Long userId) {
        List<Followers>li=repository.findAll();
        Long count=0L;
        for(Followers followers:li){
            UserInfo userInfo=followers.getUser1();
            if(userInfo.getUserId().equals(userId)){
                count++;
            }
        }
        System.out.println(count);

        return "following counted successfully";
    }

    @Override
    public String followers(Long userId) {
        List<Followers>li=repository.findAll();
        Long count=0L;
        for(Followers followers:li){
            UserInfo userInfo=followers.getUser2();
            if(userInfo.getUserId().equals(userId)){
                count++;
            }
        }
        System.out.println(count);

        return "followers counted successfully";
    }


    @Override
    public ResponseEntity<ResponseDto> returnFollowing(FollowersPostDto followersPostDto) {
        HashSet<Post> postsL=new HashSet<>();
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        long userId =GetUser_id(authentication);
       List<Followers> followers1=repository.findAll();
       for(Followers followers2:followers1){
           UserInfo userInfo = new UserInfo();
           userInfo.setUserId(userId);
           if(followers2.getUser1().getUserId().equals(userInfo.getUserId())){
               List<Post>posts1=postRepository.findAll();
               for(Post singlePost:posts1){
                   if(singlePost.getPostStatus()&&followers2.getUser2().equals(singlePost.getUserId())&&singlePost.getPostType().equals(followersPostDto.getPostType())){
                       System.out.println(followers2.getUser2());
                       postsL.add(singlePost);
                   }

               }
           }
       }


        List<CommentsWithPostDTO> commentsWithPostDTOList=new ArrayList<>();

        for(Post i:postsL)
        {
            CommentsWithPostDTO commentsWithPostDTO=new CommentsWithPostDTO();
            UserInfo userInfo=new UserInfo();
            userInfo.setUserId(userId);
            Post post=new Post();
            post.setPostId(i.getPostId());

            Optional<PostLikes> postLikes = postLikesRepository.findAllByUserIdAndPostId(userInfo,post);

            if(postLikes.isPresent()) {
                postLikes.get().setPostId(null);
                postLikes.get().setUserId(null);
                System.out.println(postLikes);
                commentsWithPostDTO.setPostLikes(postLikes.get());

            }else{
                commentsWithPostDTO.setPostLikes(null);
            }

            Optional<SavedPost> savedPost = savedPostRepository.findAllByUserIdAndPostId(userInfo,post);

            if(savedPost.isPresent()){
                savedPost.get().setPostId(null);
                savedPost.get().setUserId(null);
                commentsWithPostDTO.setSavedPost(savedPost.get());
            }else{
                commentsWithPostDTO.setSavedPost(null);
            }

            List<Comments> comments=commentRepository.findAllByPostIdOrderByIdAsc(post);
            for(Comments j:comments)
            {
                j.setPostId(null);
            }
            commentsWithPostDTO.setCommentsList(comments);
            commentsWithPostDTO.setPost(i);

            commentsWithPostDTOList.add(commentsWithPostDTO);
        }

        return ResponseEntity.status(HttpStatus.OK).body(new ResponseDto(HttpStatus.OK, "Followers Posts",commentsWithPostDTOList ));


    }


}
