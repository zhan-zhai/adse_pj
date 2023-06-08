package fd.adse.cart.dto;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class GetCommodityTypeResponse {
    private Long id;
    private String type;
    private Integer amount;
    private BigDecimal price;
//    private Commodity commodity;
    private Long sellerId;
    private String name;
}
