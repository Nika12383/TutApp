package com.baeldung.springbootreact.controller;

import org.springframework.web.bind.annotation.*;
import org.json.*;

@RestController
@RequestMapping("/create")
public class UserCreationController {
    @PostMapping
    public void newUser(@RequestBody String data) {
        JSONObject obj = new JSONObject(data);
        RunEngine.NewUser(obj.getString("role"), obj.getString("name"), obj.getString("pronouns"), obj.getString("personalEmail"), obj.getString("schoolEmail"), obj.getString("adultEmail"));
    }

}
/*
    async search(subject, grade) {



        let name = "jim"
        await fetch(/create/${name}/${pronouns}, {method: POST})
*/
