package com.fitness.userservice.repository;

import com.fitness.userservice.dto.RegisterRequest;
import com.fitness.userservice.model.User;
import jakarta.validation.Valid;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, String> {

    boolean existsByEmail(String email);
}
