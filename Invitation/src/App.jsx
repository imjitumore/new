import React, { useState, useEffect } from "react";

export default function App() {
  const [showConfetti, setShowConfetti] = useState(false);
  const [answer, setAnswer] = useState("");

  const handleAnswer = async (ans) => {
  setAnswer(ans);
  setShowConfetti(true);

  try {
    await fetch("https://new-u3c9.onrender.com/api", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ answer: ans }),
    });


    setTimeout(() => {
    setShowConfetti(false);
    if (ans === "Yes") {
      window.close();
    }
  }, 2000);

    console.log("✅ Answer saved:", ans);
  } catch (error) {
    console.error("❌ Error saving answer:", error);
  }

  setTimeout(() => setShowConfetti(false), 3000);
};

  return (
    <div className="relative flex flex-col items-center justify-center h-screen overflow-hidden bg-black text-white">
      <HeartBackground />

      <h1 className="text-4xl sm:text-6xl font-bold mb-8 animate-gradient-text bg-gradient-to-r from-pink-600 to-white bg-clip-text text-transparent">
        Hii Samruddhi Abdagire
      </h1>

      {/* Question */}
      <p className="text-lg sm:text-3xl mb-6 z-10">
        Can we both go together for Bappa Darshan?
      </p>

      {/* Buttons */}
      <div className="flex gap-6 z-10">
        <button
          onClick={() => handleAnswer("Yes")}
          className="px-6 py-3 bg-pink-500 hover:bg-pink-600 rounded-lg shadow-lg text-lg"
        >
          Yes
        </button>
        <button
          onClick={() => handleAnswer("No")}
          className="px-6 py-3 bg-gray-600 hover:bg-gray-700 rounded-lg shadow-lg text-lg"
        >
          No
        </button>
      </div>

      {/* Response */}
      {answer && (
        <p className="mt-6 text-xl z-10">
          Thank you for your response ❤️
        </p>
      )}

      {/* Confetti Blast */}
      {showConfetti && <ConfettiBlast />}
    </div>
  );
}

// ❤️ Floating Background Hearts
function HeartBackground() {
  const hearts = Array.from({ length: 15 });

  return (
    <div className="absolute inset-0 overflow-hidden z-0">
      {hearts.map((_, i) => (
        <span
          key={i}
          className="absolute text-pink-400 text-6xl animate-float"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDuration: `${6 + Math.random() * 5}s`,
            animationDelay: `${Math.random() * 5}s`,
          }}
        >
          ❤️
        </span>
      ))}
    </div>
  );
}

// 🎉 Confetti Blast Hearts
function ConfettiBlast() {
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    const newHearts = Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      animationDuration: 2 + Math.random() * 2,
      size: 20 + Math.random() * 20,
    }));
    setHearts(newHearts);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none z-50">
      {hearts.map((heart) => (
        <span
          key={heart.id}
          className="absolute animate-blast"
          style={{
            left: `${heart.left}%`,
            fontSize: `${heart.size}px`,
            animationDuration: `${heart.animationDuration}s`,
          }}
        >
          ❤️
        </span>
      ))}
    </div>
  );
}
