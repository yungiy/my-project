package com.example.board.domain.temp;

import com.example.board.domain.temp.dto.TempPostRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.time.Duration;

@Service
@RequiredArgsConstructor
public class TempService {

    private final RedisTemplate<String, Object> redisTemplate;

    public void save(Long userId, TempPostRequest request) {
        redisTemplate.opsForValue().set(key(userId), request, Duration.ofHours(1));
    }

    public TempPostRequest find(Long userId) {
        return (TempPostRequest) redisTemplate.opsForValue().get(key(userId));
    }

    public void delete(Long userId) {
        redisTemplate.delete(key(userId));
    }

    private String key(Long userId) {
        return "temp:post:" + userId;
    }
}