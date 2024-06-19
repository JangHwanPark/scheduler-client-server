package com.game.rental.users.entity;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserEntityRepository extends JpaRepository<UserEntity, Long> {
    boolean existsByLoginId(String loginId);
    UserEntity findByLoginId(String loginId);
}
