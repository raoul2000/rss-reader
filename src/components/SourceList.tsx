import React from 'react';
import { connect, ConnectedProps, useSelector } from 'react-redux'
import { RootState } from '../store'
import { selectRssSource } from '../store/rss-source/actions'
import { RssDocumentCacheItem, RssReadStatus, RssSourceId } from '../store/rss-source/types'
//import { getRssDocumentsReadStatus } from '../store/rss-source/reducers'
import SourceListItem from './SourceListItem'

const mapState = (state: RootState) => ({
    rssSources: state.rssSource.rssSources,
    selectedSourceId: state.rssSource.selectedRssSourceId,
    refresh: state.rssSource.readStatus
})
const mapDispatch = {
    select: (id: RssSourceId) => selectRssSource(id)
}
const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>
type Props = PropsFromRedux

const SourceList: React.FC<Props> = ({ rssSources, selectedSourceId, refresh }: Props) => {
    //const loadStatus: Array<RssReadStatus | null> = useSelector<RootState, Array<RssReadStatus | null>>(getRssDocumentsReadStatus);
    return (
        <div id="sourceList">
            {rssSources && rssSources.map((source) => (
                <SourceListItem
                    key={source.id}
                    source={source}
                    isSelected={source.id === selectedSourceId}
                    refresh={source.id === selectedSourceId && refresh}
                />
            ))}
        </div>
    )
}

export default connector(SourceList)
