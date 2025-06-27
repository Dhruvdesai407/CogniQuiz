import React, { useState } from 'react';

const Tooltip = ({ content, children }) => {
    const [show, setShow] = useState(false);

    const tooltipContentStyle = {
        position: 'absolute',
        zIndex: 50,
        padding: '0.75rem 1.25rem',
        fontSize: '1rem',
        backgroundColor: 'var(--color-bg-secondary)',
        color: 'var(--color-text-body)',
        borderRadius: '0.5rem',
        boxShadow: '0 6px 15px rgba(0, 0, 0, 0.4)',
        whiteSpace: 'nowrap',
        opacity: 0.98,
        top: '-15px',
        left: '50%',
        transform: 'translate(-50%, -100%)',
        animation: 'popIn 0.3s ease-out forwards',
        border: '1px solid var(--color-border-subtle)',
        backdropFilter: 'blur(10px)',
    };

    return (
        <span
            style={{ position: 'relative', display: 'inline-block' }}
            onMouseEnter={() => setShow(true)}
            onMouseLeave={() => setShow(false)}
        >
            {children}
            {show && <div style={tooltipContentStyle}>{content}</div>}
        </span>
    );
};

export default Tooltip;