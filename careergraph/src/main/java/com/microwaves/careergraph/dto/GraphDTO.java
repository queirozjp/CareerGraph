package com.microwaves.careergraph.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GraphDTO {
    private int nodeCount;
    private int edgeCount;
    private List<NodeDTO> nodes;
    private List<EdgeDTO> edges;
    private boolean isConnected;
}
