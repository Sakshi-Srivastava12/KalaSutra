package com.sakshi.kala.repository;

import com.sakshi.kala.entity.Video;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VideoRepository extends JpaRepository<Video, Long> {
}