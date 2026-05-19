package com.microwaves.careergraph.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "cursos")
public class Course {

    @Id
    private Long id;

    @Column(name = "nome")
    private String name;

    @Column(name = "short_descricao")
    private String shortDescription;

    @Column(name = "descricao")
    private String description;

    @ManyToMany(mappedBy = "courses", fetch = FetchType.EAGER)
    private Set<EducationalInstitution> educationalInstitution = new HashSet<>();
}