package fd.adse.delivery.service;

import fd.adse.delivery.dao.CompanyDao;
import fd.adse.delivery.dto.CompanyRegisterRequest;
import fd.adse.delivery.entity.Company;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;


@Service
public class DeliveryService {
    @Autowired
    private CompanyDao companyDao;

    public String companyRegister(CompanyRegisterRequest request){
        Company company = new Company(request.getName(),request.getIntro());
        companyDao.save(company);
        return "success";
    }

    public List<Company> getCompany(){
        return (List<Company>) companyDao.findAll();
    }
}
