import React from 'react';

export const GamerBackground = () => {
    return (
        <>
            <div className="fixed inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-rose-900/10 via-background to-background pointer-events-none -z-10" />
            <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay -z-10"></div>
        </>
    );
};
