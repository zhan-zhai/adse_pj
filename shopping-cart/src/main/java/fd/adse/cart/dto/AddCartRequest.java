package fd.adse.cart.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AddCartRequest {
    private Long typeId;
    private int quantity;
}
