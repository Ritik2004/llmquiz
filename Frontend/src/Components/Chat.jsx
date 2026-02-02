import React, { useState } from 'react'

const Chat = ({res, loading, socket, gameCode}) => {
  const[selectedOption, setSelectedOption] = useState({});
  const[answered, setAnswered] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const handleSubmit = () => {
    let score = 0;
    res.answer.forEach((q, index) => {
      if (selectedOption[index] === q.answer) score++;
    });
     socket.emit("submit_answer", {
    roomCode: gameCode, // you'll need to pass this as prop
    playerId: socket.id,
    score: score,
    totalQuestions: res.answer.length
  });
    setAnswered(`Your Score: ${score}/${res.answer.length}`);
    setIsSubmitted(true);
  };

  // 🔥 SHOW LOADING STATE
  if (loading) {
    return (
      <div style={{ padding: "40px", textAlign: "center" }}>
        <div style={{
          width: "60px",
          height: "60px",
          border: "6px solid #4b5563",
          borderTop: "6px solid #10b981",
          borderRadius: "50%",
          animation: "spin 1s linear infinite",
          margin: "0 auto"
        }} />
        <p style={{ fontSize: "18px", color: "white", marginTop: "15px" }}>
          Generating quiz...
        </p>

        <style>
          {`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}
        </style>
      </div>
    );
  }

  return (
    <div style={{paddingBottom: "80px"}}>

      {!loading && (!res.answer || res.answer.length === 0) && (
        <div style={{color: "white", textAlign: "center", fontSize: "18px", padding: "20px"}}>
          No questions available.
        </div>
      )}

      {res.answer && res.answer.length > 0 && res.answer.map((item, index) => (
        <div key={index} style={{
          marginBottom: "20px",
          padding: "15px",
          border: "1px solid #4b5563",
          borderRadius: "8px",
          backgroundColor: "#374151",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.3)"
        }}>
          <h3 style={{marginBottom: "15px", color: "white", fontSize: "18px"}}>{item.question}</h3>

          <div style={{display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px"}}>
            {item.options.map((option, optIndex) => (
              <button
                key={optIndex}
                style={{
                  padding: "10px",
                  border: "1px solid #6b7280",
                  borderRadius: "6px",
                  backgroundColor: selectedOption[index] === option ? "#2563eb" : "#4b5563",
                  color: "white",
                  cursor: "pointer",
                  fontSize: "14px"
                }}
                onClick={() => setSelectedOption({...selectedOption, [index]: option})}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      ))}

      {res.answer && res.answer.length > 0 && (
        <div style={{marginTop: "20px"}}>
          <button
            style={{
              padding: "10px 20px",
              borderRadius: "8px",
              border: "none",
              backgroundColor: "#10b981",
              color: "white",
              fontSize: "16px",
              cursor: "pointer"
            }}
            onClick={handleSubmit}
          >
            Submit Quiz
          </button>

          <div style={{marginTop: "10px", fontSize: "18px", color: "#fbbf24"}}>
            {answered}
          </div>

          {isSubmitted && res.answer.map((item, index) => (
            <span key={index} style={{color: "white", marginRight: "10px"}}>
              {item.answer}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default Chat;
