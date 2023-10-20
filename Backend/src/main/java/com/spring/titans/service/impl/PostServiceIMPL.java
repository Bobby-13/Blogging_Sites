package com.spring.titans.service.impl;

import com.spring.titans.dto.PostDto;
import com.spring.titans.dto.PostLikesDto;
import com.spring.titans.dto.ResponseDto;
import com.spring.titans.entity.*;
import com.spring.titans.repository.*;
import com.spring.titans.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PostServiceIMPL implements PostService {
    @Autowired
    private PostRepository postRepository;
    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private UserInfoRepository userInfoRepository;
    @Autowired
    private NotificationRepository notificationRepository;
    @Autowired
    private FollowersRepository followersRepository;
    @Autowired
    private PostLikesRepository postLikesRepository;
    @Autowired
    private AdminRepository adminRepository;
    @Autowired
    private ViewRepository viewRepository;

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
    public ResponseEntity<ResponseDto> post(PostDto postDto) {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        long userId = GetUser_id(authentication);
        Post post = new Post();
        Admin admin = new Admin();
        UserInfo user = new UserInfo();
        user.setUserId(userId);
        post.setUserId(user);
        post.setPostTitle(postDto.getPostTitle());
        post.setContent(postDto.getContent());
        post.setTags(postDto.getTags());
        post.setCategory(postDto.getCategory());
        post.setPostType(postDto.getPostType());
        post.setMediaContent(postDto.getMediaContent());
        post.setDescription(postDto.getDescription());
        UserInfo userInfo=userInfoRepository.findById(userId).get();
        if(userInfo.getUserType().equals("author")) {
            postRepository.save(post);
            Post post1 = new Post();
            post1.setPostId(post.getPostId());
            UserInfo info = new UserInfo();
            info.setUserId(post.getUserId().getUserId());
            admin.setUserId(info);
            admin.setPostId(post1);
            adminRepository.save(admin);

            return ResponseEntity.status(HttpStatus.OK).body(new ResponseDto(HttpStatus.OK, "post added successfully", post));

        }else{
            return ResponseEntity.status(HttpStatus.OK).body(new ResponseDto(HttpStatus.OK, "user not allowed post", ""));
        }
    }


    @Override
    public String postLikesCount(Long postId, Boolean postLikesMaintain) {

        Post post = postRepository.findById(postId).get();
        if (postLikesMaintain) {
            post.setPostLikesCount(post.getPostLikesCount() + 1);
            postRepository.save(post);
            return "Liked Successfully";
        } else {
            post.setPostDisLikesCount(post.getPostDisLikesCount() + 1);
            postRepository.save(post);
            return "DisLiked Successfully";
        }
    }
    public ResponseEntity<ResponseDto> newLikes(PostLikesDto postLikesDto) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        long userId = GetUser_id(authentication);
        Post postl = new Post();
        postl.setPostId(postLikesDto.getPostId());
        UserInfo user = new UserInfo();
        user.setUserId(userId);
        Post post = postRepository.findById(postLikesDto.getPostId()).get();
        Optional<PostLikes> postLikes1 = postLikesRepository.findAllByUserIdAndPostId(user, postl);


        if (postLikes1.isPresent()) {
            boolean isDislikeStatus = postLikes1.get().getIsDisLiked();
            boolean isDislikeRequest = postLikesDto.getIsDisLiked();
            boolean isLikeStatus = postLikes1.get().getIsLiked();
            boolean isLikeRequest = postLikesDto.getIsLiked();


            if (isDislikeStatus != isDislikeRequest) {
                Optional<Post> newPost = postRepository.findById(postLikesDto.getPostId());
                if (isDislikeStatus) {
                    postLikes1.get().setIsDisLiked(false);
                    postLikesRepository.save(postLikes1.get());
                    newPost.get().setPostDisLikesCount(newPost.get().getPostDisLikesCount() - 1);
                    postRepository.save(newPost.get());

                } else {
                    postLikes1.get().setIsDisLiked(true);
                    postLikesRepository.save(postLikes1.get());
                    newPost.get().setPostDisLikesCount(newPost.get().getPostDisLikesCount() + 1);
                    postRepository.save(newPost.get());
                }

            }
            if (isLikeRequest != isLikeStatus) {

                Optional<Post> newPost = postRepository.findById(postLikesDto.getPostId());
                if (isLikeStatus) {
                    postLikes1.get().setIsLiked(false);
                    postLikesRepository.save(postLikes1.get());
                    newPost.get().setPostLikesCount(newPost.get().getPostLikesCount() - 1);
                    postRepository.save(newPost.get());

                } else {
                    postLikes1.get().setIsLiked(true);
                    postLikesRepository.save(postLikes1.get());
                    newPost.get().setPostLikesCount(newPost.get().getPostLikesCount() + 1);
                    postRepository.save(newPost.get());

                }


            }
        } else {
            PostLikes postLikes = new PostLikes();

            Optional<Post> newPost = postRepository.findById(postLikesDto.getPostId());

            Optional<UserInfo> newUser = userInfoRepository.findById(userId);
            postLikes.setPostId(newPost.get());
            postLikes.setUserId(newUser.get());
            postLikes.setIsLiked(postLikesDto.getIsLiked());
            postLikes.setIsDisLiked(postLikesDto.getIsDisLiked());
            if (postLikesDto.getIsLiked())
                newPost.get().setPostLikesCount(newPost.get().getPostLikesCount() + 1);
            if (postLikesDto.getIsDisLiked())
                newPost.get().setPostDisLikesCount(newPost.get().getPostDisLikesCount() + 1);


            postLikesRepository.save(postLikes);


        }
        return ResponseEntity.status(HttpStatus.OK).body(new ResponseDto(HttpStatus.OK, "likes handled successfully", postLikes1));
    }

    @Override
    public ResponseEntity<ResponseDto> editPost(PostDto postDto,Long postId) {
        Post post = postRepository.findById(postId).get();
        post.setCategory(postDto.getCategory());
        post.setContent(postDto.getContent());
        post.setPostTitle(postDto.getPostTitle());
        post.setTags(postDto.getTags());
        post.setMediaContent(postDto.getMediaContent());
        post.setDescription(postDto.getDescription());
        postRepository.save(post);
        return ResponseEntity.status(HttpStatus.OK).body(new ResponseDto(HttpStatus.OK, "Post edited successfully", post));
    }

    @Override
    public ResponseEntity<ResponseDto> deletePost(Long postId) {
        System.out.println(postId+" hsjhvcjvz");

        Post post=new Post();
        post.setPostId(postId);
        List<Admin>admin= adminRepository.findAllByPostId(post);
        System.out.println(admin);
        for(Admin admin1:admin){
            adminRepository.delete(admin1);
        }
        List<PostLikes>postLikes=postLikesRepository.findAllByPostId(post);
        System.out.println(postLikes);
        for(PostLikes postLikes1:postLikes){
            postLikesRepository.delete(postLikes1);
        }
        List<Comments>comments=commentRepository.findAllByPostId(post);
        for(Comments comments1:comments){
            commentRepository.delete(comments1);
        }
        List<View>views=viewRepository.findAllByPostId(post);
        for(View view:views){
            viewRepository.delete(view);
        }

        postRepository.deleteById(postId);



        return ResponseEntity.status(HttpStatus.OK).body(new ResponseDto(HttpStatus.OK, "Post deleted successfully", ""));

    }
}


