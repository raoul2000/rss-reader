import { ThunkAction, ThunkDispatch } from 'redux-thunk'
import {
    RssActionTypes, RssSourceId, RssSource, RssItemId, RssDocument, SET_RSS_DOCUMENT, SELECT_RSS_SOURCE, ADD_RSS_SOURCE, DELETE_RSS_SOURCE,
    LOAD_RSS_PENDING, LOAD_RSS_SUCCESS, LOAD_RSS_ERROR, SELECT_RSS_ITEM
} from './types'
import { fetchRssDocument, normalizeRssDocument } from '../../lib/rss-loader';


export function selectRssSource(rssSourceId: RssSourceId): RssActionTypes {
    return {
        type: SELECT_RSS_SOURCE,
        payload: {
            rssSourceId
        }
    }
}
export function addRssSource(source: RssSource): RssActionTypes {
    return {
        type: ADD_RSS_SOURCE,
        payload: {
            rssSource: source
        }
    }
}
export function deleteRssSource(rssSourceId: RssSourceId): RssActionTypes {
    return {
        type: DELETE_RSS_SOURCE,
        payload: {
            rssSourceId
        }
    }
}
export function setRssDocument(rssSourceId: RssSourceId, rssDocument: RssDocument): RssActionTypes {
    return {
        type: SET_RSS_DOCUMENT,
        payload: {
            rssSourceId,
            rssDocument
        }
    }
}
export function setRssLoadingPending(rssSourceId: RssSourceId): RssActionTypes {
    return {
        type: LOAD_RSS_PENDING,
        payload: {
            rssSourceId
        }
    }
}
export function setRssLoadingSuccess(rssSourceId: RssSourceId, document: RssDocument): RssActionTypes {
    return {
        type: LOAD_RSS_SUCCESS,
        payload: {
            rssSourceId,
            document
        }
    }
}
export function setRssLoadingError(rssSourceId: RssSourceId, message: string): RssActionTypes {
    return {
        type: LOAD_RSS_ERROR,
        payload: {
            rssSourceId,
            message
        }
    }
}
export function selectRssItem(itemId: RssItemId): RssActionTypes {
    return {
        type: SELECT_RSS_ITEM,
        payload: {
            itemId
        }
    }
}
/**
 * Load an RSS Source and store it as a RssDocument object.
 * The URL of the RSS Source is used to perform an HTTP/GET request. The response is then
 * parsed as a RssDocument object and stored. 
 * 
 * This *thunk* action will update the `readStatus` property to reflect request progress.
 * 
 * @param rssSource the RSS source to load
 */
export function loadRssDocument(rssSource: RssSource): ThunkAction<void, {}, {}, RssActionTypes> {
    return (dispatch: ThunkDispatch<{}, {}, RssActionTypes>): void => {
        dispatch(setRssLoadingPending(rssSource.id));
        fetchRssDocument(rssSource.url)
            .then(normalizeRssDocument(rssSource.id))
            .then((result) => {
                dispatch(setRssLoadingSuccess(rssSource.id, result));
            })
            .catch(error => {
                dispatch(setRssLoadingError(rssSource.id, error.message));
            })
    }
}

