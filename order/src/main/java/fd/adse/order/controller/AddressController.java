package fd.adse.order.controller;

import fd.adse.order.dto.BaseResponse;
import fd.adse.order.dto.CreateAddressRequest;
import fd.adse.order.entity.Address;
import fd.adse.order.service.AddressService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@RequestMapping("/api/address/")
@Api(tags = "地址管理")
public class AddressController {
    @Autowired
    private AddressService addressService;

    @PostMapping("/createAddress")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER','ROLE_SELLER')")
    @ApiOperation("新建地址")
    public BaseResponse<Address> createAddress(@RequestBody CreateAddressRequest request, HttpServletRequest servletRequest){
        return new BaseResponse<>(addressService.createAddress(request,servletRequest));
    }

    @GetMapping("/getAddress")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER','ROLE_SELLER')")
    @ApiOperation("查询地址")
    public BaseResponse<List<Address>> getAddress(HttpServletRequest servletRequest){
        return new BaseResponse<>(addressService.getAddress(servletRequest),"success");
    }

    @PutMapping("/modifyAddress")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER','ROLE_SELLER')")
    @ApiOperation("修改地址")
    public BaseResponse<Address> modifyAddress(@RequestBody Address address){
        return new BaseResponse<>(addressService.modifyAddress(address));
    }
}
