package fd.adse.notification.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.math.BigDecimal;
import java.sql.Timestamp;

@Entity
@Getter
@Setter
public class OrderInfo{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @CreationTimestamp
    @Column(updatable = false, nullable = false)
    @JsonIgnore
//    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
//    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private Timestamp createAt;

    @UpdateTimestamp
    @JsonIgnore
//    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
//    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    @Column(nullable = false)
    private Timestamp updateAt;

    private Long orderItemId;
    private Long userId;
    private String commodityName;
    private String type;
    private BigDecimal totalPrice;
    private int quantity;
    private int status;
    private String msg;
}
