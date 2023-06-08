package fd.adse.order.service;

import fd.adse.order.dto.CreateAddressRequest;
import fd.adse.order.dao.AddressDao;
import fd.adse.order.entity.Address;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@Service
public class AddressService {
    @Autowired
    private AddressDao addressDao;

    public String createAddress(CreateAddressRequest request, HttpServletRequest servletRequest){
        Long userId = (Long) servletRequest.getSession().getAttribute("userId");
        Address address = new Address(userId,request.getReceiverName(),request.getPhoneNumber(),request.getAddressProvince(),request.getAddressCity(),request.getAddressDistinct(),request.getAddressDetail());
        addressDao.save(address);
        return "success";
    }

    public List<Address> getAddress(HttpServletRequest servletRequest){
        Long userId = (Long) servletRequest.getSession().getAttribute("userId");

        return addressDao.findAllByUserId(userId);
    }

    public String modifyAddress(Address address){
        addressDao.save(address);
        return "success";
    }
}
