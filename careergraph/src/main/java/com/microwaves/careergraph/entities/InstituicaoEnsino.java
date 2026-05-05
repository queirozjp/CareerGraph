package com.microwaves.careergraph.entities;

import com.microwaves.careergraph.domain.Course;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "instituicao_ensino")
public class InstituicaoEnsino {

    @Id
    private String id;
    @Column(name = "nome")
    private String name;
    @Column(name = "email")
    private String email;
    @Column(name = "descricao")
    private String description;
    @ManyToMany
    @JoinTable(
            name = "instituicao_curso",
            joinColumns = @JoinColumn(name = "curso_id"),
            inverseJoinColumns = @JoinColumn(name = "instituicao_id")
    )
    private List<Curso> cursos;
}
