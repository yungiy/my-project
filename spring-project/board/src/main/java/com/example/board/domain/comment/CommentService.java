package com.example.board.domain.comment;

import com.example.board.domain.comment.dto.CommentCreateRequest;
import com.example.board.domain.comment.dto.CommentUpdateRequest;
import com.example.board.domain.comment.dto.CommentResponse;
import com.example.board.domain.post.Post;
import com.example.board.domain.post.PostRepository;
import com.example.board.domain.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class CommentService {

    private final CommentRepository commentRepository;
    private final PostRepository postRepository;

    public Comment save(Long postId, CommentCreateRequest request, User user) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new IllegalArgumentException("게시글이 존재하지 않습니다. id=" + postId));
        Comment comment = new Comment(request.getContent(), post, user);
        return commentRepository.save(comment);
    }

    public List<CommentResponse> findAllByPostId(Long postId) {
        return commentRepository.findByPostId(postId).stream()
                .map(CommentResponse::new)
                .collect(Collectors.toList());
    }

    @Transactional
    public Comment update(Long commentId, CommentUpdateRequest request, User user) {
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new IllegalArgumentException("댓글이 존재하지 않습니다."));
        if (!comment.getUser().getId().equals(user.getId())) {
            throw new IllegalArgumentException("본인의 댓글만 수정할 수 있습니다.");
        }
        comment.update(request.getContent());
        return comment;
    }

    @Transactional
    public void delete(Long commentId, User user) {
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new IllegalArgumentException("댓글이 존재하지 않습니다."));
        if (!comment.getUser().getId().equals(user.getId())) {
            throw new IllegalArgumentException("본인의 댓글만 삭제할 수 있습니다.");
        }
        commentRepository.delete(comment);
    }
}