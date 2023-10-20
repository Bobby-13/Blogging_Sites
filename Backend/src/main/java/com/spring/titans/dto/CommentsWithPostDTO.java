package com.spring.titans.dto;

import com.spring.titans.entity.Post;
import com.spring.titans.entity.PostLikes;
import com.spring.titans.entity.SavedPost;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CommentsWithPostDTO {

        private Post post;
        private PostLikes postLikes;
        private SavedPost savedPost;
        private List commentsList;

    }


