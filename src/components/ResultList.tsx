import React, { useEffect } from 'react';
import { connect, ConnectedProps, useSelector } from 'react-redux'
import { RootState } from '../store'
import { getRssItemsForSelectedSource } from '../store/rss-source/reducers'
import ResultListItem from './ResultListItem'

const mapState = (state: RootState) => ({
    rssItems: getRssItemsForSelectedSource(state),
    selectedItemId: state.rssSource.selectedItemId
})


const connector = connect(mapState);
type PropsFromRedux = ConnectedProps<typeof connector>
type Props = PropsFromRedux

const ResultList: React.FC<Props> = ({rssItems, selectedItemId}:Props) => {
    return (
        <div id="resultList">
            <div>{rssItems.length} items</div>
            <div className="resultListItems">
                {
                    rssItems.map( item => (
                        <ResultListItem 
                            key={item.id}
                            itemId={item.id}
                            isSelected={selectedItemId === item.id}
                        />
                    ))
                }
            </div>
        </div>
    )
}
export default connector(ResultList)
/* 
const mapState = (state: RootState) => ({
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
    const { selectedSource, rssDocument, rssLoadingStatus, rssLoadErrorMessage, loadRss, setRssDocument, selectedItemId } = props;

    const rssDocumentCacheItem: RssDocumentCacheItem | null = useSelector<RootState, RssDocumentCacheItem | null>((state: RootState) => {
        if (selectedSource) {
            return getRssDocumentFromCache(state.rssSource, selectedSource.id)
        }
        return null;
    })

    const handleLoadRssDocument = () => {
        if (selectedSource) {
            if (!rssDocumentCacheItem || !rssDocumentCacheItem.rssDocument) {
                loadRss(selectedSource);
            }
        }
    };
    // load RSS Document each time the selected RSS source Id changes
    useEffect(handleLoadRssDocument, [selectedSource?.id])
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
 */

//export default connector(ResultList)
//export default ResultList