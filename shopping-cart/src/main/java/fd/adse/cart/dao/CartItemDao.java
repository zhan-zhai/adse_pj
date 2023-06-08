package fd.adse.cart.dao;

import fd.adse.cart.entity.CartItem;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface CartItemDao extends PagingAndSortingRepository<CartItem, Long>, JpaSpecificationExecutor<CartItem> {
}
