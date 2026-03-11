package com.microwaves.careergraph.repository;

import com.microwaves.careergraph.entities.Student;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentRepository extends JpaRepository<Student, Long>{
}
