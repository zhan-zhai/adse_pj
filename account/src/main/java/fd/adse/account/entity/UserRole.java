package fd.adse.account.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;


@Entity
@Data
public class UserRole extends BaseEntity implements GrantedAuthority {

    public UserRole() {

    }

    public UserRole(User user, String authority) {
        this.authority = authority;
        this.user = user;
    }

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    @JsonIgnore
    private User user;
    @Column(nullable = false)
    private String authority;


}