/**
 * Page transition animations and loading state management
 */

import { useEffect, useState } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';

interface TransitionConfig {
  duration: number;
  easing: string;
  direction?: 'forward' | 'backward';
}

export const usePageTransitions = (config: TransitionConfig = {
  duration: 300,
  easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
}) => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const location = useLocation();
  const navigationType = useNavigationType();

  useEffect(() => {
    // Start transition
    setIsTransitioning(true);

    // Apply transition classes
    document.body.classList.add('page-transitioning');
    
    if (navigationType === 'POP') {
      document.body.classList.add('transition-backward');
    } else {
      document.body.classList.add('transition-forward');
    }

    // End transition after duration
    const timer = setTimeout(() => {
      setIsTransitioning(false);
      document.body.classList.remove('page-transitioning', 'transition-forward', 'transition-backward');
    }, config.duration);

    return () => {
      clearTimeout(timer);
      document.body.classList.remove('page-transitioning', 'transition-forward', 'transition-backward');
    };
  }, [location.pathname, navigationType, config.duration]);

  return { isTransitioning };
};

// CSS-in-JS for transition styles
export const injectTransitionStyles = () => {
  if (typeof document === 'undefined') return;

  const styleId = 'page-transitions';
  if (document.getElementById(styleId)) return;

  const styles = `
    /* Page transition base styles */
    .page-transitioning {
      pointer-events: none;
    }

    /* Main content transitions */
    main {
      transition: opacity 300ms cubic-bezier(0.4, 0, 0.2, 1),
                  transform 300ms cubic-bezier(0.4, 0, 0.2, 1);
    }

    .page-transitioning main {
      opacity: 0;
    }

    .transition-forward main {
      transform: translateX(20px);
    }

    .transition-backward main {
      transform: translateX(-20px);
    }

    /* Loading skeleton animations */
    .skeleton-loading {
      background: linear-gradient(
        90deg,
        transparent,
        rgba(91, 155, 213, 0.1),
        transparent
      );
      background-size: 200% 100%;
      animation: skeleton-loading 1.5s infinite;
    }

    @keyframes skeleton-loading {
      0% { background-position: -200% 0; }
      100% { background-position: 200% 0; }
    }

    /* Stagger animations for lists */
    .stagger-children > * {
      opacity: 0;
      transform: translateY(20px);
      animation: stagger-fade-in 0.5s ease-out forwards;
    }

    .stagger-children > *:nth-child(1) { animation-delay: 0.1s; }
    .stagger-children > *:nth-child(2) { animation-delay: 0.2s; }
    .stagger-children > *:nth-child(3) { animation-delay: 0.3s; }
    .stagger-children > *:nth-child(4) { animation-delay: 0.4s; }
    .stagger-children > *:nth-child(5) { animation-delay: 0.5s; }

    @keyframes stagger-fade-in {
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    /* Smooth scroll behavior */
    html {
      scroll-behavior: smooth;
    }

    @media (prefers-reduced-motion: reduce) {
      html {
        scroll-behavior: auto;
      }
      
      .page-transitioning main {
        transition: none;
      }
      
      .stagger-children > * {
        animation: none;
        opacity: 1;
        transform: none;
      }
    }
  `;

  const styleElement = document.createElement('style');
  styleElement.id = styleId;
  styleElement.textContent = styles;
  document.head.appendChild(styleElement);
};

// Component for transition wrapper
export const PageTransition: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isTransitioning } = usePageTransitions();

  useEffect(() => {
    injectTransitionStyles();
  }, []);

  return (
    <div className={`page-transition-wrapper ${isTransitioning ? 'transitioning' : ''}`}>
      {children}
    </div>
  );
};

// Hook for staggered animations
export const useStaggeredAnimation = (itemCount: number, delay: number = 100) => {
  const [visibleItems, setVisibleItems] = useState(0);

  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];

    for (let i = 0; i < itemCount; i++) {
      const timer = setTimeout(() => {
        setVisibleItems(prev => prev + 1);
      }, i * delay);
      timers.push(timer);
    }

    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, [itemCount, delay]);

  return visibleItems;
};

export default PageTransition;