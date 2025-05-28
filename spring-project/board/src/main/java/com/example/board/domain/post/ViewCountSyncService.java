package com.example.board.domain.post;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
@RequiredArgsConstructor
public class ViewCountSyncService {

    private final StringRedisTemplate redisTemplate;
    private final PostRepository postRepository;

    private static final String VIEW_COUNT_KEY_PREFIX = "post:views:";

    @Transactional
    public void syncViewCountsToDatabase() {
        Set<String> keys = redisTemplate.keys(VIEW_COUNT_KEY_PREFIX + "*");
        if (keys == null || keys.isEmpty()) return;

        for (String key : keys) {
            String idStr = key.replace(VIEW_COUNT_KEY_PREFIX, "");
            try {
                Long postId = Long.parseLong(idStr);
                String countStr = redisTemplate.opsForValue().get(key);
                if (countStr == null) continue;

                int viewCount = Integer.parseInt(countStr);
                postRepository.findById(postId).ifPresent(post -> {
                    post.setViews(viewCount); // Post에 setViews() 메서드 필요
                    postRepository.save(post);
                    redisTemplate.delete(key); // 동기화 후 Redis에서 제거
                });
            } catch (NumberFormatException e) {
                // 잘못된 키 무시
            }
        }
    }
}