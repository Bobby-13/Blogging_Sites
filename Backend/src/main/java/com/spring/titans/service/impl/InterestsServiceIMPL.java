package com.spring.titans.service.impl;

import com.spring.titans.dto.CommentsWithPostDTO;
import com.spring.titans.dto.InterestsDto;
import com.spring.titans.dto.ResponseDto;
import com.spring.titans.entity.*;
import com.spring.titans.repository.*;
import com.spring.titans.service.InterestsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class InterestsServiceIMPL implements InterestsService {

    @Autowired
    private PostRepository repository;
    @Autowired
    private CommentRepository commentRepository;
    @Autowired
    private PostLikesRepository postLikesRepository;
    @Autowired
    private SavedPostRepository savedPostRepository;

    @Autowired
    private UserInfoRepository repo;
    public  long GetUser_id(Authentication authentication){
        if (authentication != null && authentication.getPrincipal() instanceof UserDetails) {
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            String username = userDetails.getUsername();
            System.out.println(username);
            Optional<UserInfo> user = repo.findByEmail(username);
            if(user.isEmpty()){
                System.out.println("dhfkus");
            }
            System.out.println("Name :" + username);
            return user.get().getUserId();
        }
        return 0;
    }
    @Override
    public ResponseEntity<ResponseDto> interest(InterestsDto interestsDto) {
        List<Post>allPosts=repository.findAll();
        List<Post>toReturn=new ArrayList<>();
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        long userId = GetUser_id(authentication);
        for(Post singlePost:allPosts){
           List <String> list=singlePost.getCategory();
            String list1=singlePost.getPostType();
               if (list.contains(interestsDto.getInterest())&&list1.equals(interestsDto.getPostType())&&singlePost.getPostStatus()) {
                    toReturn.add(singlePost);
            }
        }

        List<Post>posts=new ArrayList<>(toReturn);
        List<CommentsWithPostDTO> commentsWithPostDTOList=new ArrayList<>();

        for(Post i:posts)
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

        return ResponseEntity.status(HttpStatus.OK).body(new ResponseDto(HttpStatus.OK, "Foryou added successfully",commentsWithPostDTOList ));

    }
}
