import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const STAR_COUNT = 50;
const LINE_COUNT = 15;

export default function Constellations({ side = 'left' }) {
  const canvasRef = useRef(null);
  const starsRef = useRef([]);
  const linesRef = useRef([]);
  const animationFrameRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let mouseX = 0;
    let mouseY = 0;

    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth / 3;
      canvas.height = window.innerHeight;
    };

    // Initialize stars
    const initStars = () => {
      starsRef.current = Array.from({ length: STAR_COUNT }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 1,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        alpha: Math.random(),
      }));
    };

    // Initialize constellation lines
    const initLines = () => {
      linesRef.current = Array.from({ length: LINE_COUNT }, () => {
        const star1 = starsRef.current[Math.floor(Math.random() * STAR_COUNT)];
        const star2 = starsRef.current[Math.floor(Math.random() * STAR_COUNT)];
        return { star1, star2, alpha: Math.random() * 0.5 };
      });
    };

    // Draw stars and lines
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw stars
      starsRef.current.forEach(star => {
        star.x += star.vx;
        star.y += star.vy;
        star.alpha = Math.sin(Date.now() / 1000 + star.x) * 0.3 + 0.7;

        // Boundary check
        if (star.x < 0 || star.x > canvas.width) star.vx *= -1;
        if (star.y < 0 || star.y > canvas.height) star.vy *= -1;

        const distanceToMouse = Math.hypot(star.x - mouseX, star.y - mouseY);
        const interactionRadius = 100;
        
        if (distanceToMouse < interactionRadius) {
          const angle = Math.atan2(star.y - mouseY, star.x - mouseX);
          const force = (interactionRadius - distanceToMouse) / interactionRadius;
          star.x += Math.cos(angle) * force * 2;
          star.y += Math.sin(angle) * force * 2;
        }

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(139, 92, 246, ${star.alpha})`;
        ctx.fill();
      });

      // Draw constellation lines
      linesRef.current.forEach(line => {
        ctx.beginPath();
        ctx.moveTo(line.star1.x, line.star1.y);
        ctx.lineTo(line.star2.x, line.star2.y);
        ctx.strokeStyle = `rgba(139, 92, 246, ${line.alpha * 0.5})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      });

      animationFrameRef.current = requestAnimationFrame(draw);
    };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    const handleResize = () => {
      setCanvasSize();
      initStars();
      initLines();
    };

    setCanvasSize();
    initStars();
    initLines();
    draw();

    window.addEventListener('resize', handleResize);
    canvas.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, [side]);

  return (
    <motion.canvas
      ref={canvasRef}
      className={`fixed top-0 ${side === 'left' ? 'left-0' : 'right-0'} h-full pointer-events-none`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      style={{ zIndex: 0 }}
    />
  );
} 