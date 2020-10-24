import React from 'react';
import { connect, ConnectedProps } from 'react-redux'
import { selectRssSource, loadRssDocument } from '../store/rss-source/actions'
import { RssSource, RssReadStatus } from '../store/rss-source/types'
import classNames from 'classnames';

const mapDispatch = {
    selectRssSource,
    loadRssDocument
}

const connector = connect(null, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>
type Props = PropsFromRedux & {
    source: RssSource,
    isSelected: boolean,
    readStatus: RssReadStatus | null
}

const SourceListItem: React.FC<Props> = ({ source, selectRssSource, loadRssDocument, isSelected, readStatus}: Props) => {

    const doSelectRssSource = () => {
        selectRssSource(source.id);
    };
    const itemClassName: string = classNames({
        'source-item': true,
        'selected': isSelected
    });
    const refreshClassName: string = classNames({
        refresh: true,
        'refresh-pending': readStatus === RssReadStatus.PENDING,
        'refresh-error': readStatus === RssReadStatus.ERROR
    });
    const doLoadRssDocument = (e:React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation();

        // for now refresh and selection are equivalent : they both triggers the
        // loadRssDocument action
        //doSelectRssSource();

        loadRssDocument(source);
        //selectRssSource(source.id)
        //refreshRssDocument(source.id);
    };
    return (
        <div
            key={source.id}
            className={itemClassName}
            onClick={doSelectRssSource}
        >
            <div className="source-label">
                {source.label}
            </div>
            <div>
                <div 
                    title="refresh"
                    className={refreshClassName} 
                    onClick={doLoadRssDocument}
                >    
                </div>
            </div>
        </div>
    )
}

export default connector(SourceListItem)
