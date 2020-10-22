import React, { useEffect } from 'react';
import { connect, ConnectedProps, useSelector } from 'react-redux'
import { RootState } from '../store'
import { loadRssDocument, setRssDocument } from '../store/rss-source/actions'
import { getSelectedRssSource, getRssDocumentFromCache, getSelectedRssDocument } from '../store/rss-source/reducers'
import { RssSource, RssReadStatus, RssDocumentCacheItem } from '../store/rss-source/types'
import ResultListItem from './ResultListItem'

const mapState = (state: RootState) => ({
    selectedSourceId: state.rssSource.selectedRssSourceId,
    selectedSource: getSelectedRssSource(state.rssSource),
    rssDocument: getSelectedRssDocument(state.rssSource),
    rssLoadingStatus: state.rssSource.readStatus,
    rssLoadErrorMessage: state.rssSource.readErrorMessage,
    selectedItemId: state.rssSource.selectedRssItemId
})
const mapDispatch = {
    loadRss: (rssSource: RssSource) => loadRssDocument(rssSource),
    setRssDocument
}
const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>
type Props = PropsFromRedux

const ResultList: React.FC<Props> = (props: Props) => {
    const { selectedSourceId, selectedSource, rssDocument, rssLoadingStatus, rssLoadErrorMessage, loadRss, setRssDocument, selectedItemId } = props;

    const rssDocumentCacheItem: RssDocumentCacheItem | null = useSelector<RootState, RssDocumentCacheItem | null>((state: RootState) => {
        if (selectedSource) {
            return getRssDocumentFromCache(state.rssSource, selectedSource.id)
        }
        return null;
    })
    /**
     * Trigger the loadRss Action
     */
    const handleLoadRssDocument = () => {
        //debugger;
        if (selectedSource) {
            if (!rssDocumentCacheItem || !rssDocumentCacheItem.rssDocument) {
                loadRss(selectedSource);
            } 
/*             else {
                setRssDocument(rssDocumentCacheItem.rssDocument)
            }
 */        }
    };
    // load RSS Document each time the selected RSS source Id changes
    useEffect(handleLoadRssDocument, [selectedSourceId])
    console.log(rssDocument);
    return (
        <div id="resultList">
            <h3>
                {selectedSource?.label}
            </h3>
            <div className="resultListItems">
                {rssLoadingStatus === RssReadStatus.PENDING && <div>loading ...</div>}
                {rssLoadingStatus === RssReadStatus.ERROR && <div>{rssLoadErrorMessage}</div>}
                {rssDocument && rssDocument.rssDocument && rssDocument.rssDocument.items?.map(item => (
                    <ResultListItem key={item.id} rssItem={item} isSelected={selectedItemId === item.id} />
                ))}
            </div>
        </div>
    )
}


export default connector(ResultList)