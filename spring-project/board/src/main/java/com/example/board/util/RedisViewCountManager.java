package com.example.board.util;

import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class RedisViewCountManager {

    private static final String VIEW_COUNT_KEY_PREFIX = "post:views:";
    private final StringRedisTemplate redisTemplate;

    // 조회수 증가
    public void incrementView(Long postId) {
        String key = getViewCountKey(postId);
        redisTemplate.opsForValue().increment(key);
    }

    // 현재 조회수 가져오기
    public int getViewCount(Long postId) {
        String key = getViewCountKey(postId);
        String value = redisTemplate.opsForValue().get(key);
        if (value == null) return 0;
        return Integer.parseInt(value);
    }

    private String getViewCountKey(Long postId) {
        return VIEW_COUNT_KEY_PREFIX + postId;
    }
}
