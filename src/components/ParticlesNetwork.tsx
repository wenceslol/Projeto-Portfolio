import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface Particle {
  x: number;
  y: number;
  size: number;
  color: string;
  vx: number;
  vy: number;
}

const ParticlesNetwork = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationRef = useRef<number | null>(null);

  // Configurações ajustáveis
  const config = {
    particleCount: 150,
    particleSize: [0.5, 0.75, 1, 1.25, 1.5],
    lineDistance: 100,
    baseSpeed: 0.1,
    mouseInfluence: 0,
    colors: [
        '#ffcc6f', // Amarelo pálido (tipo G - como o Sol)
        '#ffd2a1', // Amarelo-alaranjado (tipo K)
        '#ffa07a', // Laranja claro (tipo K mais frio)
        '#ff6f61', // Vermelho-alaranjado (tipo M, anãs vermelhas)
        '#f8f7ff', // Branco puro (tipo A)
        '#dbe9ff', // Branco-azulado (tipo B)
        '#aabfff', // Azul-claro (tipo B quente)
        '#9db4ff', // Azul (tipo O, estrelas superquentes)
    ]
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Ajustar tamanho do canvas
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    
    // Inicializar partículas
    const initParticles = () => {
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const circleRadius = Math.min(canvas.width, canvas.height) * 0.9;

  particlesRef.current = Array.from({ length: config.particleCount }, () => {
    const angle = Math.random() * Math.PI * 2;
    const radius = (Math.random() * 0.4 + 0.6) * circleRadius; // entre 0.6 e 1.0 do raio
    return {
      x: centerX + Math.cos(angle) * radius,
      y: centerY + Math.sin(angle) * radius,
      size: config.particleSize[Math.floor(Math.random() * config.particleSize.length)],
      color: config.colors[Math.floor(Math.random() * config.colors.length)],
      vx: Math.random() * config.baseSpeed - config.baseSpeed / 2,
      vy: Math.random() * config.baseSpeed - config.baseSpeed / 2
    };
  });
};

    // Atualizar posição das partículas
    const updateParticles = () => {
      particlesRef.current.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        
        // Rebater nas bordas
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        
        // Influência do mouse
        const dx = mouseRef.current.x - p.x;
        const dy = mouseRef.current.y - p.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < config.mouseInfluence * 10) {
          const angle = Math.atan2(dy, dx);
          const force = config.mouseInfluence / distance;
          p.x -= Math.cos(angle) * force;
          p.y -= Math.sin(angle) * force;
        }
      });
    };

    // Desenhar partículas e conexões
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const particles = particlesRef.current;
      
      // Desenhar conexões
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i];
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < config.lineDistance) {
            const opacity = 1 - distance / config.lineDistance;
            ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.5})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }
      
      // Desenhar partículas
      particles.forEach(p => {
        ctx.save();

// Criar gradiente radial
const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 1.5);
gradient.addColorStop(0, 'rgba(255,255,255,1)');
gradient.addColorStop(0.2, p.color); // cor principal da partícula
gradient.addColorStop(1, 'rgba(255,255,255,0)');

// Configurar sombra
ctx.shadowBlur = 15;
ctx.shadowColor = p.color;

// Aplicar o gradiente como estilo
ctx.fillStyle = gradient;
ctx.beginPath();
ctx.arc(p.x, p.y, p.size * 4, 0, Math.PI * 2);
ctx.fill();

ctx.restore();
      });
    };

    // Loop de animação
    const animate = () => {
      updateParticles();
      draw();
      animationRef.current = requestAnimationFrame(animate);
    };

    // Event listeners
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    // Inicialização
    resizeCanvas();
    initParticles();
    animate();
    
    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationRef.current!);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="fixed inset-0 z-0 overflow-hidden"
    >
      <canvas 
        ref={canvasRef} 
        className="absolute top-0 left-0 w-full h-full"
      />
    </motion.div>
  );
};

export default ParticlesNetwork;