import React, { useState } from "react";
import { chatWithGPT } from '../chatGPT.ts'; 

type ChatComponentProps = {
  onNewMessage: (message: { role: "user" | "assistant"; content: string }) => void;
};

export type ChatMessage = {
    role: "user" | "assistant";
    content: string;
};

const ChatComponent: React.FC<ChatComponentProps> = ({ onNewMessage }) => {
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSubmit = async () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage  = { role: "user", content: input };
    onNewMessage(userMessage); // Update parent state
    setInput("");
    setIsTyping(true);

    const response: any = await chatWithGPT(input);
    const gptMessage: ChatMessage = { role: "assistant", content: response };
    
    onNewMessage(gptMessage); // Update parent state
    setIsTyping(false);
  };

  return (
    <div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask me anything..."
      />
      <button onClick={handleSubmit} disabled={isTyping}>
        {isTyping ? "Waiting..." : "Send"}
      </button>
      {isTyping && <p>ChatGPT is typing...</p>}
    </div>
  );
};

export default ChatComponent;