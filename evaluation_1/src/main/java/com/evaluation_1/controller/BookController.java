package com.evaluation_1.controller;

import com.evaluation_1.dto.BookResponseDto;
import com.evaluation_1.service.BookService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/books")
@AllArgsConstructor
public class BookController {

    private final BookService bookService;

    @GetMapping("/getAllBooks")
    public List<BookResponseDto> getAllBooks(Principal principal,
                                             @RequestParam(defaultValue = "0", required = false) int page,
                                             @RequestParam(defaultValue = "10", required = false) int size){
        String username = principal.getName();
        return bookService.getAllBooks(username, page, size);
    }
}
