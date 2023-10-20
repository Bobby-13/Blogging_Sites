package com.spring.titans.service;

import com.spring.titans.dto.AdminApproveDto;
import com.spring.titans.dto.ResponseDto;
import org.springframework.http.ResponseEntity;

public interface AdminService {
    ResponseEntity<ResponseDto> adminInbox();

    ResponseEntity<ResponseDto> adminApprovePost(AdminApproveDto adminApproveDto);

}
