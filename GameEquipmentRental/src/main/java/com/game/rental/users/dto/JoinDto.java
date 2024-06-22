package com.game.rental.users.dto;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class JoinDto {
    private String id;
    private String password;
    private String name;
    private String phone;

    @Override
    public String toString() {
        return "JoinDto{" +
                "id='" + id + '\'' +
                ", password='" + password + '\'' +
                ", name='" + name + '\'' +
                ", phone='" + phone + '\'' +
                '}';
    }
}