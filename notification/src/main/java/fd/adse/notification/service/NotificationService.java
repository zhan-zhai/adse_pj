package fd.adse.notification.service;

import fd.adse.notification.config.Queues;
import fd.adse.notification.dao.OrderInfoDao;
import fd.adse.notification.entity.OrderInfo;
import fd.adse.notification.utils.JsonUtils;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
public class NotificationService {
    @Autowired
    private OrderInfoDao orderInfoDao;

    public List<String> getUnprocessedMsg(Long userId){
        List<String> res = new ArrayList<>();
        List<OrderInfo> infos = orderInfoDao.findAllByUserId(userId);
        if (infos == null)
            return null;
        for(OrderInfo info:infos){
            if (info.getStatus() == 0)
                res.add(JsonUtils.object2Json(info));
        }
        return res;
    }

    @RabbitListener(queues = Queues.queueOrder)
    public void notifyOrderInfo(String infoJson) throws IOException {
        OrderInfo orderInfo = JsonUtils.json2Object(infoJson,OrderInfo.class);
        orderInfoDao.save(orderInfo);
        WebSocketServer.sendToUser(orderInfo.getUserId(), infoJson);
    }


    public String processMsg(Long infoId){
        OrderInfo info = orderInfoDao.findById(infoId).get();
        info.setStatus(1);
        orderInfoDao.save(info);
        return "success";
    }
}
