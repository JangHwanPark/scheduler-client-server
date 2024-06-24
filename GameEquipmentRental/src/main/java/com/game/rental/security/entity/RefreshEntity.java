package com.game.rental.security.entity;

import com.game.rental.users.entity.UserEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter @Setter
@Table(name = "refresh_token")
@NoArgsConstructor
@AllArgsConstructor
public class RefreshEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "refresh_id")
    private Long id;

    @Column(name = "refresh")
    private String refreshToken;

    @Column(name = "expiration")
    private String expiration;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")
    private UserEntity userEntity;
}
