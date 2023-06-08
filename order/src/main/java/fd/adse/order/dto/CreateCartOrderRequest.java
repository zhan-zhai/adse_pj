package fd.adse.order.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class CreateCartOrderRequest {
    private List<Long> cartItemIdList;
    private Long addressId;
}
