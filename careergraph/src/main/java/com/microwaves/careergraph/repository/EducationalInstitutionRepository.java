package com.microwaves.careergraph.repository;

import com.microwaves.careergraph.entities.Course;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EducationalInstitutionRepository extends JpaRepository<Course, Long> {
}
