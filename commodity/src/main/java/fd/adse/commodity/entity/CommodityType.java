package fd.adse.commodity.entity;


import com.fasterxml.jackson.annotation.JsonIgnore;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class CommodityType extends BaseEntity {


    private String type;
    private String image;
    private Integer amount;
    private Double price;

    @ManyToOne
    @JoinColumn(name = "commodity_id", referencedColumnName = "id")
    @JsonIgnore
    private Commodity commodity;

    public CommodityType() {
    }

    public CommodityType(String type, String image, Integer amount, Double price, Commodity commodity) {
        this.type = type;
        this.image = image;
        this.amount = amount;
        this.price = price;
        this.commodity = commodity;
    }
}
