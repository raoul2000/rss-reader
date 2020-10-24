import React from 'react';
import { connect, ConnectedProps, useSelector } from 'react-redux'
import { RootState } from '../store'
import { selectRssSource } from '../store/rss-source/actions'
import { RssReadStatus, RssSourceReadStatus, RssSourceId } from '../store/rss-source/types'
import { getRssDocumentsReadStatus, getSelectedRssDocument } from '../store/rss-source/reducers'
import SourceListItem from './SourceListItem'

const mapState = (state: RootState) => ({
    rssSources: state.rssSource.rssSources,
    selectedRssDocument: getSelectedRssDocument(state.rssSource),
})
const mapDispatch = {
    select: (id: RssSourceId) => selectRssSource(id)
}
const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>
type Props = PropsFromRedux

const SourceList: React.FC<Props> = ({ rssSources, selectedRssDocument }: Props) => {

    const loadStatus = useSelector<RootState, Array<RssSourceReadStatus>>((state: RootState) => {
        return getRssDocumentsReadStatus(state.rssSource);
    })

    console.log('readStatus')
    console.log(loadStatus);
    const getRssReadStatus = (rssSourceId:RssSourceId):RssReadStatus | null => {
        const found = loadStatus.find( item => item.sourceId === rssSourceId);
        if(found) {
            return found.status;
        }
        return null;
    }
    return (
        <div id="sourceList">
            {rssSources && rssSources.map((source) => (
                <SourceListItem
                    key={source.id}
                    source={source}
                    isSelected={selectedRssDocument !== null && selectedRssDocument.rssSourceId === source.id}
                    readStatus={getRssReadStatus(source.id)}
                />
            ))}
        </div>
    )
}

export default connector(SourceList)
