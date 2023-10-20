package com.spring.titans.service.impl;

import com.spring.titans.dto.ViewDto;
import com.spring.titans.entity.Post;
import com.spring.titans.entity.UserInfo;
import com.spring.titans.entity.View;
import com.spring.titans.repository.PostRepository;
import com.spring.titans.repository.UserInfoRepository;
import com.spring.titans.repository.ViewRepository;
import com.spring.titans.service.ViewService;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.support.NullValue;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ViewServiceIMPL implements ViewService {
    @Autowired
    private PostRepository postRepository;
    @Autowired
    private ViewRepository viewRepository;

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
    public String view(ViewDto viewDto) {

Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        long userId = GetUser_id(authentication);
        View view1 = viewRepository.findViewByUserId_UserIdAndPostId_PostId(userId,viewDto.getPostId());

        if(view1 == null){

            Post post=postRepository.findById(viewDto.getPostId()).get();
            post.setViewCounts(post.getViewCounts()+1);
            View view=new View();
            UserInfo user=new UserInfo();
            user.setUserId(userId);
            view.setUserId(user);
            Post post2=new Post();
            post2.setPostId(viewDto.getPostId());
            view.setPostId(post2);
            viewRepository.save(view);
            return "view added successfully";
        }
          return "view already added";
    }
}
