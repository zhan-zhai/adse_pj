package fd.adse.order.service;

import fd.adse.order.dto.WalletPayRequest;
import fd.adse.order.dto.BaseResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;

import java.math.BigDecimal;

@FeignClient("wallet")
public interface WalletService {
    @PutMapping("/api/wallet/pay")
    BaseResponse<BigDecimal> pay(WalletPayRequest request);

    @GetMapping("/api/wallet/walletId/{userId}")
    BaseResponse<Long> getWalletId(@PathVariable Long userId);

    @PutMapping("/api/wallet/confirmation")
    BaseResponse<BigDecimal> confirm(WalletPayRequest request);
}
