package com.example.board.domain.comment.dto;

import com.example.board.domain.comment.Comment;
import lombok.Getter;

@Getter
public class CommentResponse {
    private final Long id;
    private final String content;
    private final Long postId;
    private final String nickname;

    public CommentResponse(Comment comment) {
        this.id = comment.getId();
        this.content = comment.getContent();
        this.postId = comment.getPost().getId();
        this.nickname = comment.getUser().getNickname();
    }
}