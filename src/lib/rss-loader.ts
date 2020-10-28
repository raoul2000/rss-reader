import Parser from 'rss-parser';
import { RssDocument, Item } from '../store/rss-source/types'
import uuid from 'uuid-random';
import {fetchViaProxy} from './fetch';

const getContent = (item: Parser.Item): string | undefined => {
    if(item.contentSnippet) {
        return item.contentSnippet;
    }
    if(item.content) {
        return item.content;
    }
    return 'no content available';
}
const getMainImageUrl = (item: Parser.Item): string | undefined => {
    if(item.mediaContent?.$?.url ){
        return item.mediaContent.$.url
    }
    if( item.enclosure?.url && item.enclosure?.type && item.enclosure?.type.startsWith('image/')) {
        return item.enclosure.url;
    }
}
const normalizeRssItem = (item: Parser.Item): Item => ({
    id: uuid(),
    title: item.title,
    content: getContent(item),
    link: item.link,
    pubDate: item.pubDate,
    imageUrl: getMainImageUrl(item)
})

const normalizeRssItems = (items?: Parser.Item[]): Item[] => {
    if (!items || !Array.isArray(items)) {
        return [];
    }
    return items
        .map(item => normalizeRssItem(item))
        .filter(item => item)
}

export const normalizeRssDocument = (doc: Parser.Output): RssDocument => {
    const normalizedItems = normalizeRssItems(doc.items);
    //debugger;
    return {
        title: doc.title,
        items: normalizedItems, // TODO: remove this
    }
}

export const fetchRssDocument = (url: string): Promise<RssDocument > => {
    const rssParser = new Parser({
        customFields: {
            //feed: ['extendedDescription'],
            item: [
                ['media:content', 'mediaContent'],
                ['enclosure']
            ],
        }
    });
    return rssParser.parseURL(url)
        .then(normalizeRssDocument);
}

export const fetchRssDocument2 = (url: string): Promise<RssDocument > => {
    const rssParser = new Parser({
        customFields: {
            //feed: ['extendedDescription'],
            item: [
                ['media:content', 'mediaContent'],
                ['enclosure']
            ],
        }
    });

    fetchViaProxy('https://www.lemonde.fr/rss/en_continu.xml')
    .then(result => {
        debugger;
        console.log(result);
    })
    .catch(console.error);

    return rssParser.parseURL(url)
        .then(normalizeRssDocument);
}