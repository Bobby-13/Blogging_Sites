package com.spring.titans.controller;

import com.spring.titans.AuthenticationandAuthorization.ExceptionHandling.CustomAccessDeniedException;
import com.spring.titans.AuthenticationandAuthorization.ExceptionHandling.RoleAuthorization;
import com.spring.titans.AuthenticationandAuthorization.JwtService;
import com.spring.titans.dto.*;
import com.spring.titans.entity.UserInfo;
import com.spring.titans.repository.UserInfoRepository;
import com.spring.titans.service.UserInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
@CrossOrigin
@RestController
@RequestMapping("/user")
public class UserInfoController {

    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private  UserInfoRepository repository;

    @Autowired
    private static UserInfoRepository repo;
    @Autowired
    private JwtService jwtService;
    @Autowired
    private UserInfoService service;

    @PostMapping("/api1/signup")
    public ResponseEntity<JwtResponse> AddNewUser(@RequestBody UserInfoDto user){
        boolean result = service.AddNewUser(user);
        if(result){
            JwtResponse token = JwtResponse.builder().accessToken(jwtService.generateToken(user.getEmail(),"accessToken")).refreshToken(jwtService.generateToken(user.getEmail(),"refreshToken")).body("User Added SuccessFully").build();
            return new ResponseEntity<>(token, HttpStatus.OK);
        }
        return new ResponseEntity<>(JwtResponse.builder().body("User Already Exist").build(), HttpStatus.BAD_REQUEST);
    }

    @PostMapping("/api1/oauthLogin")
    public ResponseEntity<JwtResponse> OAuth2Login(@RequestBody OauthLogin oAuth2User){
        boolean res=service.processOAuthPostLogin(oAuth2User);
        Optional<UserInfo> user = repository.findByEmail(oAuth2User.getEmail());
        String role = user.get().getRoles().toString();
        JwtResponse token = JwtResponse.builder().accessToken(jwtService.generateToken(oAuth2User.getEmail(),"accessToken")).refreshToken(jwtService.generateToken(oAuth2User.getEmail(),"refreshToken")).body(role+"&&"+((res)?"true":"false")).build();
        return new ResponseEntity<>(token, HttpStatus.OK);
    }

    @PostMapping("/api1/login")
    public ResponseEntity<JwtResponse> authenticationAndGetToken(@RequestBody AuthRequest authRequest){
        System.out.println(authRequest.getUsername());
        Authentication authentication;
        try {
            authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authRequest.getUsername(),authRequest.getPassword()));
        } catch (Exception e) {
            return new ResponseEntity<>(JwtResponse.builder().body("No User found").build(), HttpStatus.FORBIDDEN);
        }
        if(authentication.isAuthenticated()){
            System.out.println(authentication.isAuthenticated());
            Optional<UserInfo> user = repository.findByEmail(authRequest.getUsername());
            String role = user.get().getRoles().toString();
            System.out.println(role);
            JwtResponse token = JwtResponse.builder().accessToken(jwtService.generateToken(authRequest.getUsername(),"accessToken")).refreshToken(jwtService.generateToken(authRequest.getUsername(),"refreshToken")).body(role).build();
            return new ResponseEntity<>(token, HttpStatus.OK);
        }
        else{
            return new ResponseEntity<>(JwtResponse.builder().body("No User found").build(), HttpStatus.OK);
        }
    }


    @PostMapping("/api1/refreshToken")
    public ResponseEntity<JwtResponse> RefreshTokenValidation(@RequestBody RefreshTokenDto refreshTokenDto){
        String token = refreshTokenDto.getToken();
           if(!jwtService.isTokenExpired(token)){
               String username = jwtService.extractUsername(token);
               JwtResponse newtoken = JwtResponse.builder().accessToken(jwtService.generateToken(username,"accessToken")).refreshToken(jwtService.generateToken(username,"refreshToken")).body("User Found").build();
               return new ResponseEntity<>(newtoken, HttpStatus.OK);
           }
           return new ResponseEntity<>(JwtResponse.builder().body("Token invalid").build(), HttpStatus.FORBIDDEN);
    }

    @PostMapping("/api1/forgotPassword")
    public ResponseEntity<String> ForgotPassword(@RequestBody PasswordResetDto dto){
        Optional<UserInfo> user = repository.findByEmail(dto.getEmail());
//        System.out.println("gwg");
        if(user.isPresent()){
            UserInfo userInfo = user.get();
         boolean result = userInfo.getProvider().equals(Provider.GOOGLE);
            if(result == true)
            {
                return new ResponseEntity<>("Google User Try Login with Google",HttpStatus.BAD_REQUEST);

            }
            String otp =  service.forgotPassword(user.get());
            return new ResponseEntity<>("OTP sent",HttpStatus.OK);
        }
        return new ResponseEntity<>("No User Found",HttpStatus.BAD_REQUEST);
    }

    @GetMapping("/api1/otpVerification")
    public ResponseEntity<String> OTPVerification(@RequestBody OTPVerificationDto dto){
        boolean result = service.otpVerification(dto.getEmail(), dto.getOTP());
        if(result)
            return new ResponseEntity<>("OTP verified",HttpStatus.OK);

        return new ResponseEntity<>("OTP Expired Or Mismatch",HttpStatus.BAD_REQUEST);
    }

    @PostMapping("/api1/changePassword")
    public ResponseEntity<String> ChangePassword(@RequestBody PasswordChangeDto passwordChangeDto){
            boolean result = service.ChangePassword(passwordChangeDto);
            if(result){
                return new ResponseEntity<>("Password Updated SuccessFully",HttpStatus.OK);
            }
            return new ResponseEntity<>("Password Updation Failed",HttpStatus.BAD_REQUEST);
    }

    @PostMapping("/updatePassword")
    public ResponseEntity<String> UpdatePassword(@RequestBody PasswordUpdateDto passwordUpdateDto){
//        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//        if (authentication != null && authentication.getPrincipal() instanceof UserDetails) {
//            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
//            String username = userDetails.getUsername();
//            System.out.println("Name :"+username);
//                boolean result = service.UpdatePassword(passwordUpdateDto,username);
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = GetUser(authentication);
        if(username!=null) {
            boolean result = service.UpdatePassword(passwordUpdateDto, username);
            System.out.println("result :" + result);

            if (result) {
                return new ResponseEntity<>("Password Updated SuccessFully", HttpStatus.OK);
            } else {
                return new ResponseEntity<>("Old Password Incorrect", HttpStatus.BAD_REQUEST);
            }
        }
            return new ResponseEntity<>("Invalid Request",HttpStatus.BAD_REQUEST);
    }

    @GetMapping("/secured")//for Admin
    public String say() throws CustomAccessDeniedException {

        if(RoleAuthorization.userHasAdminRole())
        {
            throw new CustomAccessDeniedException("Access denied for this Account.");
        }
        return "get lost";
    }

    @GetMapping("/api1/return")
  public String ReturnMsg(){
        return "Hello World !";
    }
    @GetMapping("/api1/createTransaction/{amount}")//user
    public ResponseEntity<TransactionDetails> CreateTransaction(@PathVariable(name = "amount") Double amount) throws CustomAccessDeniedException {
        if(RoleAuthorization.userHasAdminRole())
        {
            throw new CustomAccessDeniedException("Access denied for this Account .");
        }
         return service.CreateTransaction(amount);
    }

    @GetMapping("/userDetails")
    public ResponseEntity<ResponseDto> getUser(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        long userId = GetUser_id1(authentication);
        return service.getUser(userId);
    }
    @PostMapping("/api1/afterSignup")
    public ResponseEntity<ResponseDto> afterSignup( @RequestBody AfterSignUpDto afterSignUpDto){
        return service.afterSignup(afterSignUpDto);
    }

    @PostMapping("/bio")
    public ResponseEntity<ResponseDto> bio( @RequestBody UserBioDto userBioDto){
        return service.bio(userBioDto);
    }
    @PutMapping("/updateBio")
    public ResponseEntity<ResponseDto> bioUpdate( @RequestBody UserDto userDto){
        return service.updateBio(userDto);
    }

    @PostMapping("/request/{userId}")
    public ResponseEntity<ResponseDto> changeReader(@PathVariable Long userId){
        return service.changeReader(userId);
    }
    @GetMapping("/myPosts")
    public ResponseEntity<ResponseDto> myPosts(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        long userId = GetUser_id1(authentication);
        return service.myPosts(userId);
    }

    public static String GetUser(Authentication authentication){
        if (authentication != null && authentication.getPrincipal() instanceof UserDetails) {
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            String username = userDetails.getUsername();
            System.out.println("Name :" + username);
            return username;
        }
        return null;
    }
    public  long GetUser_id1(Authentication authentication){
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

    public static long GetUser_id(Authentication authentication){
//        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//        long userId = UserInfoController.GetUser_id(authentication);
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

}
