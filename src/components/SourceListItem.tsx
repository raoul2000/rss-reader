import React from 'react';
import { connect, ConnectedProps, useSelector } from 'react-redux'
import { toggleSelectRssSource, loadRssDocument } from '../store/rss-source/actions'
import { RssSource, RssReadStatus, RssSourceId } from '../store/rss-source/types'
import { getRssSourceById, isRssSourceLoaded } from '../store/rss-source/reducers'
import classNames from 'classnames';

const mapDispatch = {
    toggleSelectRssSource,
    loadRssDocument
}

const connector = connect(null, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>
type Props = PropsFromRedux & {
    sourceId: RssSourceId
}

const SourceListItem: React.FC<Props> = ({ sourceId, toggleSelectRssSource, loadRssDocument}: Props) => {

    const rssSource = useSelector(getRssSourceById(sourceId));
    const rssSourceLoaded = useSelector(isRssSourceLoaded(sourceId));

    const doSelectRssSource = () => {
        console.log(`select source id ${sourceId}`)
        toggleSelectRssSource(sourceId);
        if (rssSource && !rssSourceLoaded) {
            loadRssDocument(rssSource);
        }
    };

    const itemClassName: string = classNames({
        'source-item': true,
        'selected': rssSource && rssSource.selected
    });
    const refreshClassName: string = classNames({
        refresh: true,
        'refresh-pending': rssSource && rssSource.readStatus === RssReadStatus.PENDING,
        'refresh-error': rssSource && rssSource.readStatus === RssReadStatus.ERROR
    });
    const doLoadRssDocument = (e:React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation();

        // for now refresh and selection are equivalent : they both triggers the
        // loadRssDocument action
        //doSelectRssSource();
        if (rssSource) {
            loadRssDocument(rssSource);
        }
        //selectRssSource(source.id)
        //refreshRssDocument(source.id);
    };
    return (
        <div
            className={itemClassName}
            onClick={doSelectRssSource}
        >
            <div className="source-label">
                {rssSource && rssSource.label}
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
