import mongoose from 'mongoose';
import { AdminFormBody, MethodDetailsResponse, MethodDetailsResponseForAdmin } from '../interfaces/types';
import Methods from '../models/methods.model';
import DesignTags from '../models/designTags.model'
import Steps from '../models/methodSteps.model';
import References from '../models/reference.model';
import { formatedVideoData, getDistinctData } from '../utils/utils';

export async function getMethodsList () {
    try {
        const methodsList = await Methods.find({}).select(['title', 'illustration', 'category']).populate('category').sort([['title', 'ascending']]);

        return methodsList;
    }
    catch(e) {
        throw e;
    }
}

export async function getMethodDescription(methodId: mongoose.Types.ObjectId): Promise<MethodDetailsResponse> {
    try {
        const method = await Methods.findById(methodId).select(['-designTags', "-_v"]).populate(['category']).select({"category.category": 1, "category.color": 1});

        const steps = await Steps.find({method: method._id}).select(['stepNumber', 'title', 'description']).sort('stepNumber');

        const resources = await References.find({method: method._id}).select(['-method']);

        const {videos, articles} = getDistinctData(resources);

        const formatedVideos = formatedVideoData(videos);

        return {
            title: method.title,
            description: method.shortDescription,
            category: method.category,
            steps: steps,
            resources: {
                articles: articles,
                videos: formatedVideos
            }
        }
    }
    catch(e) {
        throw e;
    }
}


export async function getMethodDetailsForAdminForm(methodId: mongoose.Types.ObjectId): Promise<AdminFormBody> {
    try{
        const method = await Methods.findById(methodId).select(["-_v"]).populate(['category', 'designTags']).populate({path: 'designTags', populate: 'phase'});

        const steps = await Steps.find({method: method._id}).select(['stepNumber', 'title', 'description']).sort('stepNumber');

        const resources = await References.find({method: method._id}).select(['-method']);

        return {
            method: method,
            steps: steps,
            reference: resources
        }
    } catch(e) {
        throw e;
    }
}



export async function getTagsByKeyword(keyword:string,limit:number,page:number){
    try {
        
        let pattern=new RegExp(keyword)
        
        const tags=await DesignTags.find({"tag":{ $regex: pattern ,$options:'i'} }).limit(limit).skip(page*limit);
         
        return tags;
        
                 
      } catch (e) {

         throw e;
      }
}

export async function getMethodsByKeyword(keyword:string,limit:number,page:number){
    try {

        let pattern=new RegExp(keyword)
        
        const methods=await Methods.find({"title":{ $regex: pattern,$options:'i'} }).populate(['category']).select(['title','illustration','shortDescription']).limit(limit).skip(page*limit);
         
        return methods;
        
                 
      } catch (e) {

         throw e;
      }
}




export async function getMethodsByTag(){
    try {
        
        const methodsList=await Methods.find().populate(['category',"designTags"]);
        


        
        return methodsList;
        
                 
      } catch (e) {

         throw e;
      }
}
