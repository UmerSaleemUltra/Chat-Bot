import { useState } from "react";
import "./App.css"; // Include your custom CSS file
import axios from "axios";
import ReactMarkdown from "react-markdown";

function App() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [generatingAnswer, setGeneratingAnswer] = useState(false);

  const API_KEY = "AIzaSyC2EW8emCr12f12bKPkm_Y41tSl5QnOCQ0"; // Hardcoded API key

  
  async function generateAnswer(e) {
    setGeneratingAnswer(true);
    e.preventDefault();
    setAnswer("Please wait while we generate the answer...");
    try {
      const response = await axios({
        url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`,
        method: "post",
        data: {
          contents: [{ parts: [{ text: question }] }],
        },
      });

      setAnswer(
        response["data"]["candidates"][0]["content"]["parts"][0]["text"]
      );
    } catch (error) {
      console.log(error);
      setAnswer("An error occurred. Please try again.");
    }
    setGeneratingAnswer(false);
  }

  return (
    <div className="chat-container">
      <div className="chatbox">
        <div className="header">
          <h1 className="heading">AI Assistant</h1>
          <p className="subheading">Your personal AI-powered assistant</p>
        </div>
        <div className="messages">
          <div className="bot-message">How can I help you?</div>
          <div className="user-message">{question}</div>
          {answer &&  <div className="bot-message"><ReactMarkdown>{answer}</ReactMarkdown></div>}
        </div>
        <form onSubmit={generateAnswer} className="input-container">
          <textarea
            required
            className="input-box"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Type your message..."
          ></textarea>
          <button
            type="submit"
            className={`submit-button ${generatingAnswer ? 'button-disabled' : ''}`}
            disabled={generatingAnswer}
          >
            {generatingAnswer ? "Generating..." : "Send"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
