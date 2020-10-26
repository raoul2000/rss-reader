import { RootState } from '..'
import {
    RssSourceState, RssActionTypes, Item, SELECT_RSS_SOURCE, ADD_RSS_SOURCE, DELETE_RSS_SOURCE, SET_RSS_DOCUMENT,
    LOAD_RSS_PENDING, LOAD_RSS_SUCCESS, LOAD_RSS_ERROR, SELECT_RSS_ITEM, RssReadStatus, RssSourceId, RssItemId, RssDocumentInfo, RssSource
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
                selectedItemId: null
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
                        document: action.payload.document
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
                rssItems: state.rssItems.map(item => item.id === action.payload.itemId
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

export const isRssSourceLoaded = (id: RssSourceId) => (state: RootState):boolean => {
    const source = getRssSourceById(id)(state);
    return source?.documentInfo ? true : false;
}
export const getRssSourceById = (id: RssSourceId) => (state: RootState): RssSource | undefined => {
    return state.rssSource.rssSources.find(source => source.id === id)
}
export const getRssItemById = (itemId: RssItemId) => (state: RootState): Item | undefined => {
    return state.rssSource.rssItems.find(item => item.id === itemId);
}
export const getRssItemIdsBySourceId = (sourceId: RssSourceId) => (state:RootState): RssItemId[] => {
    const rssSource = getRssSourceById(sourceId)(state);
    if(rssSource) {
        return rssSource.documentInfo?.itemIds || []
    }
    return [];
}
export const getRssItemsBySourceId = (sourceId: RssSourceId) => (state: RootState): Item[] => {
    const rssItemIds = getRssItemIdsBySourceId(sourceId)(state);
    const result:Item[] = [];
    rssItemIds.forEach( rssItemId => {
        const item = getRssItemById(rssItemId)(state);
        if(item) {
            result.push(item);
        }
    });
    return result;
}
export const getRssItemsForSelectedSource = (state:RootState): Item[] => {
    if(state.rssSource.selectedSourceId) {
        return getRssItemsBySourceId(state.rssSource.selectedSourceId)(state);
    }
    return [];
}
export const getSelectedRssSource = (state: RootState): RssSource | undefined => {
    if(state.rssSource.selectedSourceId) {
        return getRssSourceById(state.rssSource.selectedSourceId)(state);
    }
}
export const getSelectedRssItem = (state:RootState): Item | undefined => {
    if(state.rssSource.selectedItemId){
        return getRssItemById(state.rssSource.selectedItemId)(state);
    }
}