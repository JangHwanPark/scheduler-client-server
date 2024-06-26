package com.game.rental.users.entity;

import com.game.rental.orders.entity.OrdersEntity;
import com.game.rental.security.entity.RefreshEntity;
import com.game.rental.users.dto.JoinDto;
import jakarta.persistence.*;
import jakarta.persistence.Table;
import lombok.*;
import org.hibernate.annotations.*;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter @Setter
@Table(name = "users")
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="user_id")
    private Long id;

    @Column(nullable = false, name = "login_id", unique = true)
    private String loginId;

    @Column(nullable = false, name = "login_password")
    private String loginPassword;

    @Column(nullable = false, name = "user_name")
    private String userName;

    @Column(nullable = false, name = "user_phone_number")
    private String userPhoneNumber;

    @Column(nullable = false, name = "roles")
    private String roles;

    @CreationTimestamp
    @Column(nullable = false, name = "created_at",updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(nullable = false, name = "updated_at")
    private LocalDateTime updatedAt;

    @OneToMany(mappedBy = "user")
    private List<OrdersEntity> ordersList = new ArrayList<>();

    public UserEntity toEntity(JoinDto joinDto) {
        this.loginId = joinDto.getId();
        this.loginPassword = joinDto.getPassword();
        this.userName = joinDto.getName();
        this.userPhoneNumber = joinDto.getPhone();
        return this;
    }
}