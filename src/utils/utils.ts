import { ReferenceFormat, ReferenceVideo } from '../interfaces/types';
import { ReferenceDocument } from '../models/reference.model';
import logger from './logger';


type ReferenceList = Pick<ReferenceDocument, 'type' | 'format' | 'link' | "_id">[];

export function getDistinctData(
    list: ReferenceList
): {
    videos: ReferenceList,
    articles: ReferenceList
} {
    let videoList: ReferenceList = [];
    let articleList: ReferenceList = [];

    list.forEach(i => {
        if(i.format === ReferenceFormat.Video) {
            videoList.push(i);
        }
        else if(i.format === ReferenceFormat.Article) {
            articleList.push(i);
        }
    })

    return {
        videos: videoList,
        articles: articleList
    }
}

export function formatedVideoData(list: ReferenceList): ReferenceVideo[] {
    try {
        return list.map(i => {

            const id = new URL(i.link).searchParams.get('v');

            return {
                uri: i.link,
                id: i._id,
                youtubeVideoId: id
            }
        })
    }
    catch(e) {
        logger.error(e);
        return []
    }
}

export function formatImageUrl (url: string): string {
    try{
        const stringToRemove = "file/d/";
    
        const removedStringIndex = url.indexOf('file/d/');
    
        const stringToAdd = "uc?export=view&id=";
    
        if(removedStringIndex > -1) {
            let finalUrl = url.substring(0, removedStringIndex) + stringToAdd + url.substring(removedStringIndex + stringToRemove.length);
        
            finalUrl = finalUrl.split('/').slice(0, finalUrl.split('/').length - 1).join('/');
        
            return finalUrl;
        }

        return url;

    } catch(e) {
        return url;
    }

    

}