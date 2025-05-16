package com.example.board.domain.comment;

import com.example.board.domain.comment.dto.CommentCreateRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/posts/{postId}/comments")
public class CommentController {

    private final CommentService commentService;

    @PostMapping
    public Comment create(@PathVariable Long postId, @RequestBody CommentCreateRequest request) {
        return commentService.save(postId, request);
    }

    @GetMapping
    public List<Comment> getAll(@PathVariable Long postId) {
        return commentService.findAllByPostId(postId);
    }
}