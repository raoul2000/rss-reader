import React from 'react';

import SourceList from '../components/SourceList';
import ResultList from '../components/ResultList';
import ResultDetail from '../components/ResultDetail';

function RssReady() {
    return (
        <div className="p-grid">
            <nav className="p-col-2 p-as-stretch">
                <SourceList />
            </nav>
            <nav className="p-col-3">
                <ResultList />
            </nav>
            <main className="p-col-7">
                <ResultDetail />
            </main>
        </div>
    );
}

export default RssReady;
