import React, { useState } from "react";
import { msalInstance } from "../authConfig.ts";
import { InteractionRequiredAuthError } from "@azure/msal-browser";
import { authenticateChatbot, sendMessageToBot } from "../chatbot.ts";


const Chatbox: React.FC = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [messages, setMessages] = useState<any[]>([]);
    const [input, setInput] = useState<string>("");

    // Toggle chatbox visibility
    const toggleChat = () => setIsOpen(!isOpen);

    // Send message to chatbot API
    const sendMessage = async () => {
        if (!input.trim()) return;
        const request = {
            scopes: ["User.Read"],
        };
        try {
            await authenticateChatbot("", "");
            const resMessage = await sendMessageToBot(input);
            
            setMessages([...messages, { text: input, sender: "user" }, { text: resMessage, sender: "bot" }]);
            setInput("");
        } catch (error) {
            console.error("Error acquiring token or calling API:", error);
            if (error instanceof InteractionRequiredAuthError) {
                await msalInstance.acquireTokenRedirect(request);
            }
        }
    };

    return (
        <div className="chat-container">
            <button className="chat-toggle" onClick={toggleChat}>
                💬 Chat
            </button>
            
            {isOpen && (
                <div className="chatbox">
                    <div className="chat-header">
                        <span>Chat with Bot</span>
                        <button onClick={toggleChat}>✖</button>
                    </div>
                    <div className="chat-messages">
                        {messages.map((msg, index) => (
                            <div key={index} className={msg.sender === "user" ? "message user" : "message bot"}>
                                {msg.text}
                            </div>
                        ))}
                    </div>
                    <div className="chat-input">
                        <input 
                            type="text" 
                            value={input} 
                            onChange={(e) => setInput(e.target.value)} 
                            placeholder="Type a message..." 
                        />
                        <button onClick={sendMessage}>Send</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Chatbox;