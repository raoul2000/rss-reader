import React from 'react';
import { connect, ConnectedProps, useSelector, shallowEqual  } from 'react-redux'
import { selectRssSource, loadRssDocument } from '../store/rss-source/actions'
import { getRssSourceById, isRssSourceLoaded } from '../store/rss-source/reducers'
import { RssSourceId, RssReadStatus } from '../store/rss-source/types'
import classNames from 'classnames';


const mapDispatch = {
    selectRssSource,
    loadRssDocument
}

const connector = connect(null, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>
type Props = PropsFromRedux & {
    sourceId: RssSourceId,
    isSelected: boolean
}

const SourceListItem: React.FC<Props> = ({ sourceId,isSelected, selectRssSource, loadRssDocument }: Props) => {

    // instead of using the mapState we use selector with shallowEqual to avoid
    // extra rendering of the component

    const rssSource = useSelector(getRssSourceById(sourceId),shallowEqual);
    const rssSourceLoaded = useSelector(isRssSourceLoaded(sourceId), shallowEqual);
    
    const doSelectRssSource = () => {
        selectRssSource(sourceId);
        if (rssSource && !rssSourceLoaded) {
            loadRssDocument(rssSource);
        }
    };

    const itemClassName: string = classNames({
        'source-item': true,
        'selected': isSelected
    });
    const refreshClassName: string = classNames({
        refresh: true,
        'refresh-pending': rssSource?.readStatus === RssReadStatus.PENDING,
        'refresh-error': rssSource?.readStatus === RssReadStatus.ERROR
    });
    const doLoadRssDocument = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation();
        if (rssSource) {
            loadRssDocument(rssSource);
        }
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
