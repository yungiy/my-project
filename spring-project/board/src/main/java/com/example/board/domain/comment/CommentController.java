package com.example.board.domain.comment;

import com.example.board.domain.comment.dto.CommentCreateRequest;
import com.example.board.domain.comment.dto.CommentResponse;
import com.example.board.domain.comment.dto.CommentUpdateRequest;
import com.example.board.domain.user.User;
import com.example.board.domain.user.UserRepository;
import com.example.board.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/posts/{postId}/comments")
public class CommentController {

    private final CommentService commentService;
    private final JwtUtil jwtUtil;
    private final UserRepository userRepository;

    @PostMapping
    public CommentResponse create(
            @PathVariable Long postId,
            @RequestBody CommentCreateRequest request,
            @RequestHeader("Authorization") String tokenHeader) {

        String token = tokenHeader.replace("Bearer ", "");
        Long userId = jwtUtil.getUserIdFromToken(token);
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("유저가 존재하지 않습니다."));

        return new CommentResponse(commentService.save(postId, request, user));
    }

    @PutMapping("/{commentId}")
    public CommentResponse update(
            @PathVariable Long postId,
            @PathVariable Long commentId,
            @RequestBody CommentUpdateRequest request,
            @RequestHeader("Authorization") String tokenHeader) {

        String token = tokenHeader.replace("Bearer ", "");
        Long userId = jwtUtil.getUserIdFromToken(token);
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("유저가 존재하지 않습니다."));

        return new CommentResponse(commentService.update(commentId, request, user));
    }

    @DeleteMapping("/{commentId}")
    public void delete(
            @PathVariable Long postId,
            @PathVariable Long commentId,
            @RequestHeader("Authorization") String tokenHeader) {

        String token = tokenHeader.replace("Bearer ", "");
        Long userId = jwtUtil.getUserIdFromToken(token);
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("유저가 존재하지 않습니다."));

        commentService.delete(commentId, user);
    }

    @GetMapping
    public List<CommentResponse> getAll(@PathVariable Long postId) {
        return commentService.findAllByPostId(postId);
    }
}