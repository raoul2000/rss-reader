import React from 'react';
import { connect, ConnectedProps } from 'react-redux'
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
