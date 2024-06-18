package com.game.rental.users.entity;

import jakarta.persistence.*;
import jakarta.persistence.Table;
import lombok.*;
import org.hibernate.annotations.*;

import java.time.LocalTime;

@Entity
@Getter @Setter
@Table(name = "users")
@NoArgsConstructor
@AllArgsConstructor
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
    @CreationTimestamp
    @Column(nullable = false, name = "created_at",updatable = false)
    private LocalTime createdAt;
    @UpdateTimestamp
    @Column(nullable = false, name = "updated_at")
    private LocalTime updatedAt;
}
