package com.AI.Spring_AI.Controller;


import com.AI.Spring_AI.Service.ChatService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
public class ChatController {
    
    private ChatService chatService;
    
    @GetMapping("ask-ai")
    public String getResponse(@RequestParam String message) {
        return chatService.getResponse(message);
    }
    
    
    
}
