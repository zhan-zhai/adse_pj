package fd.adse.order.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BaseResponse<T> {
    public static String SUCCESS = "000";
    public static String ERROR = "500";
    public static String NON_PHONE = "202";
    private String code = SUCCESS;
    private T data;
    private String msg;

    public BaseResponse(String code, T data, String msg) {
        this.code = code;
        this.data = data;
        this.msg = msg;
    }

    public BaseResponse(T data, String msg) {
        this.data = data;
        this.msg = msg;
    }

    public BaseResponse(T data) {
        this(data, "");
    }

    public BaseResponse(String msg) {
        this(null, msg);
    }

    public BaseResponse() {
    }
}
