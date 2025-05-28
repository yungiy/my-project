package com.example.board.domain.post.dto;

import com.example.board.domain.post.Post;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class PostResponse {

    private final Long id;
    private final String title;
    private final String content;
    private final String category;
    private final String nickname;

    private final LocalDateTime createdAt;
    private final LocalDateTime updatedAt;

    public PostResponse(Post post, Long viewCount) {
        this.id = post.getId();
        this.title = post.getTitle();
        this.content = post.getContent();
        this.category = post.getCategory();
        this.nickname = post.getUser().getNickname();

        this.createdAt = post.getCreatedAt();
        this.updatedAt = post.getUpdatedAt();
    }

    public PostResponse(Post post) {
        this(post, (long) post.getViews()); // 또는 기본값
    }
}