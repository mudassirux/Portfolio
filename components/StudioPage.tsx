
import React from 'react';
import { Studio } from 'sanity';
import config from '../sanity.config';

const StudioPage: React.FC = () => {
    return (
        <div className="h-screen w-full overflow-hidden z-[99999] relative bg-white">
            <Studio config={config} />
        </div>
    );
};

export default StudioPage;
