import React from 'react';
import { connect, ConnectedProps } from 'react-redux'
import { selectRssSource, loadRssDocument } from '../store/rss-source/actions'
import { RssSourceId, RssSource, RssReadStatus } from '../store/rss-source/types'
import { RootState } from '../store'
import classNames from 'classnames';


const mapDispatch = {
    selectSource: (id: RssSourceId) => selectRssSource(id),
    loadRssDocument
}

const connector = connect(null, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>
type Props = PropsFromRedux & {
    source: RssSource,
    isSelected: boolean,
    refresh: RssReadStatus | boolean | undefined
}

const SourceListItem: React.FC<Props> = ({ source, selectSource, loadRssDocument, isSelected, refresh}: Props) => {

    const handleClickOnRssSource = () => {
        selectSource(source.id);
    };
    const itemClassName: string = classNames({
        'source-item': true,
        'selected': isSelected
    });
    const refreshClassName: string = classNames({
        refresh: true,
        'refresh-pending': refresh === RssReadStatus.PENDING,
        'refresh-error': refresh === RssReadStatus.ERROR
    });
    const handleClickRefresh = (e:React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        // for now refresh and selection are equivalent : they both triggers the
        // loadRssDocument action
        handleClickOnRssSource();

        //loadRssDocument(source);
        //e.stopPropagation();
    };
    return (
        <div
            key={source.id}
            className={itemClassName}
            onClick={handleClickOnRssSource}
        >
            <div className="source-label">
                {source.label}
            </div>
            <div>
                <div 
                    title="refresh"
                    className={refreshClassName} 
                    onClick={handleClickRefresh}
                >    
                </div>
            </div>
        </div>
    )
}

export default connector(SourceListItem)
