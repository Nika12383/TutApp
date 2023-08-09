package com.baeldung.springbootreact.controller;
import com.baeldung.springbootreact.controller.RunEngine;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

@RestController
@RequestMapping("/query")
public class TutappController {
    @GetMapping("/{subject}/{grade}")
    public String getTutors(@PathVariable String subject, @PathVariable int grade) {
        return RunEngine.searchTutors("Tutor", subject, grade);
    }

}

