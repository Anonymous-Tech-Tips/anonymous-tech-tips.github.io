import React from 'react';

export const GamerBackground = () => {
    return (
        <>
            <div className="fixed inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-indigo-950/40 via-[#0a0a0b] to-[#0a0a0b] pointer-events-none -z-10" />
            <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay -z-10"></div>
        </>
    );
};
