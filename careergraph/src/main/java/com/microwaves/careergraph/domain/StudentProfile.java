package com.microwaves.careergraph.domain;

import lombok.Getter;
import java.util.List;

@Getter
public class StudentProfile {
    private final String studentId;
    private final List<Category> interestedCategories;

    public StudentProfile(String studentId, List<Category> interestedCategories) {
        this.studentId = studentId;
        this.interestedCategories = interestedCategories;
    }

    public List<Category> getCategories() {
        return interestedCategories;
    }
}
