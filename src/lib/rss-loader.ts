import Parser from 'rss-parser';
import { RssDocument, Item, RssSourceId } from '../store/rss-source/types'
import md5 from 'blueimp-md5';

const normalizeRssItem = (item: Parser.Item, sourceId: RssSourceId): Item => ({
    id: md5(sourceId + (item.guid || item.id)),
    title: item.title,
    content: item.content,
    link: item.link,
    pubDate: item.pubDate
})

const normalizeRssItems = (sourceId: RssSourceId, items?: Parser.Item[]): Item[] => {
    if (!items || !Array.isArray(items)) {
        return [];
    }
    return items
        .map(item => normalizeRssItem(item, sourceId))
        .filter(item => item)
}

export const normalizeRssDocument = (sourceId: RssSourceId) => (doc: Parser.Output): RssDocument => {

    const normalizedItems = normalizeRssItems(sourceId, doc.items);

    return {
        title: doc.title,
        items: normalizedItems, // TODO: remove this
    }
}

export const fetchRssDocument = (url: string): Promise<Parser.Output> => {
    const rssParser = new Parser();
    return rssParser.parseURL(url)
}