package com.sakshi.kala.repository;

import com.sakshi.kala.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> {
}