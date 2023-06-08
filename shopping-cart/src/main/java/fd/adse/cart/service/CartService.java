package fd.adse.cart.service;

import com.google.common.collect.Sets;
import fd.adse.cart.dao.CartDao;
import fd.adse.cart.dao.CartItemDao;
import fd.adse.cart.dto.AddCartRequest;
import fd.adse.cart.dto.GetCartItemResponse;
import fd.adse.cart.dto.GetCartResponse;
import fd.adse.cart.dto.GetCommodityTypeResponse;
import fd.adse.cart.entity.Cart;
import fd.adse.cart.entity.CartItem;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;

@Service
public class CartService {
    @Autowired
    private CommodityService commodityService;
    @Autowired
    private CartDao cartDao;
    @Autowired
    private CartItemDao cartItemDao;

    public String addCart(AddCartRequest request, HttpServletRequest servletRequest){

        Long userId = (Long) servletRequest.getSession().getAttribute("userId");
        Cart cart = cartDao.findCartByUserId(userId);
        GetCommodityTypeResponse commodityType = commodityService.getCommodityType(request.getTypeId()).getData();
        if(commodityType.getAmount()< request.getQuantity())
            return "库存不足";
        if(cart == null){
            cart = new Cart(userId);
            cartDao.save(cart);
        }
        CartItem cartItem = new CartItem(request.getTypeId(), request.getQuantity(), cart);
        cartItemDao.save(cartItem);
        commodityService.decreaseCommodityType(request.getTypeId(),request.getQuantity());
        return "success";
    }

    public String deleteCart(List<Long> cartItemIdList,HttpServletRequest servletRequest){
        Long userId = (Long) servletRequest.getSession().getAttribute("userId");
        Cart cart = cartDao.findCartByUserId(userId);
        if(cart == null)
            return "failure";
        cartItemDao.deleteAllById(cartItemIdList);
        return "success";
    }

    public List<GetCartResponse> getCart(HttpServletRequest servletRequest){
        Long userId = (Long) servletRequest.getSession().getAttribute("userId");
        List<GetCartResponse> list = new ArrayList<>();
        Cart cart = cartDao.findCartByUserId(userId);
        if(cart == null)
            return list;
        for(CartItem item :cart.getCartItems()){
            GetCartResponse getCartResponse = new GetCartResponse();
            getCartResponse.setCartItemId(item.getId());
            GetCommodityTypeResponse response = commodityService.getCommodityType(item.getTypeId()).getData();
            getCartResponse.setType(response.getType());
            getCartResponse.setCommodityName(response.getName());
            getCartResponse.setQuantity(item.getQuantity());
            list.add(getCartResponse);
        }

        return list;
    }

    public GetCartItemResponse getCartItem(Long id){
        CartItem cartItem = cartItemDao.findById(id).get();
        GetCartItemResponse getCartItemResponse = new GetCartItemResponse();
        getCartItemResponse.setTypeId(cartItem.getTypeId());
        getCartItemResponse.setQuantity(cartItem.getQuantity());
        return getCartItemResponse;
    }
}
