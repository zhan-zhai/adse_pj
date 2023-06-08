package fd.adse.cart.entity;

import com.google.common.collect.Sets;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Set;

@Entity
@Getter
@Setter
public class Cart extends BaseEntity{
    @Column(unique = true)
    private Long userId;

    @OneToMany(mappedBy = "cart", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private Set<CartItem> cartItems = Sets.newHashSet();

    public Cart() {
    }

    public Cart(Long userId) {
        this.userId = userId;
    }
}
