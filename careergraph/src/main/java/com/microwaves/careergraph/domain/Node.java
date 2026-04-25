package com.microwaves.careergraph.domain;

import lombok.Getter;

@Getter
public abstract class Node {
    private static int idCounter = 0;
    private String id;
    private String name;

    // Pointer for linked list in adjacency structure
    public Node prox;

    public Node(String name) {
        idCounter++;
        this.id = String.valueOf(idCounter);
        this.name = name;
        this.prox = null;
    }

    public Node(String id, String name) {
        this.id = id;
        this.name = name;
        this.prox = null;
        int idInt = Integer.parseInt(id);
        if (idInt > idCounter) idCounter = idInt;
    }

    @Override
    public String toString() {
        return name + " (#" + id + ")";
    }

    // Essential method to clone the node when inserting it into the adjacency list,
    // ensuring each node in the list has its own 'prox' pointer
    public abstract Node cloneNode();
}
