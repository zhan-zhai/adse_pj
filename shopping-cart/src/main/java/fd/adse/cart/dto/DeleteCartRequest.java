package fd.adse.cart.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class DeleteCartRequest {
    private List<Long> cartItemIdList;
}
