package com.baeldung.springbootreact.controller;

import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/query")
public class TutappController {

    @GetMapping("/{role}/{subject}/{grade}")
    public String getTutors(@PathVariable String role, @PathVariable String subject, @PathVariable String grade) {
        RunEngine re = new RunEngine();
        return re.searchTutors(role, subject, grade);
    }

}

