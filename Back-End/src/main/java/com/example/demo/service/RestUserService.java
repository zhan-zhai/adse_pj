package com.example.demo.service;

import com.example.demo.constant.RoleConstants;
import com.example.demo.dao.UserDao;
import com.example.demo.entity.User;
import com.example.demo.entity.UserRole;
import com.example.demo.model.RestCreateUserRequest;
import com.google.common.base.Preconditions;
import com.google.common.collect.Sets;
import java.sql.Timestamp;
import java.time.Instant;
import java.util.Collection;
import java.util.HashSet;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RestUserService {

    @Autowired
    UserDao userDao;

    // 管理后台添加用户
    public User restAddUser(RestCreateUserRequest request) {
        Preconditions.checkNotNull(request.getUsername(), "用户名不可为空！");
        Preconditions.checkNotNull(request.getPassword(), "密码不可为空！");
        Preconditions.checkNotNull(request.getType(), "用户类型不可为空！");
        User user = userDao.findByUsername(request.getUsername());
        Preconditions.checkArgument(user == null, "用户名已经被占用！");
        user = new User();
        user.setUsername(request.getUsername());
        user.setPassword(request.getPassword());

        Collection<String> authorities = Sets.newHashSet();
        if(request.getType().equals("seller")){
            authorities.add(RoleConstants.SELLER);
        }else if(request.getType().equals("buyer")){
            authorities.add(RoleConstants.USER);
        }else{
            Preconditions.checkArgument(false, "用户类型不存在");
        }
        for (String authority : authorities) {
            UserRole role = new UserRole(user,authority);
            user.getRoles().add(role);
        }
        return userDao.save(user);
    }
}
