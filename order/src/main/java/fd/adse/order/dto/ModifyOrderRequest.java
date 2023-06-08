package fd.adse.order.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ModifyOrderRequest {
    private Long orderItemId;
    private String receiverName;
    private String phoneNumber;
    private String addressProvince;
    private String addressCity;
    private String addressDistinct;
    private String addressDetail;

    public ModifyOrderRequest() {
    }

    public ModifyOrderRequest(Long orderItemId, String receiverName, String phoneNumber, String addressProvince, String addressCity, String addressDistinct, String addressDetail) {
        this.orderItemId = orderItemId;
        this.receiverName = receiverName;
        this.phoneNumber = phoneNumber;
        this.addressProvince = addressProvince;
        this.addressCity = addressCity;
        this.addressDistinct = addressDistinct;
        this.addressDetail = addressDetail;
    }
}
