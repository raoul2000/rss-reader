import React from 'react';

import SourceList from '../components/SourceList';
import ResultList from '../components/ResultList';
import ResultDetail from '../components/ResultDetail';

function RssReady() {
    return (
        <div className="rss-reader">
            <nav className="source-list">
                <SourceList />
            </nav>
            <nav className="result-list">
                <ResultList />
            </nav>
            <main className="result-detail">
                <ResultDetail />
            </main>
        </div>
    );
}

export default RssReady;
