package fd.adse.commodity.dao;

import fd.adse.commodity.entity.CommodityType;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface CommodityTypeDao extends PagingAndSortingRepository<CommodityType, Long>, JpaSpecificationExecutor<CommodityType> {
}
