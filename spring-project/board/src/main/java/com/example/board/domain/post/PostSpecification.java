package com.example.board.domain.post;

import com.example.board.domain.post.dto.PostSearch;
import org.springframework.data.jpa.domain.Specification;

public class PostSpecification {

    public static Specification<Post> search(PostSearch search) {
        return (root, query, cb) -> {
            var predicates = cb.conjunction();

            if (search.getTitle() != null && !search.getTitle().isEmpty()) {
                predicates = cb.and(predicates,
                        cb.like(cb.lower(root.get("title")), "%" + search.getTitle().toLowerCase() + "%"));
            }
            if (search.getCategory() != null && !search.getCategory().isEmpty()) {
                predicates = cb.and(predicates,
                        cb.equal(root.get("category"), search.getCategory()));
            }
            if (search.getWriter() != null && !search.getWriter().isEmpty()) {
                predicates = cb.and(predicates,
                        cb.equal(root.get("user").get("nickname"), search.getWriter()));
            }
            return predicates;
        };
    }
}