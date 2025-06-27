import React, { useState, useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';

const CustomCursor = () => {
  const [isHoveringInteractive, setIsHoveringInteractive] = useState(false);
  const cursorElementRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (cursorElementRef.current) {
        cursorElementRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }
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
    width: 1.2rem;
    height: 1.2rem;
    background-color: var(--cursor-color-default);
    border-radius: 50%;
    position: absolute;
    opacity: 0.8;
    transform: translate(-50%, -50%);
    box-shadow: 0 0 1rem var(--cursor-shadow-color), 0 0 2px var(--cursor-color-interactive);
    transition: opacity 0.2s ease-out, background-color 0.2s ease-out, width 0.2s ease-out, height 0.2s ease-out, box-shadow 0.2s ease-out, filter 0.2s ease-out;
    filter: blur(0.5px);
    border: 1px solid rgba(255,255,255,0.2);
  }

  ${({ $isHoveringInteractive }) =>
    $isHoveringInteractive &&
    css`
      .cursor-element {
        width: 2.5rem;
        height: 2.5rem;
        background-color: var(--cursor-color-interactive);
        opacity: 0.9;
        box-shadow: 0 0 2rem var(--cursor-shadow-color), 0 0 4px 1px var(--cursor-shadow-color);
        filter: blur(0px);
      }
    `
  }
`;

export default CustomCursor;