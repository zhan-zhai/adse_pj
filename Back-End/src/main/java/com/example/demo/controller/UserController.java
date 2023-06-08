package com.example.demo.controller;

import com.example.demo.entity.User;
import com.example.demo.model.BaseResponse;
import com.example.demo.model.PasswordLoginRequest;
import com.example.demo.model.RegisterRequest;
import com.example.demo.service.UserService;
import com.google.common.base.Preconditions;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiModelProperty;
import io.swagger.annotations.ApiOperation;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Api(tags = "用户相关")
public class UserController {

    @Autowired
    UserService userService;

    @PostMapping("/api/user/register")
    @ApiOperation("注册用户")
    public BaseResponse userRegisterService(@RequestBody RegisterRequest request) {
        Preconditions.checkNotNull(request.getUsername(), "用户名不能为空");
        Preconditions.checkNotNull(request.getPassword(), "密码不可为空");

        User user = userService.registerUser(
            request
        );
        return new BaseResponse<>(user, "注册成功");
    }

    @PostMapping("/api/user/login")
    @ApiOperation("用户登录")
    public BaseResponse userLogin(@RequestBody PasswordLoginRequest request) {
        Preconditions.checkNotNull(request.getUsername(), "用户名不能为空");
        Preconditions.checkNotNull(request.getPassword(), "密码不可为空");

        User user = userService.authenticateAdminPassword(
            request
        );
        return new BaseResponse<>(user, "登录成功");
    }

    @GetMapping("/api/user/me")
    @ApiOperation("用户获取登录信息")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER', 'ROLE_SELLER')")
    public BaseResponse userGetMe() {
        return new BaseResponse<>(userService.getMe(), "获取自己的登录信息");
    }

}
