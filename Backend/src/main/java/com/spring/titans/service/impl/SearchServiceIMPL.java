package com.spring.titans.service.impl;

import com.spring.titans.dto.CommentsWithPostDTO;
import com.spring.titans.dto.ResponseDto;
import com.spring.titans.entity.Comments;
import com.spring.titans.entity.Post;
import com.spring.titans.repository.CommentRepository;
import com.spring.titans.repository.PostRepository;
import com.spring.titans.service.SearchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class SearchServiceIMPL implements SearchService {
    @Autowired
    private PostRepository postRepository;
    @Autowired
    private CommentRepository commentRepository;
    @Override
    public ResponseEntity<ResponseDto> search(String searchWord) {
        List<Post> allPosts=postRepository.findAll();
        List<Post>toReturn=new ArrayList<>();
        for(Post singlePost:allPosts){
            List<String>list=singlePost.getTags();
            if(list.contains(searchWord)&&singlePost.getPostStatus()){
                toReturn.add(singlePost);
            }
        }
        List<Post>posts=new ArrayList<>(toReturn);
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
