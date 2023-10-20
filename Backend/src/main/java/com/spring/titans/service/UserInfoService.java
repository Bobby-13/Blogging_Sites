package com.spring.titans.service;

import com.spring.titans.dto.PasswordChangeDto;
import com.spring.titans.dto.PasswordUpdateDto;
import com.spring.titans.dto.TransactionDetails;
import com.spring.titans.dto.UserInfoDto;
import com.spring.titans.entity.UserInfo;
import com.spring.titans.dto.*;
import com.spring.titans.repository.UserInfoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;


public interface UserInfoService {

    boolean processOAuthPostLogin(OauthLogin oauthLogin);

    boolean AddNewUser(UserInfoDto user);

    String forgotPassword(UserInfo user);

    boolean otpVerification(String email, String otp);

    boolean ChangePassword(PasswordChangeDto passwordChangeDto);

    boolean UpdatePassword(PasswordUpdateDto passwordUpdateDto,String email);

    ResponseEntity<TransactionDetails> CreateTransaction(Double amount);

//    String userSignup(UserInfoDto userInfoDto);

    ResponseEntity<ResponseDto> afterSignup( AfterSignUpDto afterSignUpDto);

    ResponseEntity<ResponseDto> bio( UserBioDto userBioDto);

    ResponseEntity<ResponseDto> updateBio( UserDto userDto);

    ResponseEntity<ResponseDto> getUser(Long userId);

    ResponseEntity<ResponseDto> changeReader(Long userId);

    ResponseEntity<ResponseDto> myPosts(Long userId);

    ResponseEntity<ResponseDto> getAllusers();

    ResponseEntity<ResponseDto> deleteUser(Long userId);
}
