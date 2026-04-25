package com.microwaves.careergraph.controller;

import com.microwaves.careergraph.dto.*;
import com.microwaves.careergraph.service.GraphService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/graph")
@CrossOrigin(origins = "*")
public class GraphController {
    private final GraphService graphService;

    public GraphController(GraphService graphService) {
        this.graphService = graphService;
    }

    @GetMapping
    public ResponseEntity<GraphDTO> getGraph() {
        return ResponseEntity.ok(graphService.getGraphData());
    }

    @PostMapping("/load")
    public ResponseEntity<Map<String, String>> loadGraph() {
        graphService.loadGraphFromFile();
        return ResponseEntity.ok(Map.of("message", "Graph loaded successfully"));
    }

    @PostMapping("/save")
    public ResponseEntity<Map<String, String>> saveGraph() {
        graphService.saveGraphToFile();
        return ResponseEntity.ok(Map.of("message", "Graph saved successfully"));
    }

    @GetMapping("/file")
    public ResponseEntity<Map<String, String>> getFileContent() {
        return ResponseEntity.ok(Map.of("content", graphService.getFileContent()));
    }

    @GetMapping("/connected")
    public ResponseEntity<Map<String, Boolean>> checkConnectivity() {
        return ResponseEntity.ok(Map.of("isConnected", graphService.isGraphConnected()));
    }

    @GetMapping("/nodes/{nodeId}")
    public ResponseEntity<NodeDTO> getNode(@PathVariable String nodeId) {
        return ResponseEntity.ok(graphService.getNodeById(nodeId));
    }

    @GetMapping("/nodes/{nodeId}/neighbors")
    public ResponseEntity<List<NodeDTO>> getNeighbors(@PathVariable String nodeId) {
        return ResponseEntity.ok(graphService.getNeighbors(nodeId));
    }

    @PostMapping("/nodes")
    public ResponseEntity<NodeDTO> createNode(@RequestBody CreateNodeRequest request) {
        return ResponseEntity.ok(graphService.createNode(request));
    }

    @DeleteMapping("/nodes/{nodeId}")
    public ResponseEntity<Map<String, String>> deleteNode(@PathVariable String nodeId) {
        graphService.deleteNode(nodeId);
        return ResponseEntity.ok(Map.of("message", "Node deleted successfully"));
    }

    @PostMapping("/edges")
    public ResponseEntity<EdgeDTO> createEdge(@RequestBody CreateEdgeRequest request) {
        return ResponseEntity.ok(graphService.createEdge(request));
    }

    @DeleteMapping("/edges")
    public ResponseEntity<Map<String, String>> deleteEdge(
            @RequestParam String sourceId,
            @RequestParam String targetId) {
        graphService.deleteEdge(sourceId, targetId);
        return ResponseEntity.ok(Map.of("message", "Edge deleted successfully"));
    }
}
