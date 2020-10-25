import { RootState } from '..'
import {
    RssSourceState, RssActionTypes, Item, TOGGLE_SELECT_RSS_SOURCE, ADD_RSS_SOURCE, DELETE_RSS_SOURCE, SET_RSS_DOCUMENT,
    LOAD_RSS_PENDING, LOAD_RSS_SUCCESS, LOAD_RSS_ERROR, SELECT_RSS_ITEM, RssReadStatus, RssSourceId, RssItemId
} from './types'

export const initialState: RssSourceState = {
    rssSources: [],
    rssItems: []
}

export function rssSourceReducer(
    state = initialState,
    action: RssActionTypes
): RssSourceState {
    switch (action.type) {
        case TOGGLE_SELECT_RSS_SOURCE:
            return {
                ...state,
                rssSources: state.rssSources.map(source => source.id === action.payload.id
                    ? {
                        ...source,
                        selected: !source.selected
                    } : source)
            }
        case ADD_RSS_SOURCE:
            return {
                ...state,
                rssSources: [...state.rssSources, action.payload.rssSource],
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
                rssSources: state.rssSources.map(source => source.id === action.payload.rssSourceId
                    ? {
                        ...source,
                        document: action.payload.rssDocument
                    } : source)
            }
        case LOAD_RSS_PENDING:
            return {
                ...state,
                rssSources: state.rssSources.map(source => source.id === action.payload.rssSourceId
                    ? {
                        ...source,
                        readStatus: RssReadStatus.PENDING
                    } : source)
            }
        case LOAD_RSS_SUCCESS:
            return {
                ...state,
                rssSources: state.rssSources.map(source => source.id === action.payload.rssSourceId
                    ? {
                        ...source,
                        readStatus: RssReadStatus.SUCCESS,
                        document: action.payload.document
                    } : source),
                rssItems: [
                    ...state.rssItems,
                    ...action.payload.document.items
                ]
            }
        case LOAD_RSS_ERROR:
            return {
                ...state,
                rssSources: state.rssSources.map(source => source.id === action.payload.rssSourceId
                    ? {
                        ...source,
                        readStatus: RssReadStatus.ERROR,
                        loadErrorMessage: action.payload.message
                    } : source)
            }
        case SELECT_RSS_ITEM:
            return {
                ...state,
                rssItems: state.rssItems.map( item => item.id === action.payload.itemId 
                    ? {
                        ...item,
                        selected: true
                    } : {
                        ...item,
                        selected: false
                    })
            }
        default:
            return state;
    }
}

// Selectors ////////////////////////////////////////////////////////////////////////////////////////////


export const getRssSourceById = (id: RssSourceId) => (state: RootState) => {
    return state.rssSource.rssSources.find(source => source.id === id)
}
export const isRssSourceLoaded = (id: RssSourceId) => (state: RootState) => {
    return state.rssSource.rssSources.find(source => source.id === id && source.document !== null)
}
export const getSelectedRssDocuments = (state: RootState) => {
    return state.rssSource.rssSources
        .filter(source => source.selected && source.document)
        .map(source => source.document);
}
export const getRssItemById = (itemId: RssItemId) => (state: RootState): Item | null => {
    return state.rssSource.rssItems.find(item => item.id === itemId) || null;
}
export const getSelectedRssItem = (state: RootState): Item | null => {
    return state.rssSource.rssItems.find(item => item.selected) || null;
}
/* export const getSelectedRssSource = (state: RssSourceState) => {
    const { rssSources } = state;
    rssSources.filter( source => source.selected )
    const firstSelectedRssItem = rssDocumentCache.find(item => item.selected === true) || null;
    if(firstSelectedRssItem) {
        const source = getRssSourceById(state, firstSelectedRssItem.rssSourceId);
        return source || null
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
} */
/**
 * Returns the Document for a given RSS Source or NULL if this Document has not been loaded
 *
 * @param state the current state
 * @param rssSourceId the Rss Source Id
 */
/* export const getRssDocumentFromCache = (state: RssSourceState, rssSourceId: RssSourceId): RssDocumentCacheItem | null => {
    const { rssDocumentCache } = state;
    return rssDocumentCache.find(item => item.rssSourceId === rssSourceId) || null;
}

export const getSelectedRssDocument = (state: RssSourceState): RssDocumentCacheItem | null => {
    const { rssDocumentCache } = state;
    return rssDocumentCache.find(item => item.selected === true) || null;
}

export const getRssDocumentsReadStatus = (state: RssSourceState): Array<RssSourceReadStatus> => {
    const { rssDocumentCache } = state;
    if (rssDocumentCache) {
        return rssDocumentCache.map(item => ({
            sourceId: item.rssSourceId,
            status: item.readStatus
        }));
    }
    return [];
} */