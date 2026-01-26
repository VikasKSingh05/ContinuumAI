import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, FileJson, MessageSquare, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { extractContext, reconstructPrompt, formatChatTranscript } from '../services/api';

// Default demo chat - users can modify this
const DEFAULT_CHAT = [
    { role: 'user', content: "I need a date picker for my flight booking app. Must be accessible." },
    { role: 'assistant', content: "I can help with that. Do you want to use a library like generic-ui or build from scratch?" },
    { role: 'user', content: "Build from scratch using Tailwind. Make sure it supports range selection." }
];

const Demo = () => {
    const [step, setStep] = useState(0); // 0: Chat, 1: Extracting, 2: JSON, 3: Transferring, 4: Target
    const [chatMessages, setChatMessages] = useState(DEFAULT_CHAT);
    const [extractedContext, setExtractedContext] = useState(null);
    const [contextId, setContextId] = useState(null);
    const [reconstructedPromptText, setReconstructedPromptText] = useState('');
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleCaptureContext = async () => {
        setError(null);
        setIsLoading(true);
        setStep(1); // Show extracting state

        try {
            // Format chat messages into transcript
            const transcript = formatChatTranscript(chatMessages);
            
            // Call backend to extract context
            const result = await extractContext(transcript);
            
            setExtractedContext(result.context);
            setContextId(result.contextId);
            setStep(2); // Show JSON context
        } catch (err) {
            console.error('Error extracting context:', err);
            setError(err.message || 'Failed to extract context. Make sure the backend is running.');
            setStep(0); // Reset to start
        } finally {
            setIsLoading(false);
        }
    };

    const handleReconstructPrompt = async () => {
        if (!extractedContext && !contextId) {
            setError('No context available to reconstruct');
            return;
        }

        setError(null);
        setIsLoading(true);
        setStep(3); // Show reconstructing state

        try {
            // Call backend to reconstruct prompt
            const result = await reconstructPrompt(contextId, extractedContext);
            
            setReconstructedPromptText(result.prompt);
            setStep(4); // Show final prompt
        } catch (err) {
            console.error('Error reconstructing prompt:', err);
            setError(err.message || 'Failed to reconstruct prompt. Make sure the backend is running.');
            setStep(2); // Go back to JSON view
        } finally {
            setIsLoading(false);
        }
    };

    const handleNextStep = () => {
        if (step === 0) {
            handleCaptureContext();
        } else if (step === 2) {
            handleReconstructPrompt();
        } else {
            setStep(s => Math.min(s + 1, 4));
        }
    };

    const reset = () => {
        setStep(0);
        setExtractedContext(null);
        setContextId(null);
        setReconstructedPromptText('');
        setError(null);
        setIsLoading(false);
        setChatMessages(DEFAULT_CHAT);
    };

    return (
        <section className="section" id="demo">
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>See it in Action</h2>
                    <p style={{ color: 'var(--text-secondary)' }}>From ChatGPT to Claude in 10 seconds.</p>
                </div>

                <div className="glass-panel" style={{ minHeight: '500px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', padding: '2rem', alignItems: 'start' }}>
                    {/* Source Side */}
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 'bold' }}>
                                <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#10a37f' }}></div>
                                ChatGPT (Source)
                            </div>
                            {step === 0 && <span className="badge">Active</span>}
                        </div>

                        <div style={{ background: '#000', borderRadius: '8px', padding: '1rem', height: '300px', overflowY: 'auto', border: step === 1 ? '2px solid var(--accent-primary)' : '1px solid #333', transition: 'all 0.3s' }}>
                            {chatMessages.map((msg, i) => (
                                <div key={i} style={{ marginBottom: '1rem', display: 'flex', flexDirection: 'column', alignItems: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
                                    <div style={{
                                        background: msg.role === 'user' ? '#1c1c24' : '#2d2d3a',
                                        padding: '0.5rem 1rem',
                                        borderRadius: '8px',
                                        maxWidth: '80%',
                                        fontSize: '0.9rem',
                                        color: '#eaeaeb'
                                    }}>
                                        {msg.content}
                                    </div>
                                </div>
                            ))}
                            {step === 1 && (
                                <motion.div
                                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                    style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-primary)', fontSize: '0.875rem', marginTop: '1rem' }}
                                >
                                    <Loader2 className="spin" size={14} /> Extracting Context...
                                </motion.div>
                            )}
                        </div>
                    </div>

                    {/* Transformation / Target Side */}
                    <div style={{ position: 'relative' }}>
                        {step >= 2 ? (
                            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 'bold' }}>
                                        {step === 2 ? <FileJson size={16} /> : <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#d97757' }}></div>}
                                        {step === 2 ? 'Universal Context' : 'Claude (Target)'}
                                    </div>
                                </div>

                                {step === 2 && extractedContext && (
                                    <div style={{ background: '#1e293b', borderRadius: '8px', padding: '1rem', height: '300px', fontFamily: 'monospace', fontSize: '0.8rem', color: '#93c5fd', overflow: 'auto' }}>
                                        <pre style={{ margin: 0 }}>{JSON.stringify(extractedContext, null, 2)}</pre>
                                    </div>
                                )}

                                {step >= 3 && (
                                    <div style={{ background: '#000', borderRadius: '8px', padding: '1rem', height: '300px', border: '1px solid #333' }}>
                                        {step === 3 ? (
                                            <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)' }}>
                                                <Loader2 className="spin" size={32} />
                                                <p style={{ marginTop: '1rem' }}>Restoring Context...</p>
                                            </div>
                                        ) : (
                                            <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                                                <div style={{ color: '#d1d5db', fontSize: '0.9rem', marginBottom: '1rem', borderBottom: '1px solid #333', paddingBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                    <CheckCircle2 size={16} color="#10a37f" /> Context Restored
                                                </div>
                                                <div style={{ color: '#fff', fontSize: '0.9rem', lineHeight: '1.6', overflowY: 'auto', flex: 1, whiteSpace: 'pre-wrap' }}>
                                                    {reconstructedPromptText || 'No prompt generated'}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </motion.div>
                        ) : (
                            <div style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)', border: '1px dashed #333', borderRadius: '8px' }}>
                                Waiting for context capture...
                            </div>
                        )}
                    </div>
                </div>

                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="glass-panel"
                        style={{
                            marginTop: '2rem',
                            padding: '1rem',
                            border: '1px solid #ef4444',
                            background: 'rgba(239, 68, 68, 0.1)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            color: '#ef4444'
                        }}
                    >
                        <AlertCircle size={20} />
                        <span>{error}</span>
                    </motion.div>
                )}

                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem', gap: '1rem' }}>
                    <button 
                        className="btn-primary" 
                        onClick={step === 4 ? reset : handleNextStep} 
                        disabled={isLoading}
                        style={{ minWidth: '150px', opacity: isLoading ? 0.6 : 1, cursor: isLoading ? 'not-allowed' : 'pointer' }}
                    >
                        {step === 0 && "Capture Context"}
                        {step === 1 && "Extracting..."}
                        {step === 2 && "Load in Claude"}
                        {step === 3 && "Restoring..."}
                        {step === 4 && "Reset Demo"}
                    </button>
                </div>
            </div>
            <style>{`
        .spin { animation: spin 1s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
        </section>
    );
};

export default Demo;
