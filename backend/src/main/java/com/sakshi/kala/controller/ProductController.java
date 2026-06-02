package com.sakshi.kala.controller;

import com.sakshi.kala.entity.Product;
import com.sakshi.kala.repository.ProductRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.*;
import java.util.List;
@CrossOrigin(origins = "*")   // ⚡ allow all (temporary)
@RestController
@RequestMapping("/api/products")


public class ProductController {

    @Autowired
    private ProductRepository productRepository;

    private final String UPLOAD_DIR = "uploads/";

    @PostMapping("/upload")
    public Product uploadProduct(

            @RequestParam String name,
            @RequestParam String description,
            @RequestParam Double price,
            @RequestParam Integer stock,
            @RequestParam String category,
            @RequestParam MultipartFile image

    ) throws IOException {

        String fileName = System.currentTimeMillis() + "_" + image.getOriginalFilename();

        Path path = Paths.get(UPLOAD_DIR + fileName);

        Files.createDirectories(path.getParent());

        Files.write(path, image.getBytes());

        Product product = new Product();

        product.setName(name);
        product.setDescription(description);
        product.setPrice(price);
        product.setStock(stock);
        product.setCategory(category);

        product.setImageUrl("http://localhost:8080/uploads/" + fileName);

        return productRepository.save(product);
    }

    @GetMapping
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }
}