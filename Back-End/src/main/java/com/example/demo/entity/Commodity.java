package com.example.demo.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.google.common.collect.Sets;
import io.swagger.annotations.ApiModelProperty;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.OneToMany;
import javax.persistence.OrderColumn;
import lombok.Getter;
import lombok.Setter;


@Entity
@Getter
@Setter
public class Commodity extends BaseEntity {

    @Column(unique = true)
    private String name;
    private String introduction;
    private Long sellerId;

    @OneToMany(mappedBy = "commodity", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private Set<CommodityType> commodityTypes = Sets.newHashSet();

    public Commodity() {
    }

    public Commodity(String name, String introduction, Long sellerId) {
        this.name = name;
        this.introduction = introduction;
        this.sellerId = sellerId;
    }
}
