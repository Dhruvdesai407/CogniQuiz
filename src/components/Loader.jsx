import React from 'react';
import styled, { keyframes } from 'styled-components';

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
`;

const progressBar = keyframes`
  0% { width: 0%; }
  100% { width: 100%; }
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const Loader = () => {
  return (
    <StyledLoaderContainer>
      <div className="terminal-header">
        <div className="traffic-lights">

        </div>
        <div className="header-text">
          <div className="loading-text">Loading...</div>
        </div>
        <div className="progress-bar-track">
          <div className="progress-bar-fill" />
        </div>
      </div>
      <div className="terminal-body">
        <div className="loader-content">
          <div className="spinner" />
          <div className="almost-there-text">
            Almost There...
          </div>
          <div className="info-text">
            <p>We're getting everything ready for you...</p>
            <p>Sit tight for just a moment.</p>
          </div>
        </div>
      </div>
      <div className="terminal-footer">
        <p>Appreciate your patience. Almost there!</p>
      </div>
    </StyledLoaderContainer>
  );
}

const StyledLoaderContainer = styled.div`
  max-width: 900px;
  width: 100%;
  background-color: var(--color-bg-secondary);
  border-radius: 0.75rem;
  overflow: hidden;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);

  .terminal-header {
    background-color: var(--color-bg-primary);
    display: flex;
    align-items: center;
    padding: 1.25rem;
    color: var(--color-text-body);
    position: relative;
    border-top-left-radius: 0.75rem;
    border-top-right-radius: 0.75rem;
  }

  .traffic-lights {
    display: flex;
    position: absolute;
    left: 0.75rem;
    gap: 0.5rem;
  }

  .dot {
    height: 0.875rem;
    width: 0.875rem;
    border-radius: 50%;
    transition: all 0.2s ease-in-out;
    &:hover {
      transform: scale(1.15);
    }
  }
  .dot.red { background-color: var(--color-error-red); }
  .dot.red:hover { background-color: #ff3b36; }
  .dot.yellow { background-color: var(--color-accent-main); }
  .dot.yellow:hover { background-color: #ffaa33; }
  .dot.green { background-color: var(--color-success-green); }
  .dot.green:hover { background-color: #00b44e; }

  .header-text {
    flex: 1;
    text-align: center;
    color: var(--color-heading-color);
    font-weight: 600;
    font-size: 1.125rem;
    position: relative;
    animation: ${pulse} 2s infinite alternate;
  }

  .loading-text {
    font-size: 1.25rem;
    font-family: 'Playfair Display', serif;
  }

  .progress-bar-track {
    position: absolute;
    width: 100%;
    bottom: 0;
    left: 0;
    background-color: var(--color-subtle-color);
    height: 0.25rem;
    border-top-left-radius: 0.75rem;
    border-top-right-radius: 0.75rem;
  }

  .progress-bar-fill {
    background-color: var(--color-success-green);
    height: 100%;
    animation: ${progressBar} 2s linear infinite;
  }

  .terminal-body {
    background-color: var(--color-bg-primary);
    padding: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 250px;
  }

  .loader-content {
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
  }

  .spinner {
    width: 6rem;
    height: 6rem;
    border: 4px solid var(--color-subtle-color);
    border-top: 4px solid var(--color-success-green);
    border-radius: 50%;
    animation: ${spin} 1s linear infinite;
    margin: 0 auto;
  }

  .almost-there-text {
    color: var(--color-success-green);
    font-weight: 600;
    font-size: 2.25rem;
    opacity: 0.9;
    animation: ${fadeIn} 1s ease-out infinite alternate;
    font-family: 'Playfair Display', serif;
  }

  .info-text {
    color: var(--color-text-body);
    font-size: 0.875rem;
    opacity: 0.8;
    animation: ${fadeIn} 1s ease-out infinite alternate;
    p {
        margin-bottom: 0.25rem;
        &:last-child {
            margin-bottom: 0;
        }
    }
  }

  .terminal-footer {
    background-color: var(--color-bg-secondary);
    padding: 1rem;
    text-align: center;
    color: var(--color-subtle-color);
    font-size: 0.75rem;
    font-family: 'Merriweather', serif;
  }
`;

export default Loader;