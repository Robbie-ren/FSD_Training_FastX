package com.evaluation_1.repository;

import com.evaluation_1.model.Book;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookRepository extends JpaRepository<Book, Integer> {
    Page<Book> findByAuthorUserUsername(String username, Pageable pageable);
}
