import React, { useEffect, useState } from 'react';
import { motion, useAnimation, useMotionValue, useSpring, useTransform } from 'framer-motion';

const Background = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    // Mouse tracking
    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({
                x: e.clientX,
                y: e.clientY
            });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // Smooth springs for mouse movement
    const springConfig = { damping: 25, stiffness: 50 };
    const mouseX = useSpring(useMotionValue(0), springConfig);
    const mouseY = useSpring(useMotionValue(0), springConfig);

    useEffect(() => {
        mouseX.set(mousePosition.x);
        mouseY.set(mousePosition.y);
    }, [mousePosition, mouseX, mouseY]);

    // Orb variants for random floating
    const orbFloat = {
        animate: {
            y: [0, -20, 0],
            x: [0, 10, 0],
            scale: [1, 1.1, 1],
            opacity: [1, 0.8, 1],
            transition: {
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
            }
        }
    };

    return (
        <div style={{
            position: 'fixed',
            inset: 0,
            zIndex: -10,
            overflow: 'hidden',
            backgroundColor: '#0a0a0d'
        }}>
            {/* Dynamic Gradient Orbs - Increased Opacity for Visibility */}

            {/* Orb 1: Follows mouse slightly opposite */}
            <motion.div
                style={{
                    position: 'absolute',
                    top: '-10%',
                    left: '-10%',
                    width: '50%',
                    height: '50%',
                    backgroundColor: 'rgba(37, 99, 235, 0.3)', // blue-600/30
                    borderRadius: '9999px',
                    filter: 'blur(100px)',
                    x: useTransform(mouseX, [0, window.innerWidth], [-50, 50]),
                    y: useTransform(mouseY, [0, window.innerHeight], [-50, 50])
                }}
                variants={orbFloat}
                animate="animate"
            />

            {/* Orb 2: Follows mouse directly but slower */}
            <motion.div
                style={{
                    position: 'absolute',
                    bottom: '-10%',
                    right: '-10%',
                    width: '50%',
                    height: '50%',
                    backgroundColor: 'rgba(147, 51, 234, 0.25)', // purple-600/25
                    borderRadius: '9999px',
                    filter: 'blur(100px)',
                    x: useTransform(mouseX, [0, window.innerWidth], [20, -20]),
                    y: useTransform(mouseY, [0, window.innerHeight], [20, -20])
                }}
                variants={{
                    animate: {
                        ...orbFloat.animate,
                        y: [0, 30, 0],
                        x: [0, -20, 0],
                        transition: { duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }
                    }
                }}
                animate="animate"
            />

            {/* Orb 3: Interactive cursor glow */}
            <motion.div
                style={{
                    position: 'absolute',
                    width: '600px',
                    height: '600px',
                    backgroundColor: 'rgba(99, 102, 241, 0.15)', // indigo-500/15
                    borderRadius: '9999px',
                    filter: 'blur(80px)',
                    pointerEvents: 'none',
                    x: mouseX,
                    y: mouseY,
                    translateX: '-50%',
                    translateY: '-50%'
                }}
            />

            {/* Noise Texture */}
            <div style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')",
                opacity: 0.03
            }}></div>
        </div>
    );
};

export default Background;
