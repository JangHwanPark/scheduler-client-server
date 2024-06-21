package com.game.rental.security.detail;

import com.game.rental.users.entity.UserEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@RequiredArgsConstructor
public class CustomUserDetails implements UserDetails {
    private final UserEntity userEntity;

    /**
     * 사용자의 특정한 권한에 대하여 반환을 해주는 메소드 입니다.
     * db에 저장된 role 값을 반환 해 줍니다.
     * */
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        Collection<GrantedAuthority> authorities = new ArrayList<>();

        authorities.add(new GrantedAuthority() {
            @Override
            public String getAuthority() {
                return userEntity.getRoles();
            }
        });
        return authorities;
    }

    @Override
    public String getPassword() {
        return userEntity.getLoginPassword();
    }

    @Override
    public String getUsername() {
        return userEntity.getLoginId();
    }
    // 아래의 매소드 들은 사용자의 아이디가 만료, 잠김, 사용가능 한지에 대한 여부를 반환하는 메서드 입니다.
    @Override
    public boolean isAccountNonExpired() {
        return UserDetails.super.isAccountNonExpired();
    }

    @Override
    public boolean isAccountNonLocked() {
        return UserDetails.super.isAccountNonLocked();
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return UserDetails.super.isCredentialsNonExpired();
    }

    @Override
    public boolean isEnabled() {
        return UserDetails.super.isEnabled();
    }
}
