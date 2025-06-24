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
    --s: 15vw;

    @media (max-width: 768px) {
      --s: 40vw;
    }

    @media (min-width: 769px) and (max-width: 1024px) {
      --s: 25vw;
    }

    --c1: var(--pattern-c1);
    --c2: var(--pattern-c2);

    --_g: var(--c1) 0% 5%, var(--c2) 6% 15%, var(--c1) 16% 25%, var(--c2) 26% 35%,
      var(--c1) 36% 45%, var(--c2) 46% 55%, var(--c1) 56% 65%, var(--c2) 66% 75%,
      var(--c1) 76% 85%, var(--c2) 86% 95%, #0000 96%;
    background: radial-gradient(50% 50% at 100% 0, var(--_g)),
      radial-gradient(50% 50% at 0 100%, var(--_g)),
      radial-gradient(50% 50%, var(--_g)),
      radial-gradient(50% 50%, var(--_g)) calc(var(--s) / 2) calc(var(--s) / 2)
        var(--c1);
    background-size: var(--s) var(--s);
  }
`;

export default Pattern;