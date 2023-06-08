package fd.adse.order.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;

@Entity
@Getter
@Setter
public class Address extends BaseEntity{

    private Long userId;
    private String receiverName;
    private String phoneNumber;
    private String addressProvince;
    private String addressCity;
    private String addressDistinct;
    private String addressDetail;

    public Address() {
    }

    public Address(Long userId, String receiverName, String phoneNumber, String addressProvince, String addressCity, String addressDistinct, String addressDetail) {
        this.userId = userId;
        this.receiverName = receiverName;
        this.phoneNumber = phoneNumber;
        this.addressProvince = addressProvince;
        this.addressCity = addressCity;
        this.addressDistinct = addressDistinct;
        this.addressDetail = addressDetail;
    }

    public String getAddress() {
        return addressProvince + " " + addressCity + " " + addressDistinct + " " + addressDetail;
    }
}
