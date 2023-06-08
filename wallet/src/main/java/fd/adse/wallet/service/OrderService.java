package fd.adse.wallet.service;

import fd.adse.wallet.dto.BaseResponse;
import fd.adse.wallet.dto.GetOrderItemResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient("order")
public interface OrderService {
    @GetMapping("/api/order/orderItem/{id}")
    BaseResponse<GetOrderItemResponse> getOrderItem(@PathVariable Long id);
}
