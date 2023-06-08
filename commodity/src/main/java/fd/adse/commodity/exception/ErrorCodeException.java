package fd.adse.commodity.exception;

import fd.adse.commodity.constant.ErrorCodeConstants;
import lombok.Getter;

@Getter
public class ErrorCodeException extends RuntimeException {

    private ErrorCodeConstants errorCode;

    public ErrorCodeException(ErrorCodeConstants errorCode) {
        this.errorCode = errorCode;
    }

    public ErrorCodeException(ErrorCodeConstants errorCode, Exception cause) {
        super(cause);
        this.errorCode = errorCode;
    }

    @Override
    public String getMessage() {
        return String.format("%s, %s", errorCode.getCode(), errorCode.getMsg());
    }
}