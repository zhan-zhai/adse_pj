package fd.adse.account.utils;

import com.google.common.base.Preconditions;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;

public class UserUtil {

    public static Authentication getCurrentAuthentication() {
        SecurityContext securityContext = SecurityContextHolder.getContext();
        Preconditions.checkNotNull(securityContext);
        Authentication authentication = securityContext.getAuthentication();
        Preconditions.checkNotNull(authentication);
        return authentication;
    }

    public static User getCurrentUser() {
        return (User) getCurrentAuthentication().getDetails();
    }

}
