import { Table, Button } from 'react-bootstrap';
import '../styles/App.css';
import React, { useState } from 'react';
import ChatComponent, { ChatMessage } from '../modules/chatGPTComponents.tsx'
  
export const IdTokenData = (props) => {
    const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
    const handleNewMessage = (message: any) => {
        setChatHistory((prev) => [...prev, message]);
    };
    const clearHistory = () => {
        setChatHistory([]); // Reset conversation history
    };

    return (
        <>
            <div className="data-area-div">
                <p>
                    <strong> You are logged in </strong>. Talk with chatGPT here: {' '}
                    <ChatComponent onNewMessage={handleNewMessage} />
                </p>
                <div className="data-area-div">
                <h3>Conversation History</h3>
                <Table responsive striped bordered hover>
                <thead>
                    <tr>
                    <th>Role</th>
                    <th>Message</th>
                    </tr>
                </thead>
                <tbody>
                    {chatHistory.map((msg, index) => (
                    <tr key={index}>
                        <td>{msg.role === "user" ? "You" : "ChatGPT"}</td>
                        <td>{msg.content}</td>
                    </tr>
                    ))}
                </tbody>
                </Table>
                </div>
                <Button variant="danger" onClick={clearHistory} className="mb-2">
                    Clear History
                </Button>
            </div>
        </>
    );
};