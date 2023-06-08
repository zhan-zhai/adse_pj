package fd.adse.order.service;

import fd.adse.order.dto.BaseResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient("account")
public interface UserService {
    @GetMapping("/api/account/username/{id}")
    BaseResponse<String> getUserName(@PathVariable Long id);
}
