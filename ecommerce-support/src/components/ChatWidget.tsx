import {useState,useEffect,useRef} from 'react';
import './ChatWidget.css';
import {MessageCircle,X,Send,Bot,User} from 'lucide-react';
import {motion,AnimatePresence} from 'framer-motion';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';

interface Message {
    id: number;
    text: string;
    sender: 'user'|'bot';
}

const ChatWidget=() => {
    const [isOpen,setIsOpen]=useState(false);
    const [messages,setMessages]=useState<Message[]>([
        {id: 1,text: "Hello! 👋 I'm your support assistant. How can I help you today?",sender: 'bot'}
    ]);
    const [input,setInput]=useState("");
    const [isLoading,setIsLoading]=useState(false);
    const messagesEndRef=useRef<HTMLDivElement>(null);

    const toggleChat=() => setIsOpen(!isOpen);

    const scrollToBottom=() => {
        messagesEndRef.current?.scrollIntoView({behavior: "smooth"});
    };

    useEffect(() => {
        scrollToBottom();
    },[messages]);

    const handleSend=async () => {
        if (!input.trim()) return;

        const userMessage: Message={id: Date.now(),text: input,sender: 'user'};
        setMessages(prev => [...prev,userMessage]);
        setInput("");
        setIsLoading(true);

        try {
            // Connect to the backend API (uses environment variable in production)
            const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
            const response=await axios.post(`${API_URL}/chat`,{
                message: input
            });

            const botMessage: Message={
                id: Date.now()+1,
                text: response.data.response,
                sender: 'bot'
            };
            setMessages(prev => [...prev,botMessage]);
        } catch (error) {
            console.error("Error sending message:",error);
            const errorMessage: Message={
                id: Date.now()+1,
                text: "Sorry, I'm having trouble connecting to the server. Please try again later.",
                sender: 'bot'
            };
            setMessages(prev => [...prev,errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress=(e: React.KeyboardEvent) => {
        if (e.key==='Enter'&&!e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="chat-widget-container">
            <AnimatePresence>
                {isOpen&&(
                    <motion.div
                        className="chat-window"
                        initial={{opacity: 0,scale: 0.8,y: 20}}
                        animate={{opacity: 1,scale: 1,y: 0}}
                        exit={{opacity: 0,scale: 0.8,y: 20}}
                        transition={{type: "spring",stiffness: 300,damping: 25}}
                    >
                        <div className="chat-header">
                            <div className="bot-avatar">
                                <Bot size={24} color="white" />
                            </div>
                            <div className="chat-title">
                                <h3>Support Assistant</h3>
                                <span>Online</span>
                            </div>
                            <button onClick={toggleChat} style={{marginLeft: 'auto',background: 'transparent',width: 'auto',height: 'auto',padding: '5px'}}>
                                <X size={20} color="rgba(255,255,255,0.7)" />
                            </button>
                        </div>



                        <div className="chat-messages">
                            {messages.map((msg) => (
                                <div key={msg.id} className={`message ${msg.sender}`}>
                                    <ReactMarkdown>{msg.text}</ReactMarkdown>
                                </div>
                            ))}

                            {isLoading&&(
                                <div className="typing-indicator">
                                    <div className="dot"></div>
                                    <div className="dot"></div>
                                    <div className="dot"></div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        <div className="chat-input-area">
                            <input
                                type="text"
                                className="chat-input"
                                placeholder="Type your message..."
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={handleKeyPress}
                                disabled={isLoading}
                            />
                            <button className="send-btn" onClick={handleSend} disabled={isLoading}>
                                <Send size={20} color="white" />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                className="chat-toggle-btn"
                onClick={toggleChat}
                whileHover={{scale: 1.1}}
                whileTap={{scale: 0.9}}
            >
                {isOpen? <X size={28} color="white" />:<MessageCircle size={28} color="white" />}
            </motion.button>
        </div>
    );
};

export default ChatWidget;
