package fd.adse.delivery.controller;

import fd.adse.delivery.dto.CompanyRegisterRequest;
import fd.adse.delivery.entity.Company;
import fd.adse.delivery.service.DeliveryService;
import fd.adse.delivery.utils.BaseResponse;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/delivery/")
@Api(tags = "物流管理")
public class DeliveryController {
    @Autowired
    private DeliveryService deliveryService;

    @PostMapping("/company")
    @ApiOperation("注册物流公司")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN')")
    public BaseResponse<Company> companyRegister(@RequestBody CompanyRegisterRequest request){
        return new BaseResponse<>(deliveryService.companyRegister(request));
    }

    @GetMapping("/company")
    @ApiOperation("获取所有物流公司")
    @PreAuthorize("hasAnyRole('ROLE_SELLER','ROLE_ADMIN', 'ROLE_USER')")
    public BaseResponse<List<Company>> getCompany(){
        return new BaseResponse<>(deliveryService.getCompany(),"success");
    }
}
