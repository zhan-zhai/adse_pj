package fd.adse.wallet.security;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@Configuration
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class WebSecurity extends WebSecurityConfigurerAdapter {

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.cors();
        http.csrf().disable();
        http.authorizeRequests()
                .antMatchers("/api/wallet/pay").permitAll()
                .antMatchers("/api/wallet/recharge").permitAll()
                .antMatchers("/api/wallet/createWallet").permitAll()
                .antMatchers("/api/wallet/getWallet").permitAll()
                .antMatchers("/api/wallet/walletId").permitAll()
                .antMatchers("/api/wallet/confirmation").permitAll()
                .antMatchers("/api/**").authenticated();
    }
}
