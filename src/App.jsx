import { useState } from "react";
import "./App.css";
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
    <div className="container">
      <form onSubmit={generateAnswer} className="form-container">
        <h1 className="heading">AI Assistant</h1>
        <p className="subheading">Your personal AI-powered assistant</p>
        <textarea
          required
          className="textarea"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask me anything..."
        ></textarea>
        <button
          type="submit"
          className={`button ${generatingAnswer ? 'button-disabled' : ''}`}
          disabled={generatingAnswer}
        >
          {generatingAnswer ? "Generating..." : "Generate Answer"}
        </button>
      </form>
      <div className="answer-container">
        {answer && (
          <>
            <h2 className="answer-heading">Your Answer</h2>
            <div className="answer-content">
              <ReactMarkdown>{answer}</ReactMarkdown>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
