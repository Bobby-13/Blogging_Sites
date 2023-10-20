package com.spring.titans.service.impl;

import com.spring.titans.dto.CommentsWithPostDTO;
import com.spring.titans.dto.PostLikesDto;
import com.spring.titans.dto.ResponseDto;
import com.spring.titans.entity.*;
import com.spring.titans.repository.*;
import com.spring.titans.service.TrendingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
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
public class TrendingServiceIMPL implements TrendingService {
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
    public ResponseEntity<ResponseDto> trending(String postType) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        long userId = GetUser_id(authentication);
        List<Post>postList= postRepository.findAll(Sort.by(Sort.Direction.DESC,"viewCounts"));
        List<Post>toReturn=new ArrayList<>();
        for(Post singlePost:postList){
            String list1=singlePost.getPostType();
//            System.out.println(list1+"    "+po);
            if (list1.equals(postType)&&singlePost.getPostStatus()) {
                toReturn.add(singlePost);
            }
        }

        List<CommentsWithPostDTO> commentsWithPostDTOList=new ArrayList<>();




        for(Post i:toReturn)
        {
            CommentsWithPostDTO commentsWithPostDTO=new CommentsWithPostDTO();

            Post post=new Post();
            post.setPostId(i.getPostId());
            UserInfo userInfo = new UserInfo();
            userInfo.setUserId(userId);

            Optional<PostLikes> postLikes = postLikesRepository.findAllByUserIdAndPostId(userInfo,post);
            if(postLikes.isPresent()) {
                postLikes.get().setPostId(null);
                postLikes.get().setUserId(null);
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

        return ResponseEntity.status(HttpStatus.OK).body(new ResponseDto(HttpStatus.OK, "Trending added successfully",commentsWithPostDTOList ));

    }

    @Override
    public ResponseEntity<ResponseDto> topThree() {
        List<Post>list=postRepository.findAll(Sort.by(Sort.Direction.DESC,"postLikesCount"));
        List<Post>topThree=new ArrayList<>();
        int count=0;
        for(Post post:list){
            if(post.getPostStatus()) {
                topThree.add(post);
                count++;
            }

            if(count==3){
                break;
            }
        }
        List<Post>posts=new ArrayList<>(topThree);
        List<CommentsWithPostDTO> commentsWithPostDTOList=new ArrayList<>();

        for(Post i:posts)
        {
            CommentsWithPostDTO commentsWithPostDTO=new CommentsWithPostDTO();

            Post post=new Post();
            post.setPostId(i.getPostId());


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
