package com.microwaves.careergraph.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "instituicao_ensino")
public class EducationalInstitution {

    @Id
    private Long id;

    @Column(name = "nome")
    private String name;

    @Column(name = "email")
    private String email;

    @Column(name = "descricao")
    private String description;

    @ManyToMany
    @JoinTable(
            name = "instituicao_curso",
            // CORREÇÃO 2: A ordem das chaves estava invertida!
            joinColumns = @JoinColumn(name = "instituicao_id"),
            inverseJoinColumns = @JoinColumn(name = "curso_id")
    )
    @JsonIgnore
    private List<Course> courses;
}