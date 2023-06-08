package fd.adse.account.exception;

import fd.adse.account.constant.ErrorCodeConstants;
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