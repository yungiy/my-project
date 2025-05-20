package com.example.board.domain.post.dto;

import com.example.board.domain.post.Post;
import lombok.Getter;

@Getter
public class PostResponse {

    private final Long id;
    private final String title;
    private final String content;
    private final String category;
    private final String nickname;

    public PostResponse(Post post) {
        this.id = post.getId();
        this.title = post.getTitle();
        this.content = post.getContent();
        this.category = post.getCategory();
        this.nickname = post.getUser().getNickname(); // 연관된 사용자 닉네임
    }
}