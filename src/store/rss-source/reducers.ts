import { RootState } from '..'
import {
    RssSourceState, RssActionTypes, Item, SELECT_RSS_SOURCE, ADD_RSS_SOURCE, DELETE_RSS_SOURCE, SET_RSS_DOCUMENT,
    LOAD_RSS_PENDING, LOAD_RSS_SUCCESS, LOAD_RSS_ERROR, SELECT_RSS_ITEM, RssReadStatus, RssSourceId, RssItemId, RssSource
} from './types'

export const initialState: RssSourceState = {
    rssSources: [],
    rssItems: [],
    selectedItemId: null,
    selectedSourceId: null
}

export function rssSourceReducer(
    state = initialState,
    action: RssActionTypes
): RssSourceState {
    switch (action.type) {
        case SELECT_RSS_SOURCE:

            return {
                ...state,
                selectedSourceId: action.payload.rssSourceId,
                selectedItemId: action.payload.rssSourceId === state.selectedSourceId ? state.selectedItemId : null
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
                    source => source.id !== action.payload.rssSourceId
                ).map(source => ({ ...source }))
            }
        case SET_RSS_DOCUMENT:
            return {
                ...state,
                rssSources: state.rssSources.map(source => source.id === action.payload.rssSourceId
                    ? {
                        ...source,
                        document: action.payload.rssDocument
                    } : { ...source })
            }
        case LOAD_RSS_PENDING:
            return {
                ...state,
                rssSources: state.rssSources.map(source => source.id === action.payload.rssSourceId
                    ? {
                        ...source,
                        readStatus: RssReadStatus.PENDING
                    } : { ...source })
            }
        case LOAD_RSS_SUCCESS:
            return {
                ...state,
                rssSources: state.rssSources.map(source => source.id === action.payload.rssSourceId
                    ? {
                        ...source,
                        readStatus: RssReadStatus.SUCCESS,
                        documentInfo: {
                            title: action.payload.document.title,
                            itemIds: action.payload.document.items.map(item => item.id)
                        }
                    } : { ...source }),
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
                    } : { ...source })
            }
        case SELECT_RSS_ITEM:
            return {
                ...state,
                selectedItemId: action.payload.itemId
            }
        default:
            return state;
    }
}

// Selectors ////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Returns TRUE if a given source is loaded given its Id, FALSE otherwise
 * @param id the source Id
 */
export const isRssSourceLoaded = (id: RssSourceId) => (state: RootState): boolean => {
    const source = getRssSourceById(id)(state);
    return source?.documentInfo ? true : false;
}
/**
 * Returns an `RssSource` object given its Id, or *undefined* if no such RSS source could be found
 * @param id the source Id
 */
export const getRssSourceById = (id: RssSourceId) => (state: RootState): RssSource | undefined => {
    return state.rssSource.rssSources.find(source => source.id === id)
}
/**
 * Returns an `Item` object given its Id, or *undefined* if no such RSS item could be found, for example
 * if the parent RSS Source as not been loaded
 * @param itemId the Rss Item Id
 */
export const getRssItemById = (itemId: RssItemId) => (state: RootState): Item | undefined => {
    return state.rssSource.rssItems.find(item => item.id === itemId);
}
/**
 * Returns the list of RSS Item ids for a given RSS Source. If the source as not been loaded
 * returns an empty array
 * @param sourceId a list of Rss Item ids
 */
export const getRssItemIdsBySourceId = (sourceId: RssSourceId) => (state: RootState): RssItemId[] => {
    const rssSource = getRssSourceById(sourceId)(state);
    if (rssSource) {
        return rssSource.documentInfo?.itemIds || []
    }
    return [];
}
/**
 * Returns a list of all `Item` object for a given source. If the source has not been successfully loaded
 * this selector returns an empty array
 * @param sourceId the RSS source Id
 */
export const getRssItemsBySourceId = (sourceId: RssSourceId) => (state: RootState): Item[] => {
    const rssItemIds = getRssItemIdsBySourceId(sourceId)(state);
    const result: Item[] = [];
    rssItemIds.forEach(rssItemId => {
        const item = getRssItemById(rssItemId)(state);
        if (item) {
            result.push(item);
        }
    });
    return result;
}
/**
 * Returns a list of RSS Items for the selected RSS source. An empty array is returned
 * if no source is selected
 * @param state the current state
 */
export const getRssItemsForSelectedSource = (state: RootState): Item[] => {
    if (state.rssSource.selectedSourceId) {
        return getRssItemsBySourceId(state.rssSource.selectedSourceId)(state);
    }
    return [];
}
/**
 * Returns the selected RSS Item or *undefined* if no item is selected
 * @param state the current state
 */
export const getSelectedRssItem = (state: RootState): Item | undefined => {
    if (state.rssSource.selectedItemId) {
        return getRssItemById(state.rssSource.selectedItemId)(state);
    }
}