package com.microwaves.careergraph.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class NodeDTO {
    private String id;
    private String name;
    private String type; // "CATEGORY" or "COURSE"
}
