package com.spring.titans.service.impl;


import com.spring.titans.dto.CommentsWithPostDTO;
import com.spring.titans.dto.ResponseDto;
import com.spring.titans.entity.*;
import com.spring.titans.repository.CommentRepository;
import com.spring.titans.repository.PostLikesRepository;
import com.spring.titans.repository.PostRepository;
import com.spring.titans.repository.SavedPostRepository;
import com.spring.titans.service.SavedPostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class SavedPostServiceIMPL implements SavedPostService {
    @Autowired
    private SavedPostRepository savedPostRepository;
    @Autowired
    private PostRepository postRepository;
    @Autowired
    private CommentRepository commentRepository;
    @Autowired
    private PostLikesRepository postLikesRepository;
    @Override
    public Boolean isSaved(Long userId, Long postId,Boolean isSave) {
        List<SavedPost>posts=savedPostRepository.findAll();
        SavedPost savedPost=new SavedPost();
        UserInfo userInfo=new UserInfo();
        userInfo.setUserId(userId);
        savedPost.setUserId(userInfo);
        Post post = new Post();
        post.setPostId(postId);
        savedPost.setPostId(post);

           Optional<SavedPost>  savedPost1=savedPostRepository.findAllByUserIdAndPostId(userInfo,post);
          if(savedPost1.isPresent())
          {
              if(savedPost1.get().getIsSave()) {
                  savedPost1.get().setIsSave(false);
                  savedPostRepository.save(savedPost1.get());
                  return false;
              }else{
                  savedPost1.get().setIsSave(true);
                  savedPostRepository.save(savedPost1.get());
                  return true;
              }
          }
          else {
              SavedPost savedPost2 = new SavedPost();
              savedPost2.setIsSave(true);
              savedPost2.setPostId(post);
              savedPost2.setUserId(userInfo);

              savedPostRepository.save(savedPost2);
              return true;
          }


    }

    @Override
    public ResponseEntity<ResponseDto> returnSavedPost(Long userId) {
        UserInfo userInfo=new UserInfo();
        userInfo.setUserId(userId);
        Boolean b=true;
        List <SavedPost>  savedPost1=savedPostRepository.findAllByUserIdAndIsSave(userInfo,b);
//        System.out.println(savedPost1);
        Set<Post>posts1=new HashSet<>();
        for(SavedPost savedPost:savedPost1){
           Post post = postRepository.findByPostId(savedPost.getPostId().getPostId());
           if(post.getPostStatus()) {
               posts1.add(post);
           }
        }
        List<Post>posts=new ArrayList<>(posts1);
        List<CommentsWithPostDTO> commentsWithPostDTOList=new ArrayList<>();

        for(Post i:posts)
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

        return ResponseEntity.status(HttpStatus.OK).body(new ResponseDto(HttpStatus.OK, "Post Saved successfully",commentsWithPostDTOList ));

    }
}
