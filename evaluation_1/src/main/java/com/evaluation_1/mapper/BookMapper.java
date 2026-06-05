package com.evaluation_1.mapper;

import com.evaluation_1.dto.BookResponseDto;
import com.evaluation_1.model.Book;
import org.springframework.stereotype.Component;

@Component
public class BookMapper {

    public BookResponseDto mapToDto(Book book){
        return new BookResponseDto(book.getId(),
                book.getTitle(),
                book.getAuthor().getName(),
                book.getAuthor().getEmail());
    }
}
