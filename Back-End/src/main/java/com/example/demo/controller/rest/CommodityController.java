package com.example.demo.controller.rest;

import com.example.demo.constant.ErrorCodeConstants;
import com.example.demo.dao.CommodityDao;
import com.example.demo.dao.CommodityTypeDao;
import com.example.demo.entity.Commodity;
import com.example.demo.entity.CommodityType;
import com.example.demo.exception.ErrorCodeException;
import com.example.demo.model.BaseResponse;
import com.github.wenhao.jpa.Specifications;
import com.google.common.base.Strings;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.web.PageableDefault;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/api/management/")
@PreAuthorize("hasAnyRole('ROLE_SELLER','ROLE_ADMIN')")
@Api(tags = "商品管理")
public class CommodityController {

    @Autowired
    private CommodityDao commodityDao;
    @Autowired
    private CommodityTypeDao commodityTypeDao;

    @GetMapping("/commodities_all")
    @ApiOperation("获取所有,不分页")
    @PreAuthorize("hasAnyRole('ROLE_SELLER','ROLE_ADMIN', 'ROLE_USER')")
    public BaseResponse<List<Commodity>> retrieveAll(
        @RequestParam(required = false) String name
    ) {
        Specification<Commodity> specification = Specifications.<Commodity>and()
//            .eq(Strings.isNullOrEmpty(nameContain), "name", nameContain)
//            .gt(Objects.nonNull(request.getAge()), "age", 18)
//            .between("birthday", new Date(), new Date())
            .like(!Strings.isNullOrEmpty(name), "name", "%" + name + "%")
            .build();
        return new BaseResponse(commodityDao.findAll(specification), "获取列表成功!");
    }

    @GetMapping("/commodities")
    @ApiOperation("获取所有，分页")
    @PreAuthorize("hasAnyRole('ROLE_SELLER','ROLE_ADMIN', 'ROLE_USER')")
    public BaseResponse<Page<List<Commodity>>> retrieveAll(
        @RequestParam(required = false) Long id,
        @RequestParam(required = false) String name,
        @RequestParam(required = false) String introduction,
        @PageableDefault Pageable pageable
    ) {
        Specification<Commodity> specification = Specifications.<Commodity>and()
//            .eq(Strings.isNullOrEmpty(nameContain), "name", nameContain)
//            .gt(Objects.nonNull(request.getAge()), "age", 18)
//            .between("birthday", new Date(), new Date())
            .eq(id != null, "id", id)
            .like(!Strings.isNullOrEmpty(name), "name", "%" + name + "%")
            .like(!Strings.isNullOrEmpty(introduction), "introduction", "%" + name + "%")
            .build();
        return new BaseResponse(commodityDao.findAll(specification, pageable), "获取列表成功!");
    }

    @GetMapping("/commodities/{id}")
    @ApiOperation("获取单个")
    public BaseResponse<Commodity> retrieve(@PathVariable long id) {
        Optional<Commodity> o = commodityDao.findById(id);
        if (!o.isPresent()) {
            throw new ErrorCodeException(ErrorCodeConstants.YZ_401);
        }
        return new BaseResponse<>(o.get(), "获取实体成功！");
    }

    @DeleteMapping("/commodities/{id}")
    @ApiOperation("删除")
    @PreAuthorize("hasAnyRole('ROLE_SELLER','ROLE_ADMIN')")
    public BaseResponse delete(@PathVariable long id) {
        commodityDao.deleteById(id);
        return new BaseResponse("删除实体成功！");
    }

    @PostMapping("/commodities")
    @ApiOperation("新增")
    @PreAuthorize("hasAnyRole('ROLE_SELLER','ROLE_ADMIN')")
    public BaseResponse<Commodity> create(@RequestBody Commodity o) {
        Commodity commodity = new Commodity(o.getName(),o.getIntroduction(),o.getSellerId());
        commodityDao.save(commodity);
        Set<CommodityType> commodityTypes = o.getCommodityTypes();
        for(CommodityType type :commodityTypes){
            CommodityType commodityType = new CommodityType(type.getType(),type.getImage(),type.getAmount(),type.getPrice(),commodity);
            commodityTypeDao.save(commodityType);
        }

        return new BaseResponse<>(commodity, "新增实体成功！");
    }

    @PutMapping("/commodities/{id}")
    @ApiOperation("修改")
    @PreAuthorize("hasAnyRole('ROLE_SELLER','ROLE_ADMIN')")
    public BaseResponse<Commodity> update(@RequestBody Commodity o, @PathVariable long id) {

        Optional<Commodity> oOptional = commodityDao.findById(id);
        if (!oOptional.isPresent()) {
            throw new ErrorCodeException(ErrorCodeConstants.YZ_401);
        }
        o.setId(id);
        Set<CommodityType> commodityTypes = o.getCommodityTypes();
        for(CommodityType type :commodityTypes){
            type.setCommodity(o);
        }
        return new BaseResponse<>(commodityDao.save(o), "修改实体成功！");
    }

}
