package com.game.rental.admin.entity;

import com.game.rental.orders.entity.OrdersEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter @Setter
@Table(name = "devices")
@NoArgsConstructor
@AllArgsConstructor
public class DevicesEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "device_id")
    private Long id;

    @Column(nullable = false, name = "device_name")
    private String name;

    @Column(nullable = false, name = "price_per_day")
    private int pricePerDay;

    @Column(nullable = false, name = "description")
    private String description;

    @Column(nullable = false,updatable = false)
    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

    @OneToMany(mappedBy = "devices")
    private List<OrdersEntity> OrdersList = new ArrayList<>();
}
