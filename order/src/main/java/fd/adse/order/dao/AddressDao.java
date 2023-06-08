package fd.adse.order.dao;

import fd.adse.order.entity.Address;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;

public interface AddressDao extends PagingAndSortingRepository<Address, Long>, JpaSpecificationExecutor<Address> {
    List<Address> findAllByUserId(Long userId);
}
