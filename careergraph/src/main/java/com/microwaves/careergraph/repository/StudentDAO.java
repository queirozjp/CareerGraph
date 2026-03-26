package com.microwaves.careergraph.repository;

import com.microwaves.careergraph.Service.Student;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentDAO extends JpaRepository<Student, Long>{
}
