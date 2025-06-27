import React from 'react';
import styled from 'styled-components';

const Pattern = () => {
  return (
    <StyledPatternWrapper>
      <div className="pattern-container" />
    </StyledPatternWrapper>
  );
};

const StyledPatternWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  overflow: hidden;

  .pattern-container {
    width: 100%;
    height: 100%;
    --s: 20vw;

    @media (max-width: 768px) {
      --s: 50vw;
    }

    @media (min-width: 769px) and (max-width: 1024px) {
      --s: 30vw;
    }

    --c1: var(--pattern-c1);
    --c2: var(--pattern-c2);

    --_g: var(--c1) 0% 2.5%, var(--c2) 3% 7.5%, var(--c1) 8% 12.5%, var(--c2) 13% 17.5%,
      var(--c1) 18% 22.5%, var(--c2) 23% 27.5%, var(--c1) 28% 32.5%, var(--c2) 33% 37.5%,
      var(--c1) 38% 42.5%, var(--c2) 43% 47.5%, #0000 48%;
    background: radial-gradient(50% 50% at 100% 0, var(--_g)),
      radial-gradient(50% 50% at 0 100%, var(--_g)),
      radial-gradient(50% 50%, var(--_g)),
      radial-gradient(50% 50%, var(--_g)) calc(var(--s) / 2) calc(var(--s) / 2)
        var(--c1);
    background-size: var(--s) var(--s);
    opacity: 0.5;
  }
`;

export default Pattern;