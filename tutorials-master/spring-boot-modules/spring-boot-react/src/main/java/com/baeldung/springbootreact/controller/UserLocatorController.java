package com.baeldung.springbootreact.controller;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/email")
public class UserLocatorController {
    @GetMapping("/{email}")
    public String emailExistence(@PathVariable String email){
        boolean existence = RunEngine.userExistence(email);
        return "{\"records\": \"" + existence + "\"}";
    }
}
