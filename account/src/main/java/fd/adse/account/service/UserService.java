package fd.adse.account.service;


import com.google.common.base.Preconditions;
import com.google.common.collect.Sets;
import java.sql.Timestamp;
import java.time.Instant;
import java.util.Collection;
import java.util.HashSet;

import fd.adse.account.constant.RoleConstants;
import fd.adse.account.dao.UserDao;
import fd.adse.account.entity.User;
import fd.adse.account.entity.UserRole;
import fd.adse.account.model.PasswordLoginRequest;
import fd.adse.account.model.RegisterRequest;
import fd.adse.account.utils.UserUtil;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.context.SecurityContextImpl;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
public class UserService implements UserDetailsService {

    @Autowired
    private UserDao userDao;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userDao.findByUsername(username);
    }

    // 内置用户 username & password
    private static final String DEFAULT_USER = "admin123";
    private static final String DEFAULT_PWD = "admin123";

    @EventListener(ApplicationReadyEvent.class)
    public void init() {
        createUser(DEFAULT_USER, DEFAULT_PWD, Sets.newHashSet(RoleConstants.ADMIN));
    }

    public void createUser(String username, String password, Collection<String> authorities) {
        User user = userDao.findByUsername(username);
        if (user != null) {
            return;
        }
        user = new User();
        user.setUsername(username);
        user.setPassword(password);
        for (String authority : authorities) {
            UserRole role = new UserRole(user, authority);
            user.getRoles().add(role);
        }
        userDao.save(user);
    }

    public User authenticateAdminPassword(PasswordLoginRequest request) {
        Preconditions.checkNotNull(request.getUsername(), "用户名不能为空");
        Preconditions.checkNotNull(request.getPassword(), "密码不能为空");
        User user = userDao.findByUsername(request.getUsername());
        Preconditions.checkNotNull(user, "此用户不存在！");
        Preconditions.checkArgument(user.getPassword().equals(request.getPassword()), "密码错误！");
        UsernamePasswordAuthenticationToken authenticationToken =
            new UsernamePasswordAuthenticationToken(
                request.getUsername(),
                "",
                user.getAuthorities()
            );
        org.springframework.security.core.userdetails.User user1 = new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(), user.getAuthorities());
        authenticationToken.setDetails(user1);
        SecurityContext securityContext = new SecurityContextImpl(authenticationToken);
        SecurityContextHolder.setContext(securityContext);
        return user;
    }

    public User registerUser(RegisterRequest request) {

        // 用户名是否已经被注册 username是unique的
        Preconditions.checkArgument(userDao.findByUsername(request.getUsername()) == null, "此用户名已被注册");
        User newUser = new User();
        newUser.setUsername(request.getUsername());
        newUser.setPassword(request.getPassword());
        Collection<String> authorities = Sets.newHashSet();
        if(request.getType().equals("seller")){
            authorities.add(RoleConstants.SELLER);
        }else if(request.getType().equals("buyer")){
            authorities.add(RoleConstants.USER);
        }else{
            Preconditions.checkArgument(false, "用户类型不存在");
        }
        for (String authority : authorities) {
            UserRole role = new UserRole(newUser,authority);
            newUser.getRoles().add(role);
        }
        return userDao.save(newUser);
    }

    public User getMe() {
        org.springframework.security.core.userdetails.User user = UserUtil.getCurrentUser();
        return userDao.findByUsername(user.getUsername());
    }

    public String getUserName(Long id){
        return userDao.findById(id).get().getUsername();
    }
}
