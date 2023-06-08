package com.example.demo.model;


import lombok.Data;


@Data
public class PasswordLoginRequest {

    private String username;
    private String password;
}