package fd.adse.account.model;


import lombok.Data;


@Data
public class PasswordLoginRequest {

    private String username;
    private String password;
}