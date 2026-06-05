package com.evaluation_1.service;

import com.evaluation_1.dto.BookResponseDto;
import com.evaluation_1.mapper.BookMapper;
import com.evaluation_1.model.Book;
import com.evaluation_1.repository.BookRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class BookService {
    private final BookRepository bookRepository;
    private final BookMapper bookMapper;

    public List<BookResponseDto> getAllBooks(String username, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        List<Book> list = bookRepository.findByAuthorUserUsername(username, pageable).getContent();
        return list.stream().map(bookMapper::mapToDto).toList();
    }
}
