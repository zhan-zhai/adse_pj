package fd.adse.cart.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;


@Entity
@Getter
@Setter
public class CartItem extends BaseEntity{

    private Long typeId;
    private int quantity;

    @ManyToOne
    @JoinColumn(name = "cart_id", referencedColumnName = "id")
    @JsonIgnore
    private Cart cart;

    public CartItem() {
    }

    public CartItem(Long typeId, int quantity, Cart cart) {
        this.typeId = typeId;
        this.quantity = quantity;
        this.cart = cart;
    }
}
