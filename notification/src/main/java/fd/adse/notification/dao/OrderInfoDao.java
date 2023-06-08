package fd.adse.notification.dao;

import fd.adse.notification.entity.OrderInfo;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface OrderInfoDao extends CrudRepository<OrderInfo,Long> {
    List<OrderInfo> findAllByUserId(Long userId);
}
