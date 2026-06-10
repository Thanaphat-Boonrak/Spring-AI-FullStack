package com.AI.Spring_AI.Service;


import lombok.AllArgsConstructor;;
import lombok.RequiredArgsConstructor;
import org.springframework.ai.chat.model.ChatModel;
import org.springframework.ai.chat.model.ChatResponse;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.ai.google.genai.GoogleGenAiChatOptions;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class ChatService {
    private final ChatModel chatModel;

    public String getResponse(String message) {

        String prompt = """
            You are a professional AI assistant.

            Always answer using EXACTLY this format:

            📌 Summary
            <short summary>

            📖 Explanation
            <detailed explanation>

            ✅ Key Points
            • point 1
            • point 2
            • point 3

            💡 Example
            <example if applicable>

            Rules:
            - Use markdown.
            - Use headings and bullet points.
            - Keep responses well-structured.
            - Never return plain text only.
            - Always follow this format.

            User Question:
            %s
            """.formatted(message);

        ChatResponse response = chatModel.call(
                new Prompt(
                        prompt,
                        GoogleGenAiChatOptions.builder()
                                .model("gemini-2.5-flash-lite")
                                .build()
                )
        );

        if (response != null && response.getResult() != null) {
            return response.getResult().getOutput().getText();
        }

        return "Something went wrong";
    }
    
    
}
