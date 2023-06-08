package fd.adse.cart.service;

import fd.adse.cart.dto.BaseResponse;
import fd.adse.cart.dto.GetCommodityTypeResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;

@FeignClient("commodity")
public interface CommodityService {
    @GetMapping("/api/commodityManagement/commodityType/{id}")
    BaseResponse<GetCommodityTypeResponse> getCommodityType(@PathVariable Long id);

    @PutMapping("/api/commodityManagement/orderCommodityType/{id}/{quantity}")
    BaseResponse<String> decreaseCommodityType(@PathVariable Long id,@PathVariable int quantity);
}
