package com.example.demo.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import java.sql.Timestamp;
import lombok.Getter;

@Getter
public class RestCreateUserRequest {

    private String username;
    private String password;
    private String type;
}
