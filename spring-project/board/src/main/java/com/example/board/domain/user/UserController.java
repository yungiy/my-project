package com.example.board.domain.user;

import com.example.board.domain.user.dto.JwtResponse;
import com.example.board.domain.user.dto.LoginRequest;
import com.example.board.domain.user.dto.SignupRequest;
import com.example.board.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/users")
public class UserController {

    private final UserService userService;
    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;

    @PostMapping("/signup")
    public ResponseEntity<JwtResponse> signup(@RequestBody SignupRequest request) {
        JwtResponse response = userService.signup(request);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/login")
    public JwtResponse login(@RequestBody LoginRequest request) {
        String nickname = request.getNickname();

        User user = userRepository.findByNickname(nickname)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 닉네임입니다."));

        String token = jwtUtil.generateToken(user.getId(), user.getNickname());
        return new JwtResponse(token);
    }
}