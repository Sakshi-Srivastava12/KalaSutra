package com.sakshi.kala.entity;

import jakarta.persistence.*;

@Entity
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String description;

    private String imageUrl;   // ✅ image field

    public Category() {}

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getImageUrl() {   // ✅ getter
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {  // ✅ setter
        this.imageUrl = imageUrl;
    }
}