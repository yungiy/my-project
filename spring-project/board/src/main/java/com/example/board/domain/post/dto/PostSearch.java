package com.example.board.domain.post.dto;

import lombok.Getter;

@Getter
public class PostSearch {
    private String title;
    private String category;
    private String writer;

    public void setCategory(String category) {
        this.category = category != null ? category.trim() : null;
    }

    public void setTitle(String title) {
        this.title = title != null ? title.trim() : null;
    }

    public void setWriter(String writer) {
        this.writer = writer != null ? writer.trim() : null;
    }
}