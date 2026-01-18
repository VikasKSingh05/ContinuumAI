import React from 'react';
import { Bot, Layers, Zap, ArrowRight, Database } from 'lucide-react';
import { motion } from 'framer-motion';
import Demo from './components/Demo';
import Logo from './assets/logo.png';

// Placeholder components
const Hero = () => (
  <section className="section" id="hero" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', paddingTop: '0' }}>
    <div className="container" style={{ textAlign: 'center' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.5rem 1rem',
          background: 'var(--bg-secondary)',
          borderRadius: '99px',
          marginBottom: '1.5rem',
          border: '1px solid var(--border-color)',
          fontSize: '0.875rem',
          color: 'var(--text-secondary)'
        }}>
          <Zap size={16} color="var(--accent-primary)" fill="var(--accent-primary)" />
          <span>Universal Context Portability Platform</span>
        </div>

        <h1 style={{
          fontSize: '4.5rem',
          fontWeight: '800',
          lineHeight: '1.1',
          marginBottom: '1.5rem',
          letterSpacing: '-0.02em'
        }}>
          Context-Aware AI,<br />
          <span className="text-gradient">Anywhere</span>
        </h1>

        <p style={{
          fontSize: '1.25rem',
          color: 'var(--text-secondary)',
          maxWidth: '600px',
          margin: '0 auto 2.5rem',
          lineHeight: '1.6'
        }}>
          Stop re-explaining yourself. Transfer your conversation context instantly between ChatGPT, Gemini, and Claude.
        </p>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <button className="btn-primary" onClick={() => document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            Try the Demo <ArrowRight size={18} />
          </button>
          <button className="glass-panel" onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })} style={{
            padding: '0.75rem 1.5rem',
            color: 'var(--text-primary)',
            cursor: 'pointer',
            fontWeight: 500
          }}>
            How it Works
          </button>
        </div>
      </motion.div>
    </div>
  </section>
);

const Problem = () => (
  <section className="section" id="problem" style={{ background: 'var(--bg-secondary)', minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
    <div className="container">
      <h2 style={{ fontSize: '2.5rem', marginBottom: '3rem', textAlign: 'center' }}>The Broken Workflow</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        <div className="glass-panel" style={{ padding: '2rem' }}>
          <h3 style={{ color: '#ef4444', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <Layers size={24} /> Without Continuum
          </h3>
          <ul style={{ listStyle: 'none', padding: 0, color: 'var(--text-secondary)', lineHeight: '2' }}>
            <li>❌ Locked inside one LLM</li>
            <li>❌ Copy-pasting massive logs</li>
            <li>❌ "I forgot what we agreed on"</li>
            <li>❌ Re-explaining constraints</li>
          </ul>
        </div>
        <div id="solution" className="glass-panel" style={{ padding: '2rem', borderColor: 'var(--accent-primary)' }}>
          <h3 style={{ color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <Bot size={24} /> With Continuum
          </h3>
          <ul style={{ listStyle: 'none', padding: 0, color: 'var(--text-secondary)', lineHeight: '2' }}>
            <li>✅ Portable semantic context</li>
            <li>✅ One-click transfer</li>
            <li>✅ Preserves intent & decisions</li>
            <li>✅ Model-agnostic memory</li>
          </ul>
        </div>
      </div>
    </div>
  </section>
);

function App() {
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="app">
      <nav style={{
        position: 'fixed',
        top: 0,
        width: '100%',
        padding: '1.5rem 0',
        zIndex: 50,
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(255,255,255,0.05)'
      }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div
            style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: 'bold', fontSize: '1.25rem', cursor: 'pointer' }}
            onClick={() => scrollTo('hero')}
          >
            <img src={Logo} alt="ContinuumAI Logo" style={{ width: 52, height: 32, borderRadius: 8 }} />
            ContinuumAI
          </div>
          <div style={{ display: 'flex', gap: '2rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            <span onClick={() => scrollTo('solution')} className="nav-link" style={{ cursor: 'pointer' }}>Solution</span>
            <span onClick={() => scrollTo('demo')} className="nav-link" style={{ cursor: 'pointer' }}>Demo</span>
          </div>
        </div>
      </nav>

      <main>
        <Hero />
        <Problem />
        <Demo id="demo" />
      </main>

      <footer style={{ padding: '2rem 0', borderTop: '1px solid var(--border-color)', marginTop: 'auto' }}>
        <div className="container" style={{ textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
          <p>Powered by Google Gemini & Firebase</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
