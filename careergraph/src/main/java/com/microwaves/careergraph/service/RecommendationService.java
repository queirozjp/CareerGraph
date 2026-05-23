package com.microwaves.careergraph.service;

import com.microwaves.careergraph.domain.Course;
import com.microwaves.careergraph.domain.Node;
import com.microwaves.careergraph.dto.RecommendationDTO;
import com.microwaves.careergraph.entities.User;
import com.microwaves.careergraph.repository.CourseRepository;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class RecommendationService {

    CourseRepository courseRepository;

    public RecommendationService(CourseRepository courseRepository) {
        this.courseRepository = courseRepository;
    }

    public RecommendationDTO recommendationEngine(GraphStructure graph, User user) {
        Map<String, Double> scores = user.getScores();

        List<Map.Entry<String, Double>> top4Categories = scores.entrySet()
                .stream()
                .sorted(Map.Entry.<String, Double>comparingByValue().reversed())
                .limit(4)
                .toList();

        List<String> categories = new ArrayList<>();
        List<Node> recommendedCategories = new ArrayList<>();

        for (Map.Entry<String, Double> entry : top4Categories) {
            categories.add(entry.getKey());
            Node categorie = graph.findNodeById(entry.getKey());
            recommendedCategories.add(categorie);
        }

        Map<String, Integer> distanceSums = new HashMap<>();

        for (String categoryId : categories) {

            Node startNode = graph.findNodeById(categoryId);

            if (startNode == null)
                continue;

            Queue<Node> queue = new LinkedList<>();
            Map<String, Integer> distances = new HashMap<>();
            Set<String> visited = new HashSet<>();

            queue.add(startNode);
            distances.put(startNode.getId(), 0);
            visited.add(startNode.getId());

            while (!queue.isEmpty()) {

                Node currentNode = queue.poll();
                int currentDistance = distances.get(currentNode.getId());

                for (Node neighbor : graph.getNeighbors(currentNode)) {

                    if (!visited.contains(neighbor.getId())) {

                        visited.add(neighbor.getId());
                        queue.add(neighbor);

                        distances.put(neighbor.getId(), currentDistance + 1);

                        if (neighbor instanceof Course) {

                            distanceSums.put(
                                    neighbor.getId(),
                                    distanceSums.getOrDefault(neighbor.getId(), 0) + (currentDistance + 1));
                        }
                    }
                }
            }
        }

        List<Map.Entry<String, Integer>> sortedDistances =
                new ArrayList<>(distanceSums.entrySet());

        sortedDistances.sort(Map.Entry.comparingByValue());

        List<Node> top5 = new ArrayList<>();

        for (int i = 0; i < Math.min(5, sortedDistances.size()); i++) {

            String id = sortedDistances.get(i).getKey();

            top5.add(graph.findNodeById(id));
        }

        return new RecommendationDTO(
                top5,
                recommendedCategories
        );
    }




}
