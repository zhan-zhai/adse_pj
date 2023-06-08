package fd.adse.cart.controller;

import fd.adse.cart.dto.*;
import fd.adse.cart.service.CartService;
import fd.adse.cart.entity.Cart;
import fd.adse.cart.entity.CartItem;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;


@RestController
@RequestMapping("/api/cart/")
@Api(tags = "购物车管理")
public class CartController {
    @Autowired
    private CartService cartService;

    @PostMapping("/addCart")
    @ApiOperation("添加购物车")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER','ROLE_SELLER')")
    public BaseResponse<Cart> addCart(@RequestBody AddCartRequest request, HttpServletRequest servletRequest){
        return new BaseResponse<>(cartService.addCart(request,servletRequest));
    }

    @DeleteMapping("/deleteCart")
    @ApiOperation("删除购物车物品")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER','ROLE_SELLER')")
    public BaseResponse<CartItem> deleteCart(@RequestBody DeleteCartRequest deleteCartRequest,HttpServletRequest servletRequest){
        return new BaseResponse<>(cartService.deleteCart(deleteCartRequest.getCartItemIdList(),servletRequest));
    }

    @GetMapping("/getCart")
    @ApiOperation("查看购物车物品")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER','ROLE_SELLER')")
    public BaseResponse<List<GetCartResponse>> getCart(HttpServletRequest servletRequest){
        return new BaseResponse<>(cartService.getCart(servletRequest),"success");
    }

    @GetMapping("/orderCartItem/{id}")
    @ApiOperation("获取单个购物车物品")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER','ROLE_SELLER')")
    public BaseResponse<GetCartItemResponse> getCartItem(@PathVariable Long id){
        return new BaseResponse<>(cartService.getCartItem(id));
    }
}
