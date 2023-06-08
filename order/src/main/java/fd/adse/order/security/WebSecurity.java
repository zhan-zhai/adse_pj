package fd.adse.order.security;

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
                .antMatchers("/api/order/createOrderFromCommodityDetail").permitAll()
                .antMatchers("/api/order/createOrderFromCart").permitAll()
                .antMatchers("/api/order/allOrders").permitAll()
                .antMatchers("/api/order/getOrderByStatus").permitAll()
                .antMatchers("/api/order/modifyOrder").permitAll()
                .antMatchers("/api/order/pay").permitAll()
                .antMatchers("/api/order/cancelOrder").permitAll()
                .antMatchers("/api/address/createAddress").permitAll()
                .antMatchers("/api/address/getAddress").permitAll()
                .antMatchers("/api/address/modifyAddress").permitAll()
                .antMatchers("/api/order/orderItem").permitAll()
                .antMatchers("/api/order/confirmation").permitAll()
                .antMatchers("/api/order/delivery").permitAll()
                .antMatchers("/api/**").authenticated();
    }
}
