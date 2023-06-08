package fd.adse.order.dto;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class AllOrdersResponse {
    private Long orderId;
    private Long orderItemId;
    private String userName;
    private String commodityName;
    private String type;
    private int quantity;
    private BigDecimal totalPrice;
    private String receiverName;
    private String phoneNumber;
    private String addressMerge;
    private String addressProvince;
    private String addressCity;
    private String addressDistinct;
    private String addressDetail;
    private int status;

    public AllOrdersResponse(Long orderId, Long orderItemId, String userName, String commodityName, String type, int quantity, BigDecimal totalPrice, String receiverName, String phoneNumber, String addressMerge, String addressProvince, String addressCity, String addressDistinct, String addressDetail, int status) {
        this.orderId = orderId;
        this.orderItemId = orderItemId;
        this.userName = userName;
        this.commodityName = commodityName;
        this.type = type;
        this.quantity = quantity;
        this.totalPrice = totalPrice;
        this.receiverName = receiverName;
        this.phoneNumber = phoneNumber;
        this.addressMerge = addressMerge;
        this.addressProvince = addressProvince;
        this.addressCity = addressCity;
        this.addressDistinct = addressDistinct;
        this.addressDetail = addressDetail;
        this.status = status;
    }

    public AllOrdersResponse() {
    }
}
