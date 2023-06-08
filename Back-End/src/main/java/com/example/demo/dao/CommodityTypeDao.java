package com.example.demo.dao;

import com.example.demo.entity.CommodityType;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface CommodityTypeDao extends PagingAndSortingRepository<CommodityType, Long>, JpaSpecificationExecutor<CommodityType> {
}
