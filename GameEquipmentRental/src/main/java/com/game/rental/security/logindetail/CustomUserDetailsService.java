package com.game.rental.security.logindetail;

import com.game.rental.users.entity.UserEntity;
import com.game.rental.users.entity.UserEntityRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final UserEntityRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserEntity user = userRepository.findByLoginId(username);
        if (user == null) {
            throw new UsernameNotFoundException(username);
        }
        return User.builder()
                .username(user.getLoginId())
                .password(user.getLoginPassword())
                .roles(user.getRoles())
                .build();
    }
}
