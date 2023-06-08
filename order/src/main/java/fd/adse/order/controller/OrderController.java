package fd.adse.order.controller;

import fd.adse.order.dto.*;
import fd.adse.order.entity.Order;
import fd.adse.order.entity.OrderItem;
import fd.adse.order.service.OrderService;
import fd.adse.order.service.WalletService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/order/")
@Api(tags = "订单管理")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @Autowired
    WalletService walletService;

    @PostMapping("/createOrderFromCommodityDetail")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER','ROLE_SELLER')")
    @ApiOperation("商品详情创建订单")
    public BaseResponse<Order> createOrderFromCommodityDetail(@RequestBody CreateCommodityOrderRequest request,HttpServletRequest servletRequest){
        return new BaseResponse<>(orderService.createOrderFromCommodityDetail(request,servletRequest));
    }

    @PostMapping("/createOrderFromCart")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER','ROLE_SELLER')")
    @ApiOperation("购物车创建订单")
    public BaseResponse<Order> createOrderFromCart(@RequestBody CreateCartOrderRequest request,HttpServletRequest servletRequest){
        return new BaseResponse<>(orderService.createOrderFromCart(request,servletRequest));
    }

    @GetMapping("/allOrders")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER','ROLE_SELLER')")
    @ApiOperation("查看订单")
    public BaseResponse<List<AllOrdersResponse>> allOrders(HttpServletRequest servletRequest){
        return new BaseResponse<>(orderService.allOrders(servletRequest),"success");
    }

    @GetMapping("/getOrderByStatus/{status}")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER','ROLE_SELLER')")
    @ApiOperation("根据状态查询订单")
    public BaseResponse<List<AllOrdersResponse>> getOrderByStatus(@PathVariable int status,HttpServletRequest servletRequest){
        return new BaseResponse<>(orderService.getOrderByStatus(status,servletRequest),"success");
    }

    @PutMapping("/modifyOrder")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER','ROLE_SELLER')")
    @ApiOperation("修改订单")
    public BaseResponse<AllOrdersResponse> modifyOrder(@RequestBody ModifyOrderRequest request,HttpServletRequest servletRequest){
        AllOrdersResponse response = orderService.modifyOrder(request,servletRequest);
        return response == null ? new BaseResponse<>("400", null,"failure") :
                new BaseResponse<>(response,"success");
    }

    @DeleteMapping("/cancelOrder/{orderItemId}")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER','ROLE_SELLER')")
    @ApiOperation("取消订单")
    public BaseResponse<Order> cancelOrder(@PathVariable Long orderItemId,HttpServletRequest servletRequest){
        return new BaseResponse<>(orderService.cancelOrder(orderItemId,servletRequest));
    }

    @PutMapping("/pay/{orderItemId}")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER','ROLE_SELLER')")
    @ApiOperation("订单付款")
    public BaseResponse<Order> pay(@PathVariable Long orderItemId, HttpServletRequest servletRequest){
        WalletPayRequest payRequest = orderService.beforePay(orderItemId,servletRequest);
        if(payRequest == null)
            return new BaseResponse<>("failure");
        BaseResponse<BigDecimal> result = walletService.pay(payRequest);
        String msg = result.getMsg();
        if(!"success".equals(msg))
            return new BaseResponse<>(msg);
        return new BaseResponse<>(orderService.pay(orderItemId, payRequest.getUserId()));
    }

    @GetMapping("/orderItem/{id}")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER','ROLE_SELLER')")
    @ApiOperation("获取单个订单信息")
    BaseResponse<GetOrderItemResponse> getOrderItem(@PathVariable Long id){
        return new BaseResponse<>(orderService.getOrderItem(id));
    }

    @PutMapping("/confirmation/{orderItemId}")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
    @ApiOperation("确认订单")
    BaseResponse<OrderItem> confirmOrder(@PathVariable Long orderItemId){
        return new BaseResponse<>(orderService.confirmOrder(orderItemId));
    }

    @GetMapping("/delivery/{orderItemId}/{companyName}")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER','ROLE_SELLER')")
    @ApiOperation("订单发货")
    BaseResponse<OrderItem> deliverOrder(@PathVariable Long orderItemId, @PathVariable String companyName){
        OrderItem orderItem = orderService.deliverOrder(orderItemId,companyName);
        if(orderItem == null)
            return new BaseResponse<>("订单未付款");
        return new BaseResponse<>(orderService.deliverOrder(orderItemId,companyName),"success");
    }
}
