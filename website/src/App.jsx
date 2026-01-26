import React from 'react';
import { Bot, Layers, Zap, ArrowRight, Database, Eye, Brain, Save, Code, Sparkles, Cloud, Shield, Globe, Rocket } from 'lucide-react';
import { motion } from 'framer-motion';
import Demo from './components/Demo';
import Background from './components/Background';
import Logo from './assets/Logo.png';

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

const HowItWorks = () => {
  const steps = [
    {
      icon: Eye,
      title: 'Capture Visible Conversation',
      description: 'The extension reads what you already see on the page — no private APIs, no hidden data.'
    },
    {
      icon: Brain,
      title: 'Extract Semantic Context',
      description: 'Gemini processes the conversation to extract goal, constraints, decisions, and current state.'
    },
    {
      icon: Save,
      title: 'Store as Universal Data',
      description: 'Context is stored as structured JSON, independent of any specific LLM or interface.'
    },
    {
      icon: Code,
      title: 'Compile into Prompts',
      description: 'When switching LLMs, stored context is dynamically reconstructed into an optimized continuation prompt.'
    }
  ];

  const exampleContext = {
    goal: "Build a custom date picker for flight booking",
    key_points: ["Accessible (WCAG)", "Range selection support", "Tailwind CSS"],
    current_state: "Planning phase, user chose custom implementation",
    next_task: "Provide React component code for range date picker",
    response_style: "Technical, concise, code-heavy"
  };

  const examplePrompt = `Context Continuation:
The user is building a custom date picker for a flight booking app.
Constraints: Accessible (WCAG), Range Selection, Tailwind CSS.
Current State: Planning phase.
Goal: Provide the React code.`;

  return (
    <section className="section" id="how-it-works" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', textAlign: 'center' }}>How It Works</h2>
          <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '3rem', fontSize: '1.1rem' }}>
            Four steps to seamless context portability
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem', marginBottom: '4rem' }}>
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="glass-panel"
                  style={{ padding: '2rem' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                    <div style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '12px',
                      background: 'linear-gradient(135deg, var(--accent-primary), #8b5cf6)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <Icon size={24} color="white" />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>
                        Step {index + 1}
                      </div>
                      <h3 style={{ fontSize: '1.25rem', fontWeight: '600', margin: 0 }}>
                        {step.title}
                      </h3>
                    </div>
                  </div>
                  <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', margin: 0 }}>
                    {step.description}
                  </p>
                </motion.div>
              );
            })}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="glass-panel"
              style={{ padding: '2rem' }}
            >
              <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Database size={20} /> Universal Context Schema
              </h3>
              <div style={{
                background: '#1e293b',
                borderRadius: '8px',
                padding: '1rem',
                fontFamily: 'monospace',
                fontSize: '0.85rem',
                color: '#93c5fd',
                overflow: 'auto',
                maxHeight: '300px'
              }}>
                <pre style={{ margin: 0 }}>{JSON.stringify(exampleContext, null, 2)}</pre>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginTop: '1rem', marginBottom: 0 }}>
                No chat history. No LLM-specific wording. Only human intent and progress.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="glass-panel"
              style={{ padding: '2rem' }}
            >
              <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Code size={20} /> Reconstructed Prompt
              </h3>
              <div style={{
                background: '#000',
                borderRadius: '8px',
                padding: '1rem',
                fontFamily: 'monospace',
                fontSize: '0.85rem',
                color: '#d1d5db',
                overflow: 'auto',
                maxHeight: '300px',
                whiteSpace: 'pre-wrap',
                lineHeight: '1.6'
              }}>
                {examplePrompt}
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginTop: '1rem', marginBottom: 0 }}>
                Context is compiled at runtime, optimized for the target LLM.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const GoogleTech = () => {
  const technologies = [
    {
      icon: Sparkles,
      name: 'Gemini API',
      role: 'Semantic understanding & prompt reconstruction',
      description: 'Extracts structured context from conversations and generates model-agnostic continuation prompts.'
    },
    {
      icon: Database,
      name: 'Cloud Firestore',
      role: 'Persistent context storage',
      description: 'Stores structured context data with real-time synchronization, independent of any LLM.'
    },
    {
      icon: Cloud,
      name: 'Cloud Functions',
      role: 'Backend orchestration',
      description: 'Orchestrates context processing, transformation, and secure API interactions.'
    },
    {
      icon: Shield,
      name: 'Firebase Authentication',
      role: 'User identity & ownership',
      description: 'Provides secure user authentication and identity management for context ownership.'
    },
    {
      icon: Globe,
      name: 'Chrome Extension',
      role: 'Browser-level context capture & injection',
      description: 'Enables non-invasive context capture and injection for browser-based LLMs.'
    }
  ];

  return (
    <section className="section" id="google-tech" style={{ background: 'var(--bg-secondary)', minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', textAlign: 'center' }}>Powered by Google Technologies</h2>
          <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '3rem', fontSize: '1.1rem' }}>
            Each technology plays a critical role in enabling context portability
          </p>

          <div className="glass-panel" style={{ padding: '2rem', marginBottom: '2rem' }}>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <th style={{ padding: '1rem', textAlign: 'left', color: 'var(--text-primary)', fontWeight: '600' }}>Technology</th>
                    <th style={{ padding: '1rem', textAlign: 'left', color: 'var(--text-primary)', fontWeight: '600' }}>Role</th>
                  </tr>
                </thead>
                <tbody>
                  {technologies.map((tech, index) => {
                    const Icon = tech.icon;
                    return (
                      <tr key={index} style={{ borderBottom: '1px solid var(--border-color)' }}>
                        <td style={{ padding: '1rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          <Icon size={20} color="var(--accent-primary)" />
                          <span style={{ fontWeight: '500' }}>{tech.name}</span>
                        </td>
                        <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>{tech.role}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {technologies.map((tech, index) => {
              const Icon = tech.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="glass-panel"
                  style={{ padding: '1.5rem' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                    <Icon size={24} color="var(--accent-primary)" />
                    <h3 style={{ fontSize: '1.1rem', fontWeight: '600', margin: 0 }}>{tech.name}</h3>
                  </div>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.6', margin: 0 }}>
                    {tech.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const FutureScope = () => {
  const futureFeatures = [
    {
      icon: Code,
      title: 'IDE Integration',
      description: 'VS Code extension for seamless context transfer between IDE-based AI assistants.'
    },
    {
      icon: Bot,
      title: 'Team-Shared Contexts',
      description: 'Collaborative contexts that teams can share and build upon together.'
    },
    {
      icon: Database,
      title: 'Versioned Context History',
      description: 'Track context evolution over time with full version control and branching.'
    },
    {
      icon: Globe,
      title: 'More LLM Adapters',
      description: 'Extend support to additional LLM platforms and custom model integrations.'
    }
  ];

  return (
    <section className="section" id="future-scope" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <Rocket size={24} color="var(--accent-primary)" />
              <h2 style={{ fontSize: '2.5rem', margin: 0 }}>Future Scope</h2>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '700px', margin: '0 auto' }}>
              The same universal context schema works everywhere. Our architecture is designed to scale beyond browser-based LLMs.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' }}>
            {futureFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="glass-panel"
                  style={{ padding: '2rem', borderColor: 'var(--border-color)' }}
                >
                  <div style={{ display: 'flex', alignItems: 'start', gap: '1rem' }}>
                    <div style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '12px',
                      background: 'rgba(59, 130, 246, 0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      border: '1px solid rgba(59, 130, 246, 0.2)'
                    }}>
                      <Icon size={24} color="var(--accent-primary)" />
                    </div>
                    <div>
                      <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem', marginTop: 0 }}>
                        {feature.title}
                      </h3>
                      <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', margin: 0 }}>
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="glass-panel"
            style={{
              padding: '2rem',
              marginTop: '3rem',
              textAlign: 'center',
              borderColor: 'var(--accent-primary)',
              background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.05), rgba(139, 92, 246, 0.05))'
            }}
          >
            <p style={{ fontSize: '1.1rem', color: 'var(--text-primary)', margin: 0, fontWeight: '500' }}>
              <strong>Vision:</strong> To make AI conversations continuous, portable, and independent of any single language model, enabling users to think once and work seamlessly across multiple AI platforms.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

function App() {
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="app">
      <Background />
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
            <span onClick={() => scrollTo('problem')} className="nav-link" style={{ cursor: 'pointer' }}>Problem</span>
            <span onClick={() => scrollTo('how-it-works')} className="nav-link" style={{ cursor: 'pointer' }}>How It Works</span>
            <span onClick={() => scrollTo('demo')} className="nav-link" style={{ cursor: 'pointer' }}>Demo</span>
            <span onClick={() => scrollTo('google-tech')} className="nav-link" style={{ cursor: 'pointer' }}>Technology</span>
            <span onClick={() => scrollTo('future-scope')} className="nav-link" style={{ cursor: 'pointer' }}>Future</span>
          </div>
        </div>
      </nav>

      <main>
        <Hero />
        <Problem />
        <HowItWorks />
        <Demo id="demo" />
        <GoogleTech />
        <FutureScope />
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
