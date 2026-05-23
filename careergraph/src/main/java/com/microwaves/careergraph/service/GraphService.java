package com.microwaves.careergraph.service;

import com.microwaves.careergraph.domain.Category;
import com.microwaves.careergraph.domain.Course;
import com.microwaves.careergraph.domain.Node;
import com.microwaves.careergraph.dto.*;
import com.microwaves.careergraph.entities.User;
import com.microwaves.careergraph.repository.UserRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import jakarta.annotation.PostConstruct;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class GraphService {
    private final GraphStructure graphStructure;
    private final DataHandler dataHandler;
    private final UserRepository userRepository;
    private final RecommendationService recommendationService;

    @Value("${graph.file.path:grafo.txt}")
    private String graphFilePath;

    public GraphService(GraphStructure graphStructure,
                        DataHandler dataHandler,
                        UserRepository userRepository,
                        RecommendationService recommendationService) {
        this.graphStructure = graphStructure;
        this.dataHandler = dataHandler;
        this.userRepository = userRepository;
        this.recommendationService = recommendationService;
    }

    @PostConstruct
    public void initialize() {
        loadGraphFromFile();
    }

    public void loadGraphFromFile() {
        graphStructure.reset();
        dataHandler.loadGraph(graphFilePath, graphStructure);
    }

    public void saveGraphToFile() {
        dataHandler.saveGraph(graphFilePath, graphStructure);
    }

    public GraphDTO getGraphData(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        List<NodeDTO> nodes = graphStructure.getAllNodes().stream()
                .map(this::convertToNodeDTO)
                .sorted(Comparator.comparingInt(n -> Integer.parseInt(n.getId())))
                .collect(Collectors.toList());

        List<EdgeDTO> edges = new ArrayList<>();
        Map<Node, Set<Node>> adjacencyList = graphStructure.getAdjacencyMap();

        for (Map.Entry<Node, Set<Node>> entry : adjacencyList.entrySet()) {
            Node source = entry.getKey();
            int sourceId = Integer.parseInt(source.getId());

            for (Node target : entry.getValue()) {
                int targetId = Integer.parseInt(target.getId());
                // Avoid duplicates in undirected graph
                if (sourceId < targetId) {
                    edges.add(new EdgeDTO(source.getId(), target.getId()));
                }
            }
        }

        RecommendationDTO recomendationDto = recommendationService.recommendationEngine(graphStructure, user);
        List<Node> recCourses = recomendationDto.recommendations();
        List<Node> recCategories = recomendationDto.recommendedCategories();

        return new GraphDTO(
                graphStructure.getNodeCount(),
                graphStructure.getEdgeCount(),
                nodes,
                edges,
                graphStructure.isConnected(),
                recCourses,
                recCategories
        );
    }

    public NodeDTO createNode(CreateNodeRequest request) {
        Node node;
        String name = request.getName().toUpperCase();

        if ("CATEGORY".equalsIgnoreCase(request.getType())) {
            String categoryName = name.startsWith("CATEGORIA_") ? name : "CATEGORIA_" + name;
            node = new Category(categoryName);
        } else if ("COURSE".equalsIgnoreCase(request.getType())) {
            node = new Course(name);
        } else {
            throw new IllegalArgumentException("Invalid node type. Must be CATEGORY or COURSE");
        }

        graphStructure.addNode(node);
        return convertToNodeDTO(node);
    }

    public EdgeDTO createEdge(CreateEdgeRequest request) {
        Node source = graphStructure.findNodeById(request.getSourceId());
        Node target = graphStructure.findNodeById(request.getTargetId());

        if (source == null || target == null) {
            throw new IllegalArgumentException("Source or target node not found");
        }

        if (source.getId().equals(target.getId())) {
            throw new IllegalArgumentException("Cannot create edge from a node to itself");
        }

        if (graphStructure.hasEdge(source, target)) {
            throw new IllegalArgumentException("Edge already exists between these nodes");
        }

        if (source instanceof Category && target instanceof Category) {
            throw new IllegalArgumentException("Cannot create edge between two categories");
        }

        graphStructure.addEdge(source, target);
        return new EdgeDTO(request.getSourceId(), request.getTargetId());
    }

    public void deleteNode(String nodeId) {
        Node node = graphStructure.findNodeById(nodeId);
        if (node == null) {
            throw new IllegalArgumentException("Node not found");
        }
        graphStructure.removeNode(node);
    }

    public void deleteEdge(String sourceId, String targetId) {
        Node source = graphStructure.findNodeById(sourceId);
        Node target = graphStructure.findNodeById(targetId);

        if (source == null || target == null) {
            throw new IllegalArgumentException("Source or target node not found");
        }

        graphStructure.removeEdge(source, target);
    }

    public NodeDTO getNodeById(String nodeId) {
        Node node = graphStructure.findNodeById(nodeId);
        if (node == null) {
            throw new IllegalArgumentException("Node not found");
        }
        return convertToNodeDTO(node);
    }

    public List<NodeDTO> getNeighbors(String nodeId) {
        Node node = graphStructure.findNodeById(nodeId);
        if (node == null) {
            throw new IllegalArgumentException("Node not found");
        }

        return graphStructure.getNeighbors(node).stream()
                .map(this::convertToNodeDTO)
                .sorted(Comparator.comparingInt(n -> Integer.parseInt(n.getId())))
                .collect(Collectors.toList());
    }

    public boolean isGraphConnected() {
        return graphStructure.isConnected();
    }

    public String getFileContent() {
        return dataHandler.readFile(graphFilePath);
    }

    private NodeDTO convertToNodeDTO(Node node) {
        String type = node instanceof Category ? "CATEGORY" : "COURSE";
        return new NodeDTO(node.getId(), node.getName(), type);
    }

    public void prim(String startNodeId) {
        int n = graphStructure.getNodeCount();
        Map<String, Integer> minEdge = new HashMap<>();   // menor peso para alcançar cada nó
        Map<String, String>  parent  = new HashMap<>();   // de qual nó veio
        Set<String>          inTree  = new HashSet<>();   // nós já na árvore
        int totalCost = 0;

        // Inicializa todos os nós com peso infinito
        for (int i = 0; i < n; i++) {
            minEdge.put(Integer.toString(i), Integer.MAX_VALUE);
            parent.put(Integer.toString(i), null);
        }
        minEdge.put(startNodeId, 0);

        System.out.println("\n╔═══════════════════════════════════════════════════╗");
        System.out.println  ("║              Prim - Árvore Geradora Mínima        ║");
        System.out.println  ("╚═══════════════════════════════════════════════════╝");

        for (int iter = 0; iter < n; iter++) {

            // Escolhe o nó fora da árvore com menor minEdge (substitui fila de prioridade)
            String u = null;
            int best = Integer.MAX_VALUE;
            for (Map.Entry<String, Integer> entry : minEdge.entrySet()) {
                if (!inTree.contains(entry.getKey()) && entry.getValue() < best) {
                    best = entry.getValue();
                    u    = entry.getKey();
                }
            }

            if (u == null) break; // grafo desconexo

            inTree.add(u);

            // Imprime a aresta adicionada (exceto o nó raiz)
            if (parent.get(u) != null) {
                totalCost += best;
                System.out.println("Aresta: " + (Integer.parseInt(parent.get(u)) + 1)
                        + " - " + (Integer.parseInt(u) + 1)
                        + " peso: " + best);
            }

            // Relaxa os vizinhos usando lista de adjacência
            Node currentNode = graphStructure.findNodeById(u);
            Set<Node> neighbors = graphStructure.getNeighbors(currentNode);

            for (Node neighbor : neighbors) {
                String v      = neighbor.getId();
                int    weight = 1;

                if (!inTree.contains(v) && weight < minEdge.get(v)) {
                    minEdge.put(v, weight);
                    parent.put(v, u);
                }
            }
        }

        System.out.println("Custo total: " + totalCost);
    }

    public void verticeDegree(String nodeId) {
        Node node = graphStructure.findNodeById(nodeId);
        Set<Node> neighbors = graphStructure.getNeighbors(node);
        int count = 0;
        for (Node neighbor : neighbors) {
            count++;
        }
        System.out.println("Vertice " + nodeId + " degree is " + count);
    }

    public void graphColoring(){
        int n = graphStructure.getNodeCount();
        int[][] coloringVector = new int[n][n];
        for (int i = 0; i < n; i++) {
            Node currentNode = graphStructure.findNodeById(Integer.toString(i));
            Set<Node> currentNeighbors = graphStructure.getNeighbors(currentNode);
            int[] neighbors = new int[n];
            for (Node neighbor : currentNeighbors) {
                int idx = Integer.parseInt(neighbor.getId());
                neighbors[idx] = 1;
            }
            boolean assigned = false;
            int k = 0;
            while (!assigned) {
                if(!inter(neighbors, coloringVector, n, k)){
                    coloringVector[k][i] = 1;
                    assigned = true;
                }
                else k++;
            }
        }
        System.out.println("\n╔═══════════════════════════════════════════════════╗");
        System.out.println  ("║                 Coloring Class                    ║");
        System.out.println  ("╚═══════════════════════════════════════════════════╝");
        for (int k = 0; k < n; k++){
            boolean emptyClass = true;
            for (int j = 0; j < n; j++){
                if (coloringVector[k][j] == 1) { emptyClass = false; break; }
            }
            if (!emptyClass){
                System.out.print("Cor " + (k+1) + ": { ");
                for (int j = 0; j < n; j++){
                    if (coloringVector[k][j] == 1) System.out.print("v" + (j+1) + " ");
                }
                System.out.println("}");
            }
        }
    }

    public static boolean inter(int[] v1, int[][] v2, int n, int k){
        for (int i = 0; i < n; i++){
            if (v1[i] == 1 && v2[k][i] == 1){
                return true;
            }
        }
        return false;
    }


}
