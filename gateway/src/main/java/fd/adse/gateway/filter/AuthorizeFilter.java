package fd.adse.gateway.filter;

import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.core.annotation.Order;

import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;

import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;


@Order(-1)
@Component
public class AuthorizeFilter implements GlobalFilter {
    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
//        HttpServletRequest request =
//                ((ServletRequestAttributes) (RequestContextHolder.currentRequestAttributes())).getRequest();
//        ServerHttpRequest request = exchange.getRequest();
//        String auth = request.getHeaders().getFirst("authority");
////
//////        String auth = Objects.requireNonNull(exchange.getSession().block()).getAttribute("authority");
//        System.out.println(auth);
////        User user = (User) SecurityContextHolder.getContext().getAuthentication().getDetails();
//        if(auth == null){
//            exchange.getResponse().setStatusCode( HttpStatus.UNAUTHORIZED );
//            return exchange.getResponse().setComplete();
//        }

//        HttpHeaders requestHeaders = new HttpHeaders();
//        requestHeaders.setContentType(MediaType.APPLICATION_JSON);
//        HttpServletRequest request =
//                ((ServletRequestAttributes) (RequestContextHolder.currentRequestAttributes())).getRequest();
//        Cookie[] cookies = request.getCookies();
//        if (cookies != null) {
//            List<String> cookieList = Arrays.stream(cookies)
//                    .map(obj -> obj.getName() + "=" + obj.getValue())
//                    .collect(Collectors.toList());
//            requestHeaders.put(HttpHeaders.COOKIE, cookieList);
//        }
//        ServerHttpRequest req = exchange.getRequest();
//        HttpHeaders httpHeaders = req.getHeaders();
//        ServerHttpRequest.Builder requestBuilder = req.mutate();
//
//        // 或者直接修改，要求修改的变量为final
//        // requestBuilder.headers(k -> k.set("要修改的header的key", 要修改为的值));
//
////        ServerHttpRequest request = requestBuilder.build();
////        exchange.mutate().request(request).build();
//        requestBuilder.headers(k -> k.remove(HttpHeaders.COOKIE));
////        httpHeaders.setContentType(MediaType.APPLICATION_JSON);
//        HttpServletRequest request =
//                ((ServletRequestAttributes) (RequestContextHolder.currentRequestAttributes())).getRequest();
//        Cookie[] cookies = request.getCookies();
//        if (cookies != null) {
//            List<String> cookieList = Arrays.stream(cookies)
//                    .map(obj -> obj.getName() + "=" + obj.getValue())
//                    .collect(Collectors.toList());
////            httpHeaders.put(HttpHeaders.COOKIE, cookieList);
//            requestBuilder.headers(k -> k.set(HttpHeaders.COOKIE, String.valueOf(cookieList)));
//        }
//        ServerHttpRequest request = requestBuilder.build();
//        exchange.mutate().request(request).build();
//        ServerHttpRequest request = exchange.getRequest();
//        MultiValueMap<String, String> params = request.getQueryParams();
//        WebSession session = (WebSession) exchange.getSession();
//        String authorize = session.getAttribute("authority");
//        String auth = params.getFirst("authorization");
//        System.out.println(authorize);
        return chain.filter(exchange);
    }
}
