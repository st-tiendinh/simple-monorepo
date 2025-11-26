import { Button, Calendar } from '@monorepo/packages/ui';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Welcome to Vite</h1>
          <p className="hero-subtitle">Lightning fast development experience</p>
          <div className="date-badge">
            <svg
              className="calendar-icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            <Calendar />
          </div>
        </div>
      </div>

      <div className="feature-section">
        <div className="feature-card">
          <div className="feature-icon">⚡</div>
          <h3>Fast & Modern</h3>
          <p>Built with Vite for instant hot module replacement</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">🎨</div>
          <h3>Beautiful UI</h3>
          <p>Clean and modern design system</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">🚀</div>
          <h3>Production Ready</h3>
          <p>Optimized build for deployment</p>
        </div>
      </div>

      <div className="cta-section">
        <h2>Get Started</h2>
        <p className="cta-description">Try out our interactive components</p>
        <div className="button-group">
          <Button onClick={() => alert('Hello from Vite!')}>Get Started</Button>
          <Button
            variant="secondary"
            onClick={() => console.log('Secondary button')}
          >
            Learn More
          </Button>
        </div>
      </div>
    </div>
  );
}

export default App;
