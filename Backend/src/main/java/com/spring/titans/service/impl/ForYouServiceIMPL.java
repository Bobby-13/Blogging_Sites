package com.spring.titans.service.impl;


import com.spring.titans.dto.CommentsWithPostDTO;
import com.spring.titans.dto.ResponseDto;
import com.spring.titans.dto.forYouDto;
import com.spring.titans.entity.*;
import com.spring.titans.repository.*;
import com.spring.titans.service.ForYouService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class ForYouServiceIMPL implements ForYouService {
    @Autowired
    private UserInfoRepository userInfoRepository;
    @Autowired
    private PostRepository postRepository;

    @Autowired
    private CommentRepository commentRepository;
    @Autowired
    private PostLikesRepository postLikesRepository;
    @Autowired
    private SavedPostRepository savedPostRepository;

    @Autowired
    private UserInfoRepository repository;
    public  long GetUser_id(Authentication authentication){
        if (authentication != null && authentication.getPrincipal() instanceof UserDetails) {
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            String username = userDetails.getUsername();
            System.out.println(username);
            Optional<UserInfo> user = repository.findByEmail(username);
            if(user.isEmpty()){
                System.out.println("dhfkus");
            }
            System.out.println("Name :" + username);
            return user.get().getUserId();
        }
        return 0;
    }
    @Override
    public ResponseEntity<ResponseDto> forYou(forYouDto forYouDto) {
        HashSet<Object>objects=new HashSet<>();
        UserInfo userInfo1=new UserInfo();

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        long userId = GetUser_id(authentication);

        userInfo1.setUserId(userId);
        UserInfo userInfo = userInfoRepository.findById(userInfo1.getUserId()).get();
        List userInterests=userInfo.getInterests();
        HashSet<Post> posts=new HashSet<>();
        for(Object interests:userInterests){
            List<Post> posts1=postRepository.findAll(Sort.by(Sort.Direction.DESC,"postedAt"));
            for(Post post:posts1){
                List tags=post.getCategory();
                for (Object obj:tags){
                    if(obj.equals(interests)&&post.getPostStatus()){
                            posts.add(post);
                    }
                }

            }
        }
        List<Post>listPost=new ArrayList<>();
        for(Post postType:posts){
            if(postType.getPostType().equals(forYouDto.getPostType())){
                listPost.add(postType);
            }
        }
       List<CommentsWithPostDTO> commentsWithPostDTOList=new ArrayList<>();

        for(Post i:listPost)
        {
            CommentsWithPostDTO commentsWithPostDTO=new CommentsWithPostDTO();

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



//        Map<String,List<Object>>data=new HashMap<>();
//        List<Post>list=postRepository.findAll(Sort.by(Sort.Direction.DESC,"postedAt"));
//
         return ResponseEntity.status(HttpStatus.OK).body(new ResponseDto(HttpStatus.OK, "Foryou added successfully",commentsWithPostDTOList ));

    }
}
