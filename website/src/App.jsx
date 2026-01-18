import React from 'react';
import { Bot, Layers, Zap, ArrowRight, Database } from 'lucide-react';
import { motion } from 'framer-motion';
import Demo from './components/Demo';

// Placeholder components
const Hero = () => (
  <section className="section" style={{ paddingTop: '8rem', paddingBottom: '6rem' }}>
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
          <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            Try the Demo <ArrowRight size={18} />
          </button>
          <button className="glass-panel" style={{
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
  <section className="section" style={{ background: 'var(--bg-secondary)' }}>
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
        <div className="glass-panel" style={{ padding: '2rem', borderColor: 'var(--accent-primary)' }}>
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: 'bold', fontSize: '1.25rem' }}>
            <div style={{ width: 32, height: 32, background: 'var(--accent-primary)', borderRadius: 8 }}></div>
            ContinuumAI
          </div>
          <div style={{ display: 'flex', gap: '2rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            <span>Problem</span>
            <span>Solution</span>
            <span>Demo</span>
          </div>
        </div>
      </nav>

      <main>
        <Hero />
        <Problem />
        <Demo />
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
