package fd.adse.account.exception;

import fd.adse.account.model.BaseResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
@Slf4j
public class ClpExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler(value = BadCredentialsException.class)
    public ResponseEntity<Object> handleBadCredentialsException(RuntimeException ex, WebRequest request) {
        log.error("Found error", ex);
        return super.handleExceptionInternal(ex, new BaseResponse<>(BaseResponse.ERROR, null, ex.getMessage()), new HttpHeaders(),
            HttpStatus.FORBIDDEN, request);
    }

    @ExceptionHandler(value = RuntimeException.class)
    public ResponseEntity<Object> handleRuntimeException(RuntimeException ex, WebRequest request) {
        log.error("Found error", ex);
        return super.handleExceptionInternal(ex, new BaseResponse<>(BaseResponse.ERROR, null, ex.getMessage()), new HttpHeaders(),
            HttpStatus.OK, request);
    }
}
