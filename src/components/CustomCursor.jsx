import React, { useState, useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHoveringInteractive, setIsHoveringInteractive] = useState(false);

  const cursorElementRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const checkInteractive = (e) => {
      const target = e.target;
      const interactiveSelectors = 'button, a, select, input, textarea, [data-interactive="true"], [role="button"], [tabindex]:not([tabindex="-1"])';
      
      setIsHoveringInteractive(
        Array.from(document.querySelectorAll(interactiveSelectors)).some(el => el.contains(target) || el === target)
      );
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', checkInteractive, true);
    document.addEventListener('mouseout', checkInteractive, true);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', checkInteractive, true);
      document.removeEventListener('mouseout', checkInteractive, true);
    };
  }, []);

  useEffect(() => {
    let animationFrameId;
    const animateCursor = () => {
      if (cursorElementRef.current) {
        cursorElementRef.current.style.transform = `translate(${position.x}px, ${position.y}px)`;
      }
      animationFrameId = requestAnimationFrame(animateCursor);
    };
    animationFrameId = requestAnimationFrame(animateCursor);
    return () => cancelAnimationFrame(animationFrameId);
  }, [position]);

  return (
    <StyledCursorWrapper $isHoveringInteractive={isHoveringInteractive}>
      <div className="cursor-element" ref={cursorElementRef}></div>
    </StyledCursorWrapper>
  );
};

const StyledCursorWrapper = styled.div`
  pointer-events: none;
  position: fixed;
  top: 0; 
  left: 0; 
  z-index: 9999;
  
  @media (max-width: 768px) {
    display: none;
  }

  .cursor-element {
    width: 1.8rem;
    height: 1.8rem;
    background-color: var(--cursor-color-default);
    border-radius: 50%;
    position: absolute;
    opacity: 0.8;
    transform: translate(-50%, -50%);
    box-shadow: 0 0 1.5rem var(--cursor-shadow-color), 0 0 3px var(--cursor-color-interactive);
    transition: transform 0.2s ease-out, opacity 0.2s ease-out, background-color 0.2s ease-out, width 0.2s ease-out, height 0.2s ease-out, box-shadow 0.2s ease-out, filter 0.2s ease-out;
    filter: blur(0.8px);
    border: 1px solid rgba(255,255,255,0.3);
  }

  ${({ $isHoveringInteractive }) =>
    $isHoveringInteractive &&
    css`
      .cursor-element {
        width: 3.2rem;
        height: 3.2rem;
        background-color: var(--cursor-color-interactive);
        opacity: 0.9;
        box-shadow: 0 0 2.5rem var(--cursor-shadow-color), 0 0 5px 2px var(--cursor-shadow-color);
        filter: blur(0px);
      }
    `
  }
`;

export default CustomCursor;