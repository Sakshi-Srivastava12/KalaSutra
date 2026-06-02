package com.sakshi.kala.controller;

import com.sakshi.kala.security.JwtUtil;
import com.sakshi.kala.entity.User;
import com.sakshi.kala.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthController(UserRepository userRepository,
                          PasswordEncoder passwordEncoder,
                          JwtUtil jwtUtil) {

        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    // 🔥 REGISTER
    @PostMapping("/register")
    public String register(@RequestBody User user) {

        // check if user already exists
        if(userRepository.findByEmail(user.getEmail()) != null){
            return "User already exists ❌";
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);

        return "User registered successfully ✅";
    }

    // 🔥 LOGIN
    @PostMapping("/login")
    public String login(@RequestBody User user) {

        User existingUser = userRepository.findByEmail(user.getEmail());

        // ✅ FIXED HERE
        if(existingUser == null){
            throw new RuntimeException("User not found");
        }

        if (!passwordEncoder.matches(user.getPassword(), existingUser.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        // 🔥 generate JWT token
        return jwtUtil.generateToken(existingUser.getEmail());
    }
}