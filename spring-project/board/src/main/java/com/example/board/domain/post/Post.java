package com.example.board.domain.post;

import com.example.board.common.BaseTimeEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@Entity
public class Post extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String content;

    @Column(nullable = false)
    private String writer;

    @Column(nullable = false)
    private String category;

    private int views = 0;

    public Post(String title, String content, String writer, String category) {
        this.title = title;
        this.content = content;
        this.writer = writer;
        this.category = category;
    }

    public void update(String title, String content, String writer, String category) {
        this.title = title;
        this.content = content;
        this.writer = writer;
        this.category = category;
    }

    public void increaseViews() {
        this.views++;
    }
}