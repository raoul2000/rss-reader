import React from 'react';
import { connect, ConnectedProps } from 'react-redux'
import { RootState } from '../store'
import SourceListItem from './SourceListItem'
import { ScrollPanel } from 'primereact/scrollpanel';

const mapState = (state: RootState) => ({
    rssSources: state.rssSource.rssSources,
    selectedSourceId: state.rssSource.selectedSourceId
})

const connector = connect(mapState);
type PropsFromRedux = ConnectedProps<typeof connector>
type Props = PropsFromRedux

const SourceList: React.FC<Props> = ({ rssSources, selectedSourceId }: Props) => {

    return (
        <div id="sourceList">
            <ScrollPanel>
                {rssSources && rssSources.map((source) => (
                    <SourceListItem
                        key={source.id}
                        sourceId={source.id}
                        isSelected={source.id === selectedSourceId}
                    />
                ))}
            </ScrollPanel>
        </div>
    )
}

export default connector(SourceList)
