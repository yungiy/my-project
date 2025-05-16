package com.example.board.domain.comment;

import com.example.board.domain.comment.dto.CommentCreateRequest;
import com.example.board.domain.post.Post;
import com.example.board.domain.post.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class CommentService {

    private final CommentRepository commentRepository;
    private final PostRepository postRepository;

    public Comment save(Long postId, CommentCreateRequest request) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new IllegalArgumentException("게시글이 존재하지 않습니다. id=" + postId));
        Comment comment = new Comment(request.getWriter(), request.getContent(), post);
        return commentRepository.save(comment);
    }

    public List<Comment> findAllByPostId(Long postId) {
        return commentRepository.findByPostId(postId);
    }
}