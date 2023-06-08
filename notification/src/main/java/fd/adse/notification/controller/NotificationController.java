package fd.adse.notification.controller;

import fd.adse.notification.entity.OrderInfo;
import fd.adse.notification.service.NotificationService;
import fd.adse.notification.utils.BaseResponse;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/notification/")
@Api(tags = "通知管理")
public class NotificationController {
    @Autowired
    private NotificationService notificationService;

    @PutMapping("/orderInfo/{id}")
    @ApiOperation("确认消息")
    @PreAuthorize("hasAnyRole('ROLE_SELLER','ROLE_ADMIN', 'ROLE_USER')")
    public BaseResponse<OrderInfo> processInfo(@PathVariable Long id){
        return new BaseResponse<>(notificationService.processMsg(id));
    }
}
