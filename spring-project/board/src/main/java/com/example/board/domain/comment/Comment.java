package com.example.board.domain.comment;

import com.example.board.domain.post.Post;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Comment {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String writer;
    private String content;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "post_id")
    private Post post;

    public Comment(String writer, String content, Post post) {
        this.writer = writer;
        this.content = content;
        this.post = post;
    }

    public void update(String content) {
        this.content = content;
    }
}