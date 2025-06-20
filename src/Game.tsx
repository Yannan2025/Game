import React, { useState } from 'react';

// Charity: water logo SVG (simple drop)
const Logo = () => (
  <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
    <ellipse cx="30" cy="40" rx="18" ry="20" fill="#ffd700" />
    <path d="M30 6 C38 20, 54 32, 30 58 C6 32, 22 20, 30 6 Z" fill="#ffd700" stroke="#222" strokeWidth="2" />
  </svg>
);

// Simple confetti animation
const Confetti = () => (
  <div style={{
    position: 'absolute',
    top: 0, left: 0, width: '100%', height: '100%',
    pointerEvents: 'none',
    zIndex: 10,
    overflow: 'hidden',
  }}>
    {[...Array(30)].map((_, i) => (
      <div key={i} style={{
        position: 'absolute',
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 20}%`,
        width: 12, height: 12,
        borderRadius: '50%',
        background: ['#ffd700', '#00bfff', '#fff', '#222'][i % 4],
        opacity: 0.8,
        animation: `fall 1.5s ${Math.random()}s linear infinite`,
      }} />
    ))}
    <style>{`
      @keyframes fall {
        0% { transform: translateY(0); }
        100% { transform: translateY(80vh); }
      }
    `}</style>
  </div>
);

export default function Game() {
  const [score, setScore] = useState(0);
  const [win, setWin] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const maxScore = 10;

  // Responsive container style
  const containerStyle: React.CSSProperties = {
    minHeight: '100vh', minWidth: '100vw',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    background: 'linear-gradient(135deg, #00bfff 0%, #ffd700 100%)',
    fontFamily: 'Segoe UI, Arial, sans-serif',
    position: 'relative',
    padding: 0,
  };
  // Responsive card style
  const cardStyle: React.CSSProperties = {
    background: '#fff',
    padding: '2rem 2.5rem',
    borderRadius: '1.5rem',
    boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
    display: 'flex', flexDirection: 'column', alignItems: 'center',
    width: '90vw', maxWidth: 340,
    minHeight: 320,
    position: 'relative',
  };
  // Responsive for mobile
  const buttonStyle: React.CSSProperties = {
    marginTop: '1.5rem',
    padding: '1rem 2.2rem',
    fontSize: '1.2rem',
    border: 'none',
    borderRadius: '0.7rem',
    background: '#ffd700',
    color: '#222',
    fontWeight: 'bold',
    cursor: 'pointer',
    boxShadow: '0 2px 8px #00bfff22',
    width: '100%',
    maxWidth: 220,
    transition: 'background 0.2s',
  };
  const resetGame = () => {
    setScore(0);
    setWin(false);
    setShowConfetti(false);
  };
  const collectDrop = () => {
    if (win) return;
    const newScore = score + 1;
    setScore(newScore);
    if (newScore >= maxScore) {
      setWin(true);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 2000);
    }
  };
  return (
    <div style={containerStyle}>
      {showConfetti && <Confetti />}
      <div style={cardStyle}>
        <div style={{ marginBottom: 12 }}><Logo /></div>
        <h1 style={{ color: '#00bfff', fontSize: '1.5rem', margin: 0, textAlign: 'center' }}>charity: water Drop Game</h1>
        <div style={{ margin: '1.2rem 0', fontSize: '1.1rem', color: '#555', textAlign: 'center' }}>
          Collect water drops to help bring clean water!
        </div>
        <div style={{ fontSize: '1.3rem', fontWeight: 'bold', color: '#00bfff', marginBottom: 8 }}>
          💧 Score: {score}
        </div>
        <button style={buttonStyle} onClick={collectDrop} disabled={win}>
          {win ? 'You Win!' : 'Collect Water Drop 💧'}
        </button>
        <button style={{ ...buttonStyle, background: '#00bfff', color: '#fff', marginTop: 10 }} onClick={resetGame}>
          Reset
        </button>
        {win && (
          <div style={{ marginTop: 18, color: '#ffd700', fontWeight: 'bold', fontSize: '1.2rem', textAlign: 'center' }}>
            🎉 Congratulations! You brought clean water! 🎉
          </div>
        )}
      </div>
    </div>
  );
}
