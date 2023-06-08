package fd.adse.wallet.service;

import fd.adse.wallet.dao.WalletDao;
import fd.adse.wallet.dto.GetOrderItemResponse;
import fd.adse.wallet.dto.WalletPayRequest;
import fd.adse.wallet.entity.Wallet;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.math.BigDecimal;
import java.math.RoundingMode;

@Service
public class WalletService {

    @Autowired
    private WalletDao walletDao;
    @Autowired
    private OrderService orderService;

    @EventListener(ApplicationReadyEvent.class)
    public void init() {
        Wallet wallet = walletDao.findByUserId(1L);
        if(wallet !=null)
            return;
        wallet = new Wallet(1L,new BigDecimal(10000));
        walletDao.save(wallet);
    }

    public BigDecimal recharge(int amount,HttpServletRequest servletRequest){
        Long userId = (Long) servletRequest.getSession().getAttribute("userId");
        Wallet wallet = walletDao.findByUserId(userId);
        wallet.setBalance(wallet.getBalance().add(BigDecimal.valueOf(amount)));
        walletDao.save(wallet);
        return wallet.getBalance().setScale(2, RoundingMode.HALF_UP);
    }

    public String pay(WalletPayRequest request, HttpServletRequest servletRequest){
        Long userId = (Long) servletRequest.getSession().getAttribute("userId");

        if(!userId.equals(request.getUserId()))
            return "failure";
        Wallet wallet = walletDao.findByUserId(userId);
        if(wallet.getBalance().compareTo(request.getTotalPrice()) < 0)
            return "余额不足";
        wallet.setBalance(wallet.getBalance().subtract(request.getTotalPrice()).setScale(2,RoundingMode.HALF_UP));
        Wallet adminAcc = walletDao.findByUserId(1L);
        adminAcc.setBalance(adminAcc.getBalance().add(request.getTotalPrice()).setScale(2,RoundingMode.HALF_UP));
        walletDao.save(adminAcc);
        walletDao.save(wallet);
        return "success";
    }

    public BigDecimal createAccount(HttpServletRequest servletRequest){
        Long userId = (Long) servletRequest.getSession().getAttribute("userId");
        Wallet wallet = walletDao.findByUserId(userId);
        if(wallet !=null)
            return null;
        wallet = new Wallet(userId,new BigDecimal(0));
        walletDao.save(wallet);
        return new BigDecimal(0);
    }

    public BigDecimal getAccount(HttpServletRequest servletRequest){
        Long userId = (Long) servletRequest.getSession().getAttribute("userId");
        Wallet wallet = walletDao.findByUserId(userId);
        if(wallet == null){
            wallet = new Wallet(userId,new BigDecimal(0));
            walletDao.save(wallet);
        }
        return wallet.getBalance();
    }

    public Long getWalletId(Long id){
        return walletDao.findByUserId(id).getId();
    }

    public String confirm(WalletPayRequest request){
        Wallet wallet = walletDao.findByUserId(request.getUserId());
        if(wallet == null){
            wallet = new Wallet(request.getUserId(),new BigDecimal(0));
            walletDao.save(wallet);
        }
        Wallet adminWallet = walletDao.findByUserId(1L);
        wallet.setBalance(wallet.getBalance().add(request.getTotalPrice()).setScale(2,RoundingMode.HALF_UP));
        adminWallet.setBalance(adminWallet.getBalance().subtract(request.getTotalPrice()).setScale(2,RoundingMode.HALF_UP));
        walletDao.save(wallet);
        walletDao.save(adminWallet);
        return "success";
    }
}
