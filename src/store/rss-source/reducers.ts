import {
    RssSourceState, RssActionTypes, SELECT_RSS_SOURCE, ADD_RSS_SOURCE, DELETE_RSS_SOURCE, SET_RSS_DOCUMENT,
    LOAD_RSS_PENDING, LOAD_RSS_SUCCESS, LOAD_RSS_ERROR, SELECT_RSS_ITEM, RssReadStatus, RssSourceId, ADD_RSS_DOCUMENT_TO_CACHE, REMOVE_RSS_DOCUMENT_FROM_CACHE, RssDocumentCacheItem
} from './types'

export const initialState: RssSourceState = {
    rssSources: [],
    selectedRssSourceId: undefined,
    readStatus: undefined,
    readErrorMessage: undefined,
    rssDocument: undefined,
    selectedRssItemId: undefined,
    rssDocumentCache: []
}

export function rssSourceReducer(
    state = initialState,
    action: RssActionTypes
): RssSourceState {
    switch (action.type) {
        case SELECT_RSS_SOURCE:
            const isNewSelection = action.payload.id !== state.selectedRssSourceId
            if (isNewSelection) {
                return {
                    ...state,
                    selectedRssSourceId: action.payload.id,
                    selectedRssItemId: undefined
                }
            } else {
                return state
            }
        case ADD_RSS_SOURCE:
            return {
                ...state,
                rssSources: [...state.rssSources, action.payload.rssSource],
                rssDocumentCache: [...state.rssDocumentCache, {
                    rssSourceId: action.payload.rssSource.id,
                    rssDocument: null,
                    readStatus: null,
                    loadErrorMessage: null
                }]
            }
        case DELETE_RSS_SOURCE:
            return {
                ...state,
                rssSources: state.rssSources.filter(
                    source => source.id !== action.payload.id
                )
            }
        case SET_RSS_DOCUMENT:
            return {
                ...state,
                rssDocument: action.payload.rssDocument
            }
        case LOAD_RSS_PENDING:
            return {
                ...state,
                readStatus: RssReadStatus.PENDING,
                readErrorMessage: undefined,
                rssDocumentCache: state.rssDocumentCache.map(cacheItem => {
                    if (cacheItem.rssSourceId === action.payload.rssSourceId) {
                        return {
                            ...cacheItem,
                            readStatus: RssReadStatus.PENDING,
                            loadErrorMessage: null
                        }
                    } else {
                        return {
                            ...cacheItem
                        }
                    }
                })
            }
        case LOAD_RSS_SUCCESS:
            return {
                ...state,
                readStatus: RssReadStatus.SUCCESS,
                rssDocumentCache: state.rssDocumentCache.map(cacheItem => cacheItem.rssSourceId === action.payload.rssSourceId
                    ? {
                        ...cacheItem,
                        readStatus: RssReadStatus.SUCCESS
                    }
                    : {
                        ...cacheItem
                    }
                )
            }
        case LOAD_RSS_ERROR:
            return {
                ...state,
                readStatus: RssReadStatus.ERROR,
                readErrorMessage: action.payload.message,
                rssDocumentCache: state.rssDocumentCache.map(cacheItem => cacheItem.rssSourceId === action.payload.rssSourceId
                    ? {
                        ...cacheItem,
                        readStatus: RssReadStatus.ERROR,
                        loadErrorMessage: action.payload.message
                    }
                    : {
                        ...cacheItem
                    }
                )
            }
        case SELECT_RSS_ITEM:
            return {
                ...state,
                selectedRssItemId: action.payload.id
            }
        case ADD_RSS_DOCUMENT_TO_CACHE:
            let alreadyInCache: boolean = false;
            const updatedCache: Array<RssDocumentCacheItem> = [...state.rssDocumentCache]
                .map(item => {
                    if (item.rssSourceId === action.payload.rssSourceId) {
                        alreadyInCache = true;
                        return {
                            ...item,
                            rssDocument: action.payload.rssDocument
                        }
                    }
                    return item
                })
            if (!alreadyInCache) {
                updatedCache.push(action.payload)
            }
            return {
                ...state,
                rssDocumentCache: updatedCache
            }
        case REMOVE_RSS_DOCUMENT_FROM_CACHE:
            return {
                ...state,
                rssDocumentCache: [...state.rssDocumentCache]
                    .filter(item => item.rssSourceId !== action.payload.rssSourceId)
            }
        default:
            return state;
    }
}

// Selectors ////////////////////////////////////////////////////////////////////////////////////////////

export const getSelectedRssSource = (state: RssSourceState) => {
    const { rssSources, selectedRssSourceId } = state;
    if (rssSources && selectedRssSourceId) {
        return getRssSourceById(state, selectedRssSourceId);
    }
    return null;
}
export const getRssSourceById = (state: RssSourceState, sourceId: RssSourceId) => {
    const { rssSources } = state;
    if (rssSources && sourceId) {
        return rssSources.find(source => source.id === sourceId);
    }
    return null;
}
export const getRssItemById = (state: RssSourceState) => {
    const { rssDocument, selectedRssItemId } = state;
    if (rssDocument && rssDocument.items && selectedRssItemId) {
        return rssDocument.items.find(item => item.id === selectedRssItemId)
    }
    return null;
}
/**
 * Returns the Document for a given RSS Source or NULL if this Document has not been loaded
 * 
 * @param state the current state
 * @param rssSourceId the Rss Source Id
 */
export const getRssDocumentFromCache = (state: RssSourceState, rssSourceId: RssSourceId): RssDocumentCacheItem | null => {
    const { rssDocumentCache } = state;
    return rssDocumentCache.find(item => item.rssSourceId === rssSourceId) || null;
}

export const getSelectedRssDocument = (state: RssSourceState): RssDocumentCacheItem | null => {
    const { rssDocumentCache, selectedRssSourceId } = state;
    return rssDocumentCache.find(item => item.rssSourceId === selectedRssSourceId) || null;
}