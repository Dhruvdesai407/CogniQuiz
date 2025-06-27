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
        <div className="header-text">
          <div className="loading-text">Preparing Your Challenge...</div>
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
            <p>We're getting everything ready for you.</p>
            <p>Sit tight for just a moment.</p>
          </div>
        </div>
      </div>
      <div className="terminal-footer">
        <p>Patience is a virtue, especially when knowledge is the reward.</p>
      </div>
    </StyledLoaderContainer>
  );
}

const StyledLoaderContainer = styled.div`
  max-width: 800px;
  width: 95%;
  background-color: var(--color-bg-secondary);
  border-radius: 0.75rem;
  overflow: hidden;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.35);
  border: 1px solid var(--color-border-subtle);
  animation: ${fadeIn} 0.5s ease-out;

  .terminal-header {
    background-color: var(--color-bg-primary);
    padding: 1rem 1.25rem;
    color: var(--color-text-body);
    position: relative;
    border-top-left-radius: 0.75rem;
    border-top-right-radius: 0.75rem;
    border-bottom: 1px solid var(--color-border-subtle);
  }

  .header-text {
    text-align: center;
    color: var(--color-text-heading);
    font-weight: 600;
    font-size: 1.25rem;
    animation: ${pulse} 2.5s infinite alternate;
  }

  .loading-text {
    font-family: 'Playfair Display', serif;
  }

  .progress-bar-track {
    position: absolute;
    width: 100%;
    bottom: -1px;
    left: 0;
    background-color: transparent;
    height: 3px;
  }

  .progress-bar-fill {
    background: linear-gradient(90deg, var(--color-accent-main), var(--color-accent-dark));
    height: 100%;
    animation: ${progressBar} 2s linear infinite;
    box-shadow: 0 0 10px var(--color-accent-main);
  }

  .terminal-body {
    background-color: var(--color-bg-primary);
    padding: 2.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 280px;
  }

  .loader-content {
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
  }

  .spinner {
    width: 5rem;
    height: 5rem;
    border: 5px solid var(--color-border-subtle);
    border-top: 5px solid var(--color-accent-main);
    border-radius: 50%;
    animation: ${spin} 1.2s linear infinite;
  }

  .almost-there-text {
    color: var(--color-text-heading);
    font-weight: 700;
    font-size: 2rem;
    animation: ${pulse} 2s ease-in-out infinite alternate;
    font-family: 'Playfair Display', serif;
  }

  .info-text {
    color: var(--color-text-body);
    font-size: 1rem;
    opacity: 0.9;
    p {
        margin-bottom: 0.25rem;
        &:last-child {
            margin-bottom: 0;
        }
    }
  }

  .terminal-footer {
    background-color: var(--color-bg-secondary);
    padding: 0.75rem;
    text-align: center;
    color: var(--color-text-body);
    font-size: 0.875rem;
    font-family: 'Merriweather', serif;
    border-top: 1px solid var(--color-border-subtle);
  }
`;

export default Loader;
