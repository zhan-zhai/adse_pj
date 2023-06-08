package fd.adse.wallet.controller;

import fd.adse.wallet.dto.BaseResponse;
import fd.adse.wallet.dto.WalletPayRequest;
import fd.adse.wallet.service.WalletService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.math.BigDecimal;

@RestController
@RequestMapping("/api/wallet/")
@Api(tags = "钱包管理")
public class WalletController {
    @Autowired
    private WalletService walletService;

    @PutMapping("/recharge/{amount}")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER','ROLE_SELLER')")
    @ApiOperation("钱包充值")
    public BaseResponse<BigDecimal> recharge(@PathVariable int amount,HttpServletRequest servletRequest){
        return new BaseResponse<>(walletService.recharge(amount,servletRequest),"success");
    }

    @PutMapping("/pay")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN','ROLE_USER','ROLE_SELLER')")
    @ApiOperation("账户付款")
    public BaseResponse<BigDecimal> pay(@RequestBody WalletPayRequest request, HttpServletRequest servletRequest){
//        System.out.println(headers.get(HttpHeaders.COOKIE));
//        System.out.println(servletRequest.getSession().getAttribute("userId"));
        return new BaseResponse<>(walletService.pay(request,servletRequest));
    }

    @PostMapping("/createWallet")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER','ROLE_SELLER')")
    @ApiOperation("创建钱包")
    public BaseResponse<BigDecimal> createAccount(HttpServletRequest servletRequest){
        BigDecimal res = walletService.createAccount(servletRequest);
        return res==null?new BaseResponse<>("failure"):new BaseResponse<>(res,"success");
    }

    @GetMapping("/getWallet")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER','ROLE_SELLER')")
    @ApiOperation("查看钱包余额")
    public BaseResponse<BigDecimal> getAccount(HttpServletRequest servletRequest){

        return new BaseResponse<>(walletService.getAccount(servletRequest),"success");
    }

    @GetMapping("/walletId/{userId}")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER','ROLE_SELLER')")
    @ApiOperation("获取钱包id")
    public BaseResponse<Long> getWalletId(@PathVariable Long userId){
        return new BaseResponse<>(walletService.getWalletId(userId));
    }

    @PutMapping("/confirmation")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER','ROLE_SELLER')")
    @ApiOperation("订单确认商家收款")
    BaseResponse<BigDecimal> confirm(@RequestBody WalletPayRequest request){
        return new BaseResponse<>(walletService.confirm(request));
    }
}
