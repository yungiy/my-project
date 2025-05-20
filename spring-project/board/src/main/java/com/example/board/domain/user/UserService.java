package com.example.board.domain.user;

import com.example.board.domain.user.dto.SignupRequest;
import com.example.board.domain.user.dto.JwtResponse;
import com.example.board.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;

    public JwtResponse signup(SignupRequest request) {
        String nickname = request.getNickname();

        if (userRepository.existsByNickname(nickname)) {
            throw new IllegalArgumentException("이미 존재하는 닉네임입니다.");
        }

        User user = new User(nickname);
        userRepository.save(user);

        String token = jwtUtil.generateToken(user.getId(), user.getNickname());

        return new JwtResponse(token);
    }
}