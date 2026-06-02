package com.sakshi.kala.controller;

import com.sakshi.kala.entity.Category;
import com.sakshi.kala.repository.CategoryRepository;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.*;



import com.sakshi.kala.entity.Category;
import com.sakshi.kala.repository.CategoryRepository;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.*;
import java.util.List;

@RestController
@RequestMapping("/api/categories")
@CrossOrigin(origins = "*")
public class CategoryController {

    private final CategoryRepository categoryRepository;

    public CategoryController(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    // Upload Category with Image
    @PostMapping("/upload")
    public Category uploadCategory(
            @RequestParam String name,
            @RequestParam String description,
            @RequestParam MultipartFile image
    ) throws IOException {

        String fileName = image.getOriginalFilename().replace(" ", "_");

        Path uploadPath = Paths.get("uploads");

        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        Path filePath = uploadPath.resolve(fileName);

        Files.copy(image.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

        Category category = new Category();
        category.setName(name);
        category.setDescription(description);
        category.setImageUrl(fileName);

        return categoryRepository.save(category);
    }

    // Get All Categories
    @GetMapping
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

}