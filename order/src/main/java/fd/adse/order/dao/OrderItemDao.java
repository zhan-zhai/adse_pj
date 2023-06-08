package fd.adse.order.dao;

import fd.adse.order.entity.Order;
import fd.adse.order.entity.OrderItem;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;

public interface OrderItemDao extends PagingAndSortingRepository<OrderItem,Long>, JpaSpecificationExecutor<OrderItem> {
    List<OrderItem> findAllBySellerId(Long sellerId);
    List<OrderItem> findAllBySellerIdAndStatus(Long sellerId, int status);
    List<OrderItem> findAllByOrderAndStatus(Order order, int status);
}
