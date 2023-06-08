package fd.adse.wallet.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import java.math.BigDecimal;

@Entity
@Getter
@Setter
public class Wallet extends BaseEntity{
    @Column(unique = true)
    private Long userId;
    private BigDecimal balance;

    public Wallet() {
    }

    public Wallet(Long userId, BigDecimal balance) {
        this.userId = userId;
        this.balance = balance;
    }
}
