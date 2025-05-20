package com.example.board.config;

import io.swagger.v3.oas.models.ExternalDocumentation;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI boardOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Board API")
                        .description("닉네임 기반 게시판 API 문서")
                        .version("v1.0"))
                .externalDocs(new ExternalDocumentation()
                        .description("Github Repository"));
    }
}