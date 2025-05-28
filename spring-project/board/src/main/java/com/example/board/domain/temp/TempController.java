package com.example.board.domain.temp;

import com.example.board.domain.temp.dto.TempPostRequest;
import com.example.board.domain.user.User;
import com.example.board.domain.user.UserRepository;
import com.example.board.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/posts/temp")
@RequiredArgsConstructor
public class TempController {

    private final TempService tempService;
    private final JwtUtil jwtUtil;
    private final UserRepository userRepository;

    private User getUser(String tokenHeader) {
        Long userId = jwtUtil.getUserIdFromToken(tokenHeader.replace("Bearer ", ""));
        return userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("유저가 존재하지 않습니다."));
    }

    @PostMapping("/create")
    public ResponseEntity<Void> saveTemp(@RequestBody TempPostRequest request,
                                         @RequestHeader("Authorization") String tokenHeader) {
        tempService.save(getUser(tokenHeader).getId(), request);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/me")
    public ResponseEntity<TempPostRequest> getTemp(@RequestHeader("Authorization") String tokenHeader) {
        return ResponseEntity.ok(tempService.find(getUser(tokenHeader).getId()));
    }

    @DeleteMapping("delete")
    public ResponseEntity<Void> deleteTemp(@RequestHeader("Authorization") String tokenHeader) {
        tempService.delete(getUser(tokenHeader).getId());
        return ResponseEntity.noContent().build();
    }
}