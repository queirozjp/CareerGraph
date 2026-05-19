package com.microwaves.careergraph.service;

import com.microwaves.careergraph.entities.Course;
import com.microwaves.careergraph.repository.CourseRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CourseService {
    private final CourseRepository courseRepository;
    public CourseService(CourseRepository courseRepository) {
        this.courseRepository = courseRepository;
    }

    public List<Course> getCourses(){
        return courseRepository.findAll();
    }

    public Course getCourseById(long id){
        return courseRepository.findById(id).orElseThrow();
    }
}
