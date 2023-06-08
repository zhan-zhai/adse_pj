package fd.adse.order.service;

import fd.adse.order.config.Queues;
import fd.adse.order.constant.RoleConstants;
import fd.adse.order.dao.*;
import fd.adse.order.dto.*;
import fd.adse.order.entity.*;

import fd.adse.order.utils.JsonUtils;
import org.springframework.amqp.core.AmqpTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;

import java.util.List;

@Service
public class OrderService {
    @Autowired
    private OrderDao orderDao;
    @Autowired
    private OrderItemDao orderItemDao;
    @Autowired
    private AddressDao addressDao;
    @Autowired
    private CartService cartService;
    @Autowired
    private UserService userService;
    @Autowired
    private WalletService walletService;

    @Autowired
    private CommodityService commodityService;
    @Autowired
    private AmqpTemplate rabbitTemplate;

    public String createOrderFromCommodityDetail(CreateCommodityOrderRequest request,HttpServletRequest servletRequest){
        Long userId = (Long) servletRequest.getSession().getAttribute("userId");
        GetCommodityTypeResponse commodityType = commodityService.getCommodityType(request.getTypeId()).getData();
        if(request.getQuantity() > commodityType.getAmount())
            return "库存不足";
        BigDecimal payment = commodityType.getPrice().multiply(BigDecimal.valueOf(request.getQuantity())).setScale(2, RoundingMode.HALF_UP);
        Order order = new Order(userId,payment);
        orderDao.save(order);
        Address address = addressDao.findById(request.getAddressId()).get();
        OrderItem orderItem = new OrderItem(order,commodityType.getId(),commodityType.getSellerId(),request.getQuantity(),payment,address.getAddress(),address.getReceiverName(),address.getPhoneNumber(),0);
        orderItemDao.save(orderItem);
        commodityService.decreaseCommodityType(request.getTypeId(), request.getQuantity());
        return "success";
    }

    public String createOrderFromCart(CreateCartOrderRequest request,HttpServletRequest servletRequest){

        Long userId = (Long) servletRequest.getSession().getAttribute("userId");
        Order order = new Order();
        order.setUserId(userId);
        Address address = addressDao.findById(request.getAddressId()).get();
        BigDecimal payment = new BigDecimal(0).setScale(2, RoundingMode.HALF_UP);
        for(Long cartItemId : request.getCartItemIdList()){
            GetCartItemResponse cartItem = cartService.getCartItem(cartItemId).getData();
            GetCommodityTypeResponse commodityType = commodityService.getCommodityType(cartItem.getTypeId()).getData();
            BigDecimal totalPrice = commodityType.getPrice().multiply(BigDecimal.valueOf(cartItem.getQuantity())).setScale(2, RoundingMode.HALF_UP);
            payment = payment.add(totalPrice);
            OrderItem orderItem = new OrderItem(order,commodityType.getId(),commodityType.getSellerId(),cartItem.getQuantity(),totalPrice,address.getAddress(),address.getReceiverName(),address.getPhoneNumber(),0);

            order.setPaymentAmount(payment);
            orderDao.save(order);
            orderItemDao.save(orderItem);
        }
        order.setUserId(userId);
        order.setPaymentAmount(payment);
        orderDao.save(order);

        return "success";
    }

    public List<AllOrdersResponse> allOrders(HttpServletRequest servletRequest){
        List<AllOrdersResponse> responses = new ArrayList<>();
        String auth = (String) servletRequest.getSession().getAttribute("authority");
        Long userId = (Long) servletRequest.getSession().getAttribute("userId");
        if(auth.equals(RoleConstants.USER)){
            List<Order> orderList = orderDao.findAllByUserId(userId);
            for(Order order:orderList){
                for(OrderItem orderItem : order.getOrderItems()){
                    GetCommodityTypeResponse commodityType = commodityService.getCommodityType(orderItem.getTypeId()).getData();
                    String sellerName = userService.getUserName(orderItem.getSellerId()).getData();
                    String[] address = orderItem.getAddressMerge().split(" ");
                    AllOrdersResponse response = new AllOrdersResponse(order.getId(),orderItem.getId(),sellerName,commodityType.getName(),commodityType.getType(),orderItem.getQuantity(),orderItem.getTotalPrice(),orderItem.getReceiverName(),orderItem.getPhoneNumber(),orderItem.getAddressMerge(),address[0],address[1],address[2],address[3],orderItem.getStatus());
                    responses.add(response);
                }
            }
        }
        else {
            List<OrderItem> orderItems = orderItemDao.findAllBySellerId(userId);
            for(OrderItem orderItem:orderItems){
                GetCommodityTypeResponse commodityType = commodityService.getCommodityType(orderItem.getTypeId()).getData();
                String buyerName = userService.getUserName(orderItem.getOrder().getUserId()).getData();
                String[] address = orderItem.getAddressMerge().split(" ");
                AllOrdersResponse response = new AllOrdersResponse(orderItem.getOrder().getId(),orderItem.getId(),buyerName,commodityType.getName(),commodityType.getType(),orderItem.getQuantity(),orderItem.getTotalPrice(),orderItem.getReceiverName(),orderItem.getPhoneNumber(),orderItem.getAddressMerge(),address[0],address[1],address[2],address[3],orderItem.getStatus());
                responses.add(response);
            }
        }
        return responses;
    }

    public List<AllOrdersResponse> getOrderByStatus(int status,HttpServletRequest servletRequest){

        String auth = (String) servletRequest.getSession().getAttribute("authority");
        Long userId = (Long) servletRequest.getSession().getAttribute("userId");
        List<AllOrdersResponse> responses = new ArrayList<>();

        if(auth.equals(RoleConstants.USER)){
            List<Order> orderList = orderDao.findAllByUserId(userId);
            for(Order order:orderList){
                List<OrderItem> orderItems = orderItemDao.findAllByOrderAndStatus(order,status);
                for(OrderItem orderItem : orderItems){
                    GetCommodityTypeResponse commodityType = commodityService.getCommodityType(orderItem.getTypeId()).getData();
                    String sellerName = userService.getUserName(orderItem.getSellerId()).getData();
                    String[] address = orderItem.getAddressMerge().split(" ");

                    AllOrdersResponse response = new AllOrdersResponse(order.getId(),orderItem.getId(),sellerName,commodityType.getName(),commodityType.getType(),orderItem.getQuantity(),orderItem.getTotalPrice(),orderItem.getReceiverName(),orderItem.getPhoneNumber(),orderItem.getAddressMerge(),address[0],address[1],address[2],address[3],orderItem.getStatus());

                    responses.add(response);
                }
            }
        }
        else {
            List<OrderItem> orderItems = orderItemDao.findAllBySellerIdAndStatus(userId,status);
            for(OrderItem orderItem:orderItems){
                GetCommodityTypeResponse commodityType = commodityService.getCommodityType(orderItem.getTypeId()).getData();
                String buyerName = userService.getUserName(orderItem.getOrder().getUserId()).getData();
                String[] address = orderItem.getAddressMerge().split(" ");
                AllOrdersResponse response = new AllOrdersResponse(orderItem.getOrder().getId(),orderItem.getId(),buyerName,commodityType.getName(),commodityType.getType(),orderItem.getQuantity(),orderItem.getTotalPrice(),orderItem.getReceiverName(),orderItem.getPhoneNumber(),orderItem.getAddressMerge(),address[0],address[1],address[2],address[3],orderItem.getStatus());
                responses.add(response);
            }
        }
        return responses;
    }

    public AllOrdersResponse modifyOrder(ModifyOrderRequest request,HttpServletRequest servletRequest){
        String auth = (String) servletRequest.getSession().getAttribute("authority");
        Long userId = (Long) servletRequest.getSession().getAttribute("userId");

        OrderItem orderItem = orderItemDao.findById(request.getOrderItemId()).get();

        String userName;
        if(auth.equals(RoleConstants.USER)){
            if(!orderItem.getOrder().getUserId().equals(userId))
                return null;
            userName = userService.getUserName(orderItem.getSellerId()).getData();
        }
        else {
            if(!orderItem.getSellerId().equals(userId))
                return null;
            userName = userService.getUserName(orderItem.getOrder().getUserId()).getData();
        }
        String address = request.getAddressProvince() + " " + request.getAddressCity() + " " + request.getAddressDistinct() + " " + request.getAddressDetail();
        orderItem.setAddressMerge(address);
        orderItem.setReceiverName(request.getReceiverName());
        orderItem.setPhoneNumber(request.getPhoneNumber());
        orderItemDao.save(orderItem);
        GetCommodityTypeResponse commodityType = commodityService.getCommodityType(orderItem.getTypeId()).getData();
        return new AllOrdersResponse(orderItem.getOrder().getId(),orderItem.getId(),userName,commodityType.getName(),commodityType.getType(),orderItem.getQuantity(),orderItem.getTotalPrice(),orderItem.getReceiverName(),orderItem.getPhoneNumber(),orderItem.getAddressMerge(),request.getAddressProvince(),request.getAddressCity(),request.getAddressDistinct(),request.getAddressDetail(),orderItem.getStatus());
    }

    public WalletPayRequest beforePay(Long orderItemId, HttpServletRequest request){
        OrderItem orderItem = orderItemDao.findById(orderItemId).get();
        if(orderItem.getStatus() != 0)
            return null;
        Long userId = (Long) request.getSession().getAttribute("userId");
        return new WalletPayRequest(userId,orderItemId,orderItem.getTotalPrice());
    }

    public String pay(Long orderItemId, Long accountId){

        OrderItem orderItem = orderItemDao.findById(orderItemId).get();
        orderItem.setStatus(1);
        Order order = orderItem.getOrder();

        int flag = 1;
        for(OrderItem item : order.getOrderItems()){
            if(item.getStatus() == 0) {
                flag = 0;
                break;
            }
        }
        if (flag==1) {
            order.setAccId(accountId);
            orderDao.save(order);
        }
        orderItemDao.save(orderItem);

        GetCommodityTypeResponse response = commodityService.getCommodityType(orderItem.getTypeId()).getData();
        OrderInfo info = new OrderInfo();
        info.setOrderItemId(orderItemId);
        info.setQuantity(orderItem.getQuantity());
        info.setUserId(orderItem.getSellerId());
        info.setTotalPrice(orderItem.getTotalPrice());
        info.setType(response.getType());
        info.setCommodityName(response.getName());
        info.setMsg("订单已付款，请尽快发货");
        notifyOrderInfo(info);
        return "success";
    }

    public String cancelOrder(Long orderItemId,HttpServletRequest servletRequest){
        String auth = (String) servletRequest.getSession().getAttribute("authority");
        Long userId = (Long) servletRequest.getSession().getAttribute("userId");
        OrderItem orderItem = orderItemDao.findById(orderItemId).get();
        if(auth.equals(RoleConstants.USER)){
            if(!orderItem.getOrder().getUserId().equals(userId))
                return "failure";
        }
        else {
            if(!orderItem.getSellerId().equals(userId))
                return "failure";
        }
        orderItem.setStatus(4);
        Order order = orderItem.getOrder();
        order.setPaymentAmount(order.getPaymentAmount().subtract(orderItem.getTotalPrice()).setScale(2,RoundingMode.HALF_UP));
        orderDao.save(order);
        orderItemDao.save(orderItem);
        commodityService.cancelOrder(orderItem.getTypeId(),orderItem.getQuantity());
        return "success";
    }

    public GetOrderItemResponse getOrderItem(Long id){
        OrderItem orderItem = orderItemDao.findById(id).get();
        GetOrderItemResponse getOrderItemResponse = new GetOrderItemResponse();
        getOrderItemResponse.setTotalPrice(orderItem.getTotalPrice());
        getOrderItemResponse.setSellerId(orderItem.getSellerId());
        return getOrderItemResponse;
    }

    public String confirmOrder(Long orderItemId){
        OrderItem orderItem = orderItemDao.findById(orderItemId).get();
        if (orderItem.getStatus() == 2){
            orderItem.setStatus(3);
            GetCommodityTypeResponse response = commodityService.getCommodityType(orderItem.getTypeId()).getData();
            OrderInfo info = new OrderInfo();
            info.setOrderItemId(orderItemId);
            info.setQuantity(orderItem.getQuantity());
            info.setUserId(orderItem.getSellerId());
            info.setTotalPrice(orderItem.getTotalPrice());
            info.setType(response.getType());
            info.setCommodityName(response.getName());
            info.setMsg("订单已确认收货");
            notifyOrderInfo(info);
            orderItemDao.save(orderItem);
            WalletPayRequest request = new WalletPayRequest(orderItem.getSellerId(),orderItemId,orderItem.getTotalPrice());
            walletService.confirm(request);
            return "success";
        }
        return "failure";
    }

    public void notifyOrderPayed(OrderInfo info){
        String infoJson = JsonUtils.object2Json(info);
        rabbitTemplate.convertAndSend(Queues.queuePay,infoJson);
    }

    public void notifyOrderInfo(OrderInfo info){
        String infoJson = JsonUtils.object2Json(info);
        rabbitTemplate.convertAndSend(Queues.queueOrder,infoJson);
    }

    public void notifyOrderConfirmed(OrderInfo info){
        String infoJson = JsonUtils.object2Json(info);
        rabbitTemplate.convertAndSend(Queues.queueConfirm,infoJson);
    }

    public OrderItem deliverOrder(Long orderItemId, String companyName){
        OrderItem orderItem = orderItemDao.findById(orderItemId).get();
        if(orderItem.getStatus() != 1)
            return null;
        orderItem.setDeliveryInfo(companyName + "已送达");
        orderItem.setStatus(2);
        orderItemDao.save(orderItem);
        GetCommodityTypeResponse response = commodityService.getCommodityType(orderItem.getTypeId()).getData();
        OrderInfo info = new OrderInfo();
        info.setOrderItemId(orderItemId);
        info.setQuantity(orderItem.getQuantity());
        info.setUserId(orderItem.getOrder().getUserId());
        info.setTotalPrice(orderItem.getTotalPrice());
        info.setType(response.getType());
        info.setCommodityName(response.getName());
        info.setMsg("订单已发货，请留意物流信息");
        notifyOrderInfo(info);
        return orderItem;
    }

    public void notifyOrderDelivered(OrderInfo info){
        String infoJson = JsonUtils.object2Json(info);
        rabbitTemplate.convertAndSend(Queues.queueDeliver,infoJson);
    }
}
