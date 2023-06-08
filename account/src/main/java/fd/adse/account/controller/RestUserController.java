package fd.adse.account.controller;

import com.github.wenhao.jpa.Specifications;
import com.google.common.base.Strings;
import fd.adse.account.constant.ErrorCodeConstants;
import fd.adse.account.dao.UserDao;
import fd.adse.account.entity.User;
import fd.adse.account.exception.ErrorCodeException;
import fd.adse.account.model.BaseResponse;
import fd.adse.account.model.RestCreateUserRequest;
import fd.adse.account.service.RestUserService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import java.util.List;
import java.util.Optional;
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
@RequestMapping("/api/accountManagement/")
@PreAuthorize("hasAnyRole('ROLE_ADMIN')")
@Api(tags = "用户管理")
public class RestUserController {

    @Autowired
    private UserDao userDao;

    @Autowired
    private RestUserService restUserService;


    @GetMapping("/users")
    @ApiOperation("获取所有，分页")
    public BaseResponse<Page<List<User>>> retrieveAll(
        @RequestParam(required = false) Long id,
        @RequestParam(required = false) String username,
        @PageableDefault Pageable pageable
    ) {
        Specification<User> specification = Specifications.<User>and()
//            .eq(Strings.isNullOrEmpty(nameContain), "name", nameContain)
//            .gt(Objects.nonNull(request.getAge()), "age", 18)
//            .between("birthday", new Date(), new Date())
            .eq(id != null, "id", id)
            .like(!Strings.isNullOrEmpty(username), "username", "%" + username + "%")
            .build();
        return new BaseResponse(userDao.findAll(specification, pageable), "获取列表成功!");
    }

    @GetMapping("/users/{id}")
    @ApiOperation("获取单个")
    public BaseResponse<User> retrieve(@PathVariable long id) {
        Optional<User> o = userDao.findById(id);
        if (!o.isPresent()) {
            throw new ErrorCodeException(ErrorCodeConstants.YZ_401);
        }
        return new BaseResponse(o.get(), "获取实体成功！");
    }

    @DeleteMapping("/users/{id}")
    @ApiOperation("删除")
    public BaseResponse delete(@PathVariable long id) {
        userDao.deleteById(id);
        return new BaseResponse("删除实体成功！");
    }

    @PostMapping("/users")
    @ApiOperation("新增")
    public BaseResponse<User> create(@RequestBody RestCreateUserRequest o) {
        return new BaseResponse(restUserService.restAddUser(o), "新增实体成功！");
    }

    @PutMapping("/users/{id}")
    @ApiOperation("修改")
    public BaseResponse<User> update(@RequestBody User o, @PathVariable long id) {

        Optional<User> oOptional = userDao.findById(id);
        if (!oOptional.isPresent()) {
            throw new ErrorCodeException(ErrorCodeConstants.YZ_401);
        }
        o.setId(id);
        return new BaseResponse(userDao.save(o), "修改实体成功！");
    }

}
