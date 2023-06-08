package fd.adse.order.dao;

import fd.adse.order.entity.Order;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;
import java.util.Optional;

public interface OrderDao extends PagingAndSortingRepository<Order,Long>, JpaSpecificationExecutor<Order> {
    List<Order> findAllByUserId(Long userId);
}
