import { Action } from 'redux';

export const ADD_RSS_SOURCE = "@rssSource/ADD_RSS_SOURCE";
export const SELECT_RSS_SOURCE = "@rssSource/SELECT_RSS_SOURCE";
export const DELETE_RSS_SOURCE = "@rssSource/DELETE_RSS_SOURCE";

export const LOAD_RSS_PENDING = "@rssSource/LOAD_RSS_PENDING";
export const LOAD_RSS_SUCCESS = "@rssSource/LOAD_RSS_SUCCESS";
export const LOAD_RSS_ERROR = "@rssSource/LOAD_RSS_ERROR";

export const LOAD_RSS_DOCUMENT = "@rssSource/LOAD_RSS_DOCUMENT";
export const SET_RSS_DOCUMENT = "@rssSource/SET_RSS_DOCUMENT";
export const SELECT_RSS_ITEM = "@rssSource/SELECT_RSS_ITEM";

export type RssSourceId = string;
export type RssItemId = string;

export type RssItemEntry = { [key:string]: Item};

/**
 * The status of the RSS read operation
 */
export enum RssReadStatus {
    IDLE = "IDLE",
    /**
     * The RSS source is about to be read
     */
    PENDING = "PENDING",
    /**
     * The RSS source was read successfully
     */
    SUCCESS = "SUCCESS",
    /**
     * The RSS source read operation ended up in error
     */
    ERROR = "ERROR"
}
/**
 * Represents the parsed verison of an RSS source
 */
export interface RssDocument {
    title?: string
    items: Item[]
}
/**
 * Describes the RSS document related to an RSS Source. Note that for normalization purposes,
 * RSS Items are not store here only their Ids
 */
export interface RssDocumentInfo {
    title?: string
    itemIds: RssItemId[]
}
/**
 * Represent an RSS Source instance
 */
export interface RssSource {
    /**
     * ID of the RSS source
     */
    id: RssSourceId
    /**
     * Source name displayed to the user
     */
    label: string
    /**
     * URL of the RSS feed for this source
     */
    url: string
    /**
     * Describes the status of the latest RSS read operation. Set to
     * NULL when no read operation as occured 
     */
    readStatus: RssReadStatus | null
    /**
     * Error message for the latest read operation. Set to NULL
     * if the latest operation was successful, or if this source has not
     * been read
     */
    loadErrorMessage: string | null
    /**
     * Content of this RSS source 
     */
    documentInfo: RssDocumentInfo | null
}
/**
 * Represent an entry in the RSS Document article list 
 */
export interface Item {
    id: string;
    title?: string;
    content?: string;
    link?: string;
    pubDate?: string;
    imageUrl?: string
}

export interface RssSourceState {
    /**
     * The list of RSS sources currently loaded in the app. 
     */
    rssSources: Array<RssSource>;
    /**
     * List of all RSS Items that were loaded. This list of Items is empty
     * when the application starts, or no RSS source have been successfully loaded
     */    
    rssItems: Array<Item>
    /**
     * The current RSS source being selected or NULL if none is selected
     */
    selectedSourceId: RssSourceId | null
    /**
     * The current RSS Item being selected or NULL if none is selected
     */
    selectedItemId: RssItemId | null
}

// Action types /////////////////////////////////////////////////////////////////////////////////////////////////////

interface SelectRssSourceAction extends Action {
    type: typeof SELECT_RSS_SOURCE,
    payload: {
        rssSourceId: RssSourceId
    }
}
interface AddRssSourceAction extends Action {
    type: typeof ADD_RSS_SOURCE,
    payload: {
        rssSource: RssSource
    }
}
interface DeleteRssSourceAction extends Action {
    type: typeof DELETE_RSS_SOURCE,
    payload: {
        rssSourceId: RssSourceId
    }
}
interface setRssLoadingPendingAction extends Action {
    type: typeof LOAD_RSS_PENDING,
    payload: {
        rssSourceId: RssSourceId
    }
}
interface setRssLoadingSuccessAction extends Action {
    type: typeof LOAD_RSS_SUCCESS,
    payload: {
        rssSourceId: RssSourceId
        document: RssDocument
    }
}
interface setRssLoadingErrorAction extends Action {
    type: typeof LOAD_RSS_ERROR,
    payload: {
        rssSourceId: RssSourceId,
        message: string
    }
}
interface setRssDocumentAction extends Action {
    type: typeof SET_RSS_DOCUMENT,
    payload: {
        rssSourceId: RssSourceId,
        rssDocument: RssDocument | null
    }
}
interface LoadRssDocumentAction extends Action {
    type: typeof LOAD_RSS_DOCUMENT,
    payload: {
        rssSourceId: RssSourceId,
        rssSource: RssSource
    }
}
interface SelectRssItemAction extends Action {
    type: typeof SELECT_RSS_ITEM,
    payload: {
        itemId: RssItemId | null
    }
}

export type RssActionTypes = SelectRssSourceAction | AddRssSourceAction | DeleteRssSourceAction | setRssDocumentAction | LoadRssDocumentAction
    | setRssLoadingPendingAction | setRssLoadingSuccessAction | setRssLoadingErrorAction | SelectRssItemAction;