package fd.adse.commodity.service;

import fd.adse.commodity.dao.CommodityTypeDao;
import fd.adse.commodity.dto.GetCommodityTypeResponse;
import fd.adse.commodity.entity.CommodityType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import java.math.BigDecimal;

@Service
public class CommodityService {
    @Autowired
    private CommodityTypeDao commodityTypeDao;

    public GetCommodityTypeResponse getCommodityType(Long id){
        CommodityType commodityType = commodityTypeDao.findById(id).get();
        GetCommodityTypeResponse getCommodityTypeResponse = new GetCommodityTypeResponse();
        getCommodityTypeResponse.setId(id);
        getCommodityTypeResponse.setType(commodityType.getType());
        getCommodityTypeResponse.setAmount(commodityType.getAmount());
        getCommodityTypeResponse.setName(commodityType.getCommodity().getName());
        getCommodityTypeResponse.setPrice(BigDecimal.valueOf(commodityType.getPrice()));
        getCommodityTypeResponse.setSellerId(commodityType.getCommodity().getSellerId());
        return getCommodityTypeResponse;
    }

    public String decreaseCommodityType(Long id,int quantity){
        CommodityType commodityType = commodityTypeDao.findById(id).get();
        commodityType.setAmount(commodityType.getAmount() - quantity);
        commodityTypeDao.save(commodityType);
        return "success";
    }

    public String cancelOrder(Long id,int quantity){
        CommodityType commodityType = commodityTypeDao.findById(id).get();
        commodityType.setAmount(commodityType.getAmount() + quantity);
        commodityTypeDao.save(commodityType);
        return "success";
    }
}
