package fd.adse.commodity.dao;

import fd.adse.commodity.entity.Commodity;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;


public interface CommodityDao extends PagingAndSortingRepository<Commodity, Long>, JpaSpecificationExecutor<Commodity> {

}