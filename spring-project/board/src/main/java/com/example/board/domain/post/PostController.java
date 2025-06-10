package com.example.board.domain.post;

import com.example.board.domain.post.dto.*;
import com.example.board.domain.user.User;
import com.example.board.domain.user.UserRepository;
import com.example.board.util.JwtUtil;
import com.example.board.util.RedisViewCountManager;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/posts")
public class PostController {

    private final PostRepository postRepository;
    private final PostService postService;
    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;
    private final RedisViewCountManager redisViewCountManager;


    @GetMapping("/me")
    public ResponseEntity<List<PostResponse>> getMyPosts(@RequestHeader("Authorization") String tokenHeader) {
        String token = tokenHeader.replace("Bearer ", "");
        Long userId = jwtUtil.getUserIdFromToken(token);
        List<Post> myPosts = postService.findAllByUserId(userId);
        List<PostResponse> response = myPosts.stream().map(PostResponse::new).toList();
        return ResponseEntity.ok(response);
    }

    @GetMapping("/all")
    public List<PostResponse> getAllPosts() {
        return postService.findAll();
    }

    @PostMapping("/create")
    public PostResponse createPost(
            @RequestBody PostCreateRequest request,
            @RequestHeader("Authorization") String tokenHeader) {
        String token = tokenHeader.replace("Bearer ", "");
        Long userId = jwtUtil.getUserIdFromToken(token);
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("유저가 존재하지 않습니다."));

        Post post = new Post(request.getTitle(), request.getContent(), request.getCategory(), user);
        Post saved = postRepository.save(post);
        return new PostResponse(saved);
    }

    @PutMapping("/{id}")
    public PostResponse updatePost(@PathVariable Long id, @RequestBody PostUpdateRequest request) {
        Post updated = postService.update(id, request);
        return new PostResponse(updated);
    }

    @DeleteMapping("/{id}")
    public void deletePost(@PathVariable Long id) {
        postService.delete(id);
    }

    @GetMapping("/search")
    public ResponseEntity<List<PostResponse>> searchPosts(@ModelAttribute PostSearch search) {
        return ResponseEntity.ok(postService.search(search));
    }

    @GetMapping("/{id}")
    public ResponseEntity<PostResponse> getPost(
            @PathVariable Long id,
            @RequestHeader(value = "Authorization", required = false) String tokenHeader) {

        redisViewCountManager.incrementView(id); // Redis 조회수 증가
        Post post = postService.findById(id);
        Long viewCount = (long) redisViewCountManager.getViewCount(id);

        return ResponseEntity.ok(new PostResponse(post, viewCount));
    }
}