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
public class Curso {
    @Id
    private Integer id;
    @Column(name = "nome")
    private String name;
    @Column(name = "descricao")
    private String description;
    @ManyToMany(mappedBy = "cursos")
    private Set<InstituicaoEnsino> instituicaoEnsino = new HashSet<>();
}
