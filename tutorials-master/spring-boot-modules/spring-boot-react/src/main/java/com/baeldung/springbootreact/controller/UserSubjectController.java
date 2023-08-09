package com.baeldung.springbootreact.controller;

import org.springframework.web.bind.annotation.*;
import org.json.*;

@RestController
@RequestMapping("/assign")
public class UserSubjectController {
    @PostMapping
    public void assignSubject(@RequestBody String data) {
        JSONObject obj = new JSONObject(data);
        RunEngine.AssignSubject(obj.getString("name"), obj.getString("subject"), obj.getInt("grade"));
    }

}