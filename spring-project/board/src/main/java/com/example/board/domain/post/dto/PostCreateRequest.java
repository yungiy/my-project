package com.example.board.domain.post.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class PostCreateRequest {

    private String title;
    private String content;
    private String category;

    public PostCreateRequest(String title, String content, String category) {
        this.title = title;
        this.content = content;
        this.category = category;
    }
}