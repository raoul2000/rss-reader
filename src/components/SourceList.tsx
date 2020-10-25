import React from 'react';
import { connect, ConnectedProps } from 'react-redux'
import { RootState } from '../store'
import SourceListItem from './SourceListItem'

const mapState = (state: RootState) => ({
    rssSources: state.rssSource.rssSources
})

const connector = connect(mapState);
type PropsFromRedux = ConnectedProps<typeof connector>
type Props = PropsFromRedux

const SourceList: React.FC<Props> = ({ rssSources }: Props) => {

    return (
        <div id="sourceList">
            {rssSources && rssSources.map((source) => (
                <SourceListItem
                    key={source.id}
                    sourceId={source.id}
                />
            ))}
        </div>
    )
}

export default connector(SourceList)
