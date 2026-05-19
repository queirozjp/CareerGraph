package com.microwaves.careergraph.repository;

import com.microwaves.careergraph.entities.Course;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CourseRepository extends JpaRepository<Course, Long> {
}
