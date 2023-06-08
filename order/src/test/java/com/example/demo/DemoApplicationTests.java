package com.example.demo;

import fd.adse.order.OrderApplication;
import fd.adse.order.dto.OrderInfo;
import fd.adse.order.utils.JsonUtils;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import java.math.BigDecimal;

@SpringBootTest(classes = OrderApplication.class)
class DemoApplicationTests {

    @Test
    void contextLoads() {
        OrderInfo info = new OrderInfo();
        info.setOrderItemId(1L);
        info.setQuantity(1);
        info.setUserId(1L);
        info.setTotalPrice(BigDecimal.valueOf(10));
        info.setType("xl");
        info.setCommodityName("衣服");
        info.setMsg("订单已发货，请留意物流信息");
        String infoJson = JsonUtils.object2Json(info);
        System.out.println(infoJson);
    }
}
