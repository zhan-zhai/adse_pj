package fd.adse.account.controller;

import com.google.common.base.Preconditions;
import fd.adse.account.entity.User;
import fd.adse.account.model.BaseResponse;
import fd.adse.account.model.PasswordLoginRequest;
import fd.adse.account.model.RegisterRequest;
import fd.adse.account.service.UserService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiModelProperty;
import io.swagger.annotations.ApiOperation;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.WebSession;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

@RestController
@Api(tags = "用户相关")
public class UserController {

    @Autowired
    UserService userService;

    @PostMapping("/api/account/register")
    @ApiOperation("注册用户")
    public BaseResponse userRegisterService(@RequestBody RegisterRequest request) {
        Preconditions.checkNotNull(request.getUsername(), "用户名不能为空");
        Preconditions.checkNotNull(request.getPassword(), "密码不可为空");

        User user = userService.registerUser(
            request
        );
        return new BaseResponse<>(user, "注册成功");
    }

    @PostMapping("/api/account/login")
    @ApiOperation("用户登录")
    public BaseResponse userLogin(@RequestBody PasswordLoginRequest request, HttpServletRequest servletRequest) {
        Preconditions.checkNotNull(request.getUsername(), "用户名不能为空");
        Preconditions.checkNotNull(request.getPassword(), "密码不可为空");

        User user = userService.authenticateAdminPassword(
            request
        );
        HttpSession session = servletRequest.getSession();
        session.setAttribute("userId",user.getId());
        session.setAttribute("authority",user.getAuthorities().iterator().next().getAuthority());
        return new BaseResponse<>(user, "登录成功");
    }

    @GetMapping("/api/account/me")
    @ApiOperation("用户获取登录信息")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER', 'ROLE_SELLER')")
    public BaseResponse userGetMe() {
        return new BaseResponse<>(userService.getMe(), "获取自己的登录信息");
    }

    @GetMapping("/api/account/username/{id}")
    @ApiOperation("获取用户名")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER', 'ROLE_SELLER')")
    public BaseResponse<String> getUserName(@PathVariable Long id){
        return new BaseResponse<>(userService.getUserName(id),"success");
    }
}
