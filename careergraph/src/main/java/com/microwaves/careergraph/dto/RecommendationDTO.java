package com.microwaves.careergraph.dto;

import com.microwaves.careergraph.domain.Node;
import lombok.Setter;

import java.util.List;


public record RecommendationDTO(List<Node> recommendations, List<Node> recommendedCategories) { }
