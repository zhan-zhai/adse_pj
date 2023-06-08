package fd.adse.cart.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class GetCartItemResponse {
    private Long typeId;
    private int quantity;
}
