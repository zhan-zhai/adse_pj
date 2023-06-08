package fd.adse.account.constant;

import lombok.Getter;

@Getter
public enum ErrorCodeConstants {
    YZ_999("9999", "未知错误"),
    YZ_401("401", "查询实体不存在"),
    YZ_4002("402", "文件不存在");



    private String code;
    private String msg;

    ErrorCodeConstants(String code, String msg) {
        this.code = code;
        this.msg = msg;
    }
}
