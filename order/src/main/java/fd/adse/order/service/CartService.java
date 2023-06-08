package fd.adse.order.service;

import fd.adse.order.dto.BaseResponse;
import fd.adse.order.dto.GetCartItemResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient("shopping-cart")
public interface CartService {
    @GetMapping("/api/cart/orderCartItem/{id}")
    BaseResponse<GetCartItemResponse> getCartItem(@PathVariable Long id);
}
