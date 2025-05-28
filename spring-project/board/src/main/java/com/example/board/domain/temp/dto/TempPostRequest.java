package com.example.board.domain.temp.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TempPostRequest {
    private String title;
    private String content;
    private String category;
}