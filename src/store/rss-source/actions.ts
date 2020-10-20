import { ThunkAction, ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux';
import {
    RssActionTypes, RssSourceId, RssSource, RssItemId, RssDocument, RssReadStatus, RssDocumentCacheItem, SELECT_RSS_SOURCE, ADD_RSS_SOURCE, DELETE_RSS_SOURCE, SET_RSS_DOCUMENT,
    LOAD_RSS_PENDING, LOAD_RSS_SUCCESS, LOAD_RSS_ERROR, SELECT_RSS_ITEM, ADD_RSS_DOCUMENT_TO_CACHE, REMOVE_RSS_DOCUMENT_FROM_CACHE
} from './types'
import {fetchRssDocument} from '../../lib/rss-loader';

export function selectRssSource(id: RssSourceId): RssActionTypes {
    return {
        type: SELECT_RSS_SOURCE,
        payload: {
            id
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
export function deleteRssSource(id: RssSourceId): RssActionTypes {
    return {
        type: DELETE_RSS_SOURCE,
        payload: {
            id
        }
    }
}
export function setRssDocument(rssDocument?: RssDocument): RssActionTypes {
    return {
        type: SET_RSS_DOCUMENT,
        payload: {
            rssDocument
        }
    }
}
export function setRssLoadingPending(): RssActionTypes {
    return {
        type: LOAD_RSS_PENDING,
        payload: {}
    }
}
export function setRssLoadingSuccess(): RssActionTypes {
    return {
        type: LOAD_RSS_SUCCESS,
        payload: {}
    }
}
export function setRssLoadingError(message: string): RssActionTypes {
    return {
        type: LOAD_RSS_ERROR,
        payload: {
            message
        }
    }
}
export function selectRssItem(id?: RssItemId): RssActionTypes {
    return {
        type: SELECT_RSS_ITEM,
        payload: {
            id
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
export function loadRssDocument(rssSource: RssSource): ThunkAction<void, {}, {}, AnyAction> {
    return (dispatch: ThunkDispatch<{}, {}, AnyAction>): void => {
        dispatch(setRssLoadingPending());
        fetchRssDocument(rssSource.url)
            .then((result) => {
                dispatch(setRssLoadingSuccess());
                dispatch(setRssDocument(result));
                dispatch(addRssDocumentToCache({rssSourceId: rssSource.id, rssDocument: result, readStatus: RssReadStatus.SUCCESS}))
            })
            .catch(error => {
                dispatch(setRssLoadingError(error.message));
                dispatch(setRssDocument());
            })
    }
}
/**
 * Add a RSS Document Item to cache. If an item with the same `rssSourceId` is present in the
 * cache, then it is updated
 * @param item the Rss Document cache item to add
 */
export function addRssDocumentToCache(item:RssDocumentCacheItem):RssActionTypes {
    return {
        type: ADD_RSS_DOCUMENT_TO_CACHE,
        payload: item
    }
}

export function removeRssDocumentFromCache(rssSourceId: RssSourceId):RssActionTypes {
    return {
        type: REMOVE_RSS_DOCUMENT_FROM_CACHE,
        payload: {
            rssSourceId
        }
    }
}

/* export function refreshRssDocument(rssSourceId: RssSourceId): ThunkAction<void, {}, {}, AnyAction> {
    return (dispatch: ThunkDispatch<{}, {}, AnyAction>): void => {
        dispatch(setRssLoadingPending());
        fetchRssDocument(rssSource.url)
            .then((result) => {
                dispatch(setRssLoadingSuccess());
                dispatch(setRssDocument(result));
                dispatch(addRssDocumentToCache({rssSourceId: rssSource.id, rssDocument: result, readStatus: RssReadStatus.SUCCESS}))
            })
            .catch(error => {
                dispatch(setRssLoadingError(error.message));
                dispatch(setRssDocument());
            })
    }
} */
