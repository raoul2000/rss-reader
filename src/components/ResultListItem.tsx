import React from 'react';
import { connect, ConnectedProps, useSelector } from 'react-redux'
import { selectRssItem } from '../store/rss-source/actions'
import { getRssItemById} from '../store/rss-source/reducers'
import classNames from 'classnames';

const mapDispatch = {
    selectRssItem
}

const connector = connect(null, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>
type Props = PropsFromRedux & {
    itemId: string,
    isSelected: boolean
}

const ResultListItem: React.FC<Props> = ({ itemId, isSelected, selectRssItem }: Props) => {
    const rssItem = useSelector(getRssItemById(itemId));
    const itemClassName = classNames({
        'rss-item': true,
        'selected': isSelected
    });

    return (
        <div
            className={itemClassName}
            onClick={() => rssItem && selectRssItem(rssItem.id)}
        >
            <small>
                {rssItem && rssItem.title}
            </small>
        </div>
    )
}

export default connector(ResultListItem)
