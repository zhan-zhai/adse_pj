package fd.adse.wallet.dao;

import fd.adse.wallet.entity.Wallet;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface WalletDao extends PagingAndSortingRepository<Wallet, Long>, JpaSpecificationExecutor<Wallet> {
    Wallet findByUserId(Long userId);
}
