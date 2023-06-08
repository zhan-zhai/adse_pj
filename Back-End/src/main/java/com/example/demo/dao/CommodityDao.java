package com.example.demo.dao;

import com.example.demo.entity.Commodity;
import com.example.demo.entity.User;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;


public interface CommodityDao extends PagingAndSortingRepository<Commodity, Long>, JpaSpecificationExecutor<Commodity> {

}