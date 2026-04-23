package com.microwaves.careergraph.service;

import com.microwaves.careergraph.domain.Node;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class GraphModel {
    private int n; // Current number of vertices
    private int m; // Number of undirected edges

    private Node[] vertices; // Array that stores vertex references by index
    private Node[] adj;      // Array where each entry stores the start of the adjacency list
    private int capacity = 10;

    public GraphModel() {
        this.n = 0;
        this.m = 0;
        this.vertices = new Node[capacity];
        this.adj = new Node[capacity];
    }

    // Find the index of a vertex based on its ID
    private int getIndex(String id) {
        if (id == null) return -1;
        for (int i = 0; i < n; i++) {
            if (vertices[i].getId().equals(id)) {
                return i;
            }
        }
        return -1;
    }

    private void expandCapacity() {
        capacity *= 2;
        Node[] newVertices = new Node[capacity];
        Node[] newAdj = new Node[capacity];
        System.arraycopy(vertices, 0, newVertices, 0, n);
        System.arraycopy(adj, 0, newAdj, 0, n);
        vertices = newVertices;
        adj = newAdj;
    }

    public void addNode(Node node) {
        if (getIndex(node.getId()) != -1) return; // Avoid duplicates

        if (n == capacity) {
            expandCapacity();
        }
        vertices[n] = node;
        adj[n] = null;
        n++;
    }

    public Node findNodeById(String id) {
        int idx = getIndex(id);
        return (idx != -1) ? vertices[idx] : null;
    }

    public boolean hasEdge(Node n1, Node n2) {
        int idx = getIndex(n1.getId());
        if (idx == -1) return false;

        Node no = adj[idx];
        while (no != null) {
            if (no.getId().equals(n2.getId())) return true;
            no = no.prox;
        }
        return false;
    }

    // Internal method to insert into the linked list using the Node class itself
    private boolean insereNaLista(Node v, Node w) {
        int idx = getIndex(v.getId());
        if (idx == -1) return false;

        Node no = adj[idx];
        Node ant = null;

        while (no != null) {
            if (no.getId().equals(w.getId())) return false; // Edge already exists
            ant = no;
            no = no.prox;
        }

        // IMPORTANT: We create a clone so it has its own free 'prox' pointer
        Node novoNo = w.cloneNode();

        if (ant == null) {
            adj[idx] = novoNo;
        } else {
            ant.prox = novoNo;
        }
        return true;
    }

    public void addEdge(Node nodeA, Node nodeB) {
        if (getIndex(nodeA.getId()) == -1) addNode(nodeA);
        if (getIndex(nodeB.getId()) == -1) addNode(nodeB);

        boolean added1 = insereNaLista(nodeA, nodeB);
        boolean added2 = insereNaLista(nodeB, nodeA);

        if (added1 || added2) m++;
    }

    private boolean removeDaLista(Node v, Node w) {
        int idx = getIndex(v.getId());
        if (idx == -1) return false;

        Node no = adj[idx];
        Node ant = null;

        while (no != null && !no.getId().equals(w.getId())) {
            ant = no;
            no = no.prox;
        }

        if (no != null) {
            if (ant == null) {
                adj[idx] = no.prox;
            } else {
                ant.prox = no.prox;
            }
            return true;
        }
        return false;
    }

    public void removeEdge(Node nodeA, Node nodeB) {
        boolean r1 = removeDaLista(nodeA, nodeB);
        boolean r2 = removeDaLista(nodeB, nodeA);

        if (r1 || r2) m--;
    }

    public void removeNode(Node rNode) {
        int idx = getIndex(rNode.getId());
        if (idx == -1) return;

        // 1. Remove all connections (searching in neighbor lists)
        Node no = adj[idx];
        while (no != null) {
            // Get the original instance of the neighbor vertex
            Node vizinho = findNodeById(no.getId());
            if (vizinho != null) {
                removeDaLista(vizinho, rNode);
                m--;
            }
            no = no.prox;
        }

        // 2. Remove the node from the arrays by shifting items left
        for (int i = idx; i < n - 1; i++) {
            vertices[i] = vertices[i + 1];
            adj[i] = adj[i + 1];
        }
        vertices[n - 1] = null;
        adj[n - 1] = null;
        n--;
    }

    public boolean isConnected() {
        if (n == 0) return false;

        Node pivot = vertices[0];
        Set<String> visitadosId = new HashSet<>();
        Queue<Node> fila = new LinkedList<>();

        fila.add(pivot);
        visitadosId.add(pivot.getId());

        while (!fila.isEmpty()) {
            Node atual = fila.poll();
            int idx = getIndex(atual.getId());

            if (idx != -1) {
                Node no = adj[idx];
                while (no != null) {
                    if (!visitadosId.contains(no.getId())) {
                        visitadosId.add(no.getId());
                        // Add the original instance to the queue, not the clone
                        fila.add(findNodeById(no.getId()));
                    }
                    no = no.prox;
                }
            }
        }

        return visitadosId.size() == n;
    }

    public Set<Node> getNeighbors(Node node) {
        Set<Node> vizinhos = new HashSet<>();
        int idx = getIndex(node.getId());
        if (idx != -1) {
            Node no = adj[idx];
            while (no != null) {
                // Return the original instances of neighbors
                vizinhos.add(findNodeById(no.getId()));
                no = no.prox;
            }
        }
        return vizinhos;
    }

    public boolean containsNode(Node node) {
        return getIndex(node.getId()) != -1;
    }

    public Set<Node> getAllNodes() {
        Set<Node> allNodes = new HashSet<>();
        for (int i = 0; i < n; i++) {
            allNodes.add(vertices[i]);
        }
        return allNodes;
    }

    public Map<Node, Set<Node>> getAdjacencyList() {
        Map<Node, Set<Node>> map = new HashMap<>();
        for (int i = 0; i < n; i++) {
            map.put(vertices[i], getNeighbors(vertices[i]));
        }
        return map;
    }

    public void reset() {
        this.n = 0;
        this.m = 0;
        this.capacity = 10;
        this.vertices = new Node[capacity];
        this.adj = new Node[capacity];
    }

    public int getNodeCount() {
        return n;
    }

    public int getEdgeCount() {
        return m;
    }
}
