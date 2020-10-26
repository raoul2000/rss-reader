import React from 'react';
import { connect, ConnectedProps, useSelector } from 'react-redux'
import { selectRssSource, loadRssDocument } from '../store/rss-source/actions'
import { getRssSourceById, isRssSourceLoaded } from '../store/rss-source/reducers'
import { RssSourceId, RssReadStatus } from '../store/rss-source/types'
import classNames from 'classnames';
import { RootState } from '../store'

const mapState = (state: RootState) => ({
    selectedSourceId: state.rssSource.selectedSourceId
})

const mapDispatch = {
    selectRssSource,
    loadRssDocument
}

const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>
type Props = PropsFromRedux & {
    sourceId: RssSourceId
}

const SourceListItem: React.FC<Props> = ({ sourceId,selectedSourceId, selectRssSource, loadRssDocument }: Props) => {

    const rssSource = useSelector(getRssSourceById(sourceId));
    const rssSourceLoaded = useSelector(isRssSourceLoaded(sourceId));
    

    const doSelectRssSource = () => {
        console.log(`select source id ${sourceId}`)
        selectRssSource(sourceId);
        if (rssSource && !rssSourceLoaded) {
            loadRssDocument(rssSource);
        }
    };

    const itemClassName: string = classNames({
        'source-item': true,
        'selected': rssSource && rssSource?.id === selectedSourceId
    });
    const refreshClassName: string = classNames({
        refresh: true,
        'refresh-pending': rssSource && rssSource.readStatus === RssReadStatus.PENDING,
        'refresh-error': rssSource && rssSource.readStatus === RssReadStatus.ERROR
    });
    const doLoadRssDocument = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
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
