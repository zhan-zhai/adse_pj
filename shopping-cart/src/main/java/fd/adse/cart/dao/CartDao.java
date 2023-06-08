package fd.adse.cart.dao;

import fd.adse.cart.entity.Cart;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface CartDao extends PagingAndSortingRepository<Cart, Long>, JpaSpecificationExecutor<Cart> {
    Cart findCartByUserId(Long userId);
}
