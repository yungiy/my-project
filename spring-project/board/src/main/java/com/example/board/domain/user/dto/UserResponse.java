package com.example.board.domain.user.dto;

import com.example.board.domain.user.User;
import lombok.Getter;

@Getter
public class UserResponse {
    private final Long id;
    private final String nickname;

    public UserResponse(User user) {
        this.id = user.getId();
        this.nickname = user.getNickname();
    }
}