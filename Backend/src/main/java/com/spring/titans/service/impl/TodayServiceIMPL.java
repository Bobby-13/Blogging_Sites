package com.spring.titans.service.impl;

import com.spring.titans.dto.CommentsWithPostDTO;
import com.spring.titans.dto.ResponseDto;
import com.spring.titans.entity.*;
import com.spring.titans.repository.*;
import com.spring.titans.service.PostService;
import com.spring.titans.service.TodayService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;

import java.sql.Timestamp;
import java.util.*;

@Service
public class TodayServiceIMPL implements TodayService {
    @Autowired
    private PostRepository postRepository;
    @Autowired
    private CommentRepository commentRepository;
    @Autowired
    private PostLikesRepository postLikesRepository;
    @Autowired
    private SavedPostRepository savedPostRepository;

    @Autowired
    private UserInfoRepository userrepo;
    public  long GetUser_id(Authentication authentication){
        if (authentication != null && authentication.getPrincipal() instanceof UserDetails) {
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            String username = userDetails.getUsername();
            System.out.println(username);
            Optional<UserInfo> user = userrepo.findByEmail(username);
            if(user.isEmpty()){
                System.out.println("dhfkus");
            }
            System.out.println("Name :" + username);
            return user.get().getUserId();
        }
        return 0;
    }

    @Override
    public ResponseEntity<ResponseDto> today(String postType) {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        long userId = GetUser_id(authentication);
        List<Post> postList = postRepository.findAll();
        List<Post> toReturn = new ArrayList<>();
        for (Post singlePost : postList) {
            String todayDate = String.valueOf(singlePost.getPostedAt());
            String[] split = todayDate.split(" ");
//            String split1[]=split[0].split("-");
            String today2 = split[0];
            String todayDate1 = String.valueOf(new Timestamp(System.currentTimeMillis()));
//            System.out.println(todayDate1);
            String[] split2 = todayDate1.split(" ");
            String today1 = split2[0];
//            System.out.println(today1 + "   " + today2);
            if (singlePost.getPostType().equals(postType) && today1.equals(today2) && singlePost.getPostStatus()) {
                toReturn.add(singlePost);
            }
        }
            List<Post> posts = new ArrayList<>(toReturn);
            List<CommentsWithPostDTO> commentsWithPostDTOList = new ArrayList<>();

            for (Post i : posts) {
                CommentsWithPostDTO commentsWithPostDTO = new CommentsWithPostDTO();

                Post post = new Post();
                post.setPostId(i.getPostId());
                UserInfo userInfo=new UserInfo();
                userInfo.setUserId(userId);


                Optional<PostLikes> postLikes = postLikesRepository.findAllByUserIdAndPostId(userInfo,post);

                if(postLikes.isPresent()) {
                    postLikes.get().setPostId(null);
                    postLikes.get().setUserId(null);
//                    System.out.println(postLikes);
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

                List<Comments> comments = commentRepository.findAllByPostIdOrderByIdAsc(post);
                for (Comments j : comments) {
                    j.setPostId(null);
                }
                commentsWithPostDTO.setCommentsList(comments);
                commentsWithPostDTO.setPost(i);

                commentsWithPostDTOList.add(commentsWithPostDTO);
            }

            return ResponseEntity.status(HttpStatus.OK).body(new ResponseDto(HttpStatus.OK, "Foryou added successfully", commentsWithPostDTOList));
        }
    }


