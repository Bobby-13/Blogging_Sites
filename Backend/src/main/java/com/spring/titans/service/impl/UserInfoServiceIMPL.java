package com.spring.titans.service.impl;


import ch.qos.logback.core.encoder.EchoEncoder;
import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import com.spring.titans.dto.*;

import com.spring.titans.entity.*;
import com.spring.titans.dto.*;
import com.spring.titans.repository.*;
import com.spring.titans.service.UserInfoService;
import jakarta.transaction.Transactional;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.*;

@Service
public class UserInfoServiceIMPL implements UserInfoService {

    private static final String KEY ="rzp_test_evOSEjN5eggEri";
    private static final String KEY_SECRET ="w2UPBP05X1YgunftDFdIzwbp";
    private static final String CURRENCY ="INR";


    @Autowired
    private UserInfoRepository repository;
    @Autowired
    private AdminRepository adminRepository;
    @Autowired
    private PostRepository postRepository;
    @Autowired
    private CommentRepository commentRepository;
    @Autowired
    private PostLikesRepository postLikesRepository;
    @Autowired
    private ViewRepository viewRepository;
    @Autowired
    private SavedPostRepository savedPostRepository;
    @Autowired
    private FollowersRepository followersRepository;
    @Autowired
    private NotificationRepository notificationRepository;

    @Autowired
    private EmailService emailService;

    @Autowired
    private PasswordResetRepository passwordResetRepository;
    @Autowired
    private PasswordEncoder encoder;


    public UserInfoServiceIMPL(UserInfoRepository repository, PasswordEncoder encoder) {
        this.repository = repository;
        this.encoder = encoder;
    }

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
    public boolean processOAuthPostLogin(OauthLogin oauthLogin) {
        Optional<UserInfo> existUser = repository.findByEmail(oauthLogin.getEmail());
        if(existUser.isEmpty()){
            UserInfo newUser = new UserInfo();
            newUser.setPassword(encoder.encode("TeChTiTAns@071325"));
            newUser.setRoles((Role.USER));
            newUser.setEmail(oauthLogin.getEmail());
            newUser.setUserName(oauthLogin.getName());
            newUser.setUserProfile(oauthLogin.getProfile());
            newUser.setProvider(Provider.GOOGLE);
            newUser.setUserType("author");
//            newUser.setInterests(List.of("Food"));
            repository.save(newUser);

            return true;
        }

        return false;
    }

    @Override
    public boolean AddNewUser(UserInfoDto userInfoDto) {

        Optional<UserInfo> verifyuser = repository.findByEmail(userInfoDto.getEmail());

        if(verifyuser.isPresent()){
            return false;
        }
        UserInfo userInfo = new UserInfo();
        userInfo.setUserName(userInfoDto.getUserName());
        userInfo.setEmail(userInfoDto.getEmail());
        userInfo.setPhNo(userInfoDto.getPhNo());
        userInfo.setPassword(encoder.encode(userInfoDto.getPassword()));
        userInfo.setRoles((Role.USER));
        userInfo.setProvider(Provider.LOCAL);
        userInfo.setUserType("author");
        repository.save(userInfo);
            return true;
        }

    @Override
    public String forgotPassword(UserInfo user) {
        String vcode = generateOTP();

        PasswordReset passwordReset = PasswordReset.builder()
                .otp(vcode)
                .expiryTime(Instant.now().plusMillis(300000))
                .userInfo(user)
                .build();

        emailService.EmailSender(user.getEmail(),"OTP for New Password Setup","To set a new password for your account, please enter the OTP provided: <b>"+vcode+"</b>. This ensures your account's security.</span></body></html>");

        passwordResetRepository.save(passwordReset);
        return "OTP sent";
    }

    @Override
    public boolean otpVerification(String email, String otp) {
        Optional<PasswordReset> passwordReset =  passwordResetRepository.findByOtp(otp);
        if(passwordReset.isPresent()){
            if(passwordReset.get().getExpiryTime().isAfter(Instant.now())){
                return true;
            }
        }
        return false;


    }

    @Override
    public boolean ChangePassword(PasswordChangeDto passwordChangeDto) {
        Optional<UserInfo> user = repository.findByEmail(passwordChangeDto.getEmail());
        if(user.isPresent()){
            UserInfo updateUser = user.get();
            updateUser.setPassword(encoder.encode(passwordChangeDto.getPassword()));
            repository.save(updateUser);
            return true;
        }
        return false;
    }

    @Override
    public boolean UpdatePassword(PasswordUpdateDto passwordUpdateDto,String email) {

        Optional<UserInfo> user = repository.findByEmail(email);
        if(user.isPresent()){
            UserInfo userInfo = user.get();
            if(encoder.matches(passwordUpdateDto.getOldPassword(),userInfo.getPassword())){
                userInfo.setPassword(encoder.encode(passwordUpdateDto.getNewPassword()));
                repository.save(userInfo);
                return true;
            }
            return false;
        }
        return false;
    }

    @Override
    public ResponseEntity<TransactionDetails> CreateTransaction(Double amount) {
        try {
            JSONObject jsonObject = new JSONObject();
            jsonObject.put("amount",(amount * 100));
            jsonObject.put("currency",CURRENCY);
            RazorpayClient razorpayClient =new RazorpayClient(KEY,KEY_SECRET);
            Order order = razorpayClient.orders.create(jsonObject);

            TransactionDetails transactionDetails = new TransactionDetails();

            transactionDetails.setOrderId(order.get("id"));
            transactionDetails.setCurrency(order.get("currency"));
            transactionDetails.setAmount(order.get("amount"));
            //System.out.println(order);
            return  new ResponseEntity<>(transactionDetails, HttpStatus.OK);

        } catch (RazorpayException e) {
            System.out.println(e.getMessage());
            return new ResponseEntity<>(TransactionDetails.builder().orderId("Payment Failed").build(),HttpStatus.BAD_REQUEST);
//            throw new RuntimeException(e);
        }
    }

    public static String generateOTP() {
        UUID uuid = UUID.randomUUID();
        long otpValue = Math.abs(uuid.getMostSignificantBits() % 1000000); // Extract 6 digits
        return String.format("%06d", otpValue);
    }

    @Override
    public ResponseEntity<ResponseDto> afterSignup( AfterSignUpDto afterSignUpDto) {
        UserInfo userInfo=repository.findById(afterSignUpDto.getUserId()).get();
        userInfo.setInterests(afterSignUpDto.getInterests());
        repository.save(userInfo);
        return ResponseEntity.status(HttpStatus.OK).body(new ResponseDto(HttpStatus.OK,"interests updated",userInfo));
    }

    @Override
    public ResponseEntity<ResponseDto> bio( UserBioDto userBioDto) {
        UserInfo userInfo=repository.findById(userBioDto.getUserId()).get();
        userInfo.setDob(userBioDto.getDob());
        userInfo.setUserProfile(userBioDto.getUserProfile());
        userInfo.setBioDescription(userBioDto.getBioDescription());
        repository.save(userInfo);
        return ResponseEntity.status(HttpStatus.OK).body(new ResponseDto(HttpStatus.OK,"bio Added",userInfo));

    }

    @Override
    public ResponseEntity<ResponseDto> updateBio( UserDto userDto) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        long userId = GetUser_id(authentication);
        UserInfo userInfo=repository.findById(userId).get();
        userInfo.setDob(userDto.getDob());
        userInfo.setInterests(userDto.getInterests());
        userInfo.setUserName(userDto.getUserName());
        userInfo.setPhNo(userDto.getPhNo());
        userInfo.setUserProfile(userDto.getUserProfile());
        userInfo.setBioDescription(userDto.getBioDescription());
        repository.save(userInfo);
        return ResponseEntity.status(HttpStatus.OK).body(new ResponseDto(HttpStatus.OK,"bio updated",userInfo));

    }

    @Override
    public ResponseEntity<ResponseDto> getUser(Long userId) {
        UserInfo user=repository.findById(userId).get();
        return ResponseEntity.status(HttpStatus.OK).body(new ResponseDto(HttpStatus.OK,"User details",user));

    }

    @Override
    public ResponseEntity<ResponseDto> changeReader(Long userId) {
        Admin admin=new Admin();
        UserInfo userInfo=new UserInfo();
        userInfo.setUserId(userId);
        admin.setUserId(userInfo);
        adminRepository.save(admin);
        return ResponseEntity.status(HttpStatus.OK).body(new ResponseDto(HttpStatus.OK,"notification to admin",admin));

    }

    @Override
    public ResponseEntity<ResponseDto> myPosts(Long userId) {

        List<Post>postList=postRepository.findAll();
        List<Post>posts1=new ArrayList<>();

        for(Post i:postList){
            UserInfo userInfo = new UserInfo();
            userInfo.setUserId(i.getUserId().getUserId());
            if(userInfo.getUserId().equals(userId)&&i.getPostStatus()){
                posts1.add(i);
            }
        }
        List<Post> posts = new ArrayList<>(posts1);
        List<CommentsWithPostDTO> commentsWithPostDTOList = new ArrayList<>();

        for (Post i : posts) {
            CommentsWithPostDTO commentsWithPostDTO = new CommentsWithPostDTO();

            Post post = new Post();
            post.setPostId(i.getPostId());

            List<Comments> comments = commentRepository.findAllByPostIdOrderByIdAsc(post);
            for (Comments j : comments) {
                j.setPostId(null);
            }
            commentsWithPostDTO.setCommentsList(comments);
            commentsWithPostDTO.setPost(i);

            commentsWithPostDTOList.add(commentsWithPostDTO);
        }

        return ResponseEntity.status(HttpStatus.OK).body(new ResponseDto(HttpStatus.OK, "MyPosts ", commentsWithPostDTOList));

    }


    @Override
    public ResponseEntity<ResponseDto> getAllusers() {
        List<UserInfo> userInfo = repository.findAll();

        List<UserInfo> user = new ArrayList<>();
        for(UserInfo userInfo1:userInfo){
            if(userInfo1.getRoles().equals(Role.USER))
            {
                user.add(userInfo1);
            }
        }

        return ResponseEntity.status(HttpStatus.OK).body(new ResponseDto(HttpStatus.OK, "AllPosts ", user));
    }


    @Transactional
    @Override
    public ResponseEntity<ResponseDto> deleteUser(Long userId) {
//        UserInfo userInfo = new UserInfo();
//        userInfo.setUserId(userId);

  try {
      UserInfo userInfo = repository.findById(userId).orElse(null);
      if (userInfo == null) {
          return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ResponseDto(HttpStatus.NOT_FOUND, "User not found", null));
      }
//        List<View> views = viewRepository.findAllByUserId(userInfo);
//        for (View view : views) {
//            viewRepository.delete(view);
//        }

         viewRepository.deleteAllByUserId(userInfo);
//        List<PostLikes> postLikes = postLikesRepository.findAllByUserId(userInfo);
//        System.out.println("postlikes"+postLikes);
//        for (PostLikes postLikes1 : postLikes) {
//            postLikesRepository.delete(postLikes1);
//        }

       postLikesRepository.deleteAllByUserId(userInfo);
        List<Post> posts1 = postRepository.findAllByUserId(userInfo);
      System.out.println("Post");
        for (Post post2 : posts1) {
            List<Comments> comments = commentRepository.findAllByPostId(post2);
            for (Comments comments1 : comments) {
                commentRepository.delete(comments1);
            }
            List<SavedPost> savedPostsposts = savedPostRepository.findAllByPostId(post2);
            for (SavedPost savedPost : savedPostsposts) {
                savedPostRepository.delete(savedPost);
            }
        }
        List<Post> posts = postRepository.findAllByUserId(userInfo);
        for (Post post : posts) {
            postRepository.delete(post);
        }
        List<Admin> admin = adminRepository.findAllByUserId(userInfo);
        System.out.println(admin);
        for (Admin admin1 : admin) {
            adminRepository.delete(admin1);
        }
        List<Followers> followers = followersRepository.findAll();
        UserInfo user1 = new UserInfo();
        user1.setUserId(userId);
        UserInfo user2 = new UserInfo();
        user2.setUserId(userId);
// for(Followers followers1:followers) {
        followersRepository.deleteByUser1OrUser2(user1, user2);
// }

        List<Comments> comments = commentRepository.findAllByUserId(userInfo);
        for (Comments comments1 : comments) {
            commentRepository.delete(comments1);
        }
        List<Notification> notifications = notificationRepository.findAllByUserId(userInfo);
        for (Notification notification : notifications) {
            notificationRepository.delete(notification);
        }
        repository.deleteById(userId);

      System.out.println("ghds");
        return ResponseEntity.status(HttpStatus.OK).body(new ResponseDto(HttpStatus.OK, "User deleted ", userInfo));
  }catch (Exception e) {
         return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ResponseDto(HttpStatus.INTERNAL_SERVER_ERROR,"Error Deleting User",null));
  }
    }
}


