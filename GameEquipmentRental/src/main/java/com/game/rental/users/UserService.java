package com.game.rental.users;

import com.game.rental.users.dto.JoinDto;
import com.game.rental.users.entity.UserEntity;
import com.game.rental.users.entity.UserEntityRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserEntityRepository userRepo;
    private final PasswordEncoder passwordEncoder;

    public boolean joinUser(JoinDto user) {
        if (userRepo.existsByLoginId(user.getId())) {
            return false;
        }
        UserEntity userEntity = UserEntity.builder()
                .loginId(user.getId())
                .loginPassword(passwordEncoder.encode(user.getPassword()))
                .userName(user.getName())
                .userPhoneNumber(user.getPhone())
                .roles("user")
                .build();
        userRepo.save(userEntity);
        return true;
    }
}
