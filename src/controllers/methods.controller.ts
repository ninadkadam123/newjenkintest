import { ok } from 'assert';
import { Request, Response } from 'express';

import mongoose from 'mongoose';
import { Method, MethodDetailsResponse } from '../interfaces/types';
import { getMethodDescription, getMethodDetailsForAdminForm, getMethodsByKeyword, getMethodsByTag, getMethodsList, getTagsByKeyword } from '../services/methods.service';
import logger from '../utils/logger';

export async function getMethodsListHandler (req: Request, res: Response) {
    try {
        logger.info('Get Methods')
        const methodsList = await getMethodsList();

        logger.info('Methods')

        return res.send(methodsList);
    }
    catch(e) {
        res.status(500).send(e.message);
    }
}

export async function getMethodDetailsHandler (req: Request<{methodId: mongoose.Types.ObjectId}>, res:Response<MethodDetailsResponse>) {
    try {
        const methodId = req.params.methodId;

        const method = await getMethodDescription(methodId);

        return res.send(method);
    }
    catch(e) {
        logger.error(e);
        return res.sendStatus(500);
    }
}

export async function getMethodDetailsForAdminHandler (req: Request<{methodId: mongoose.Types.ObjectId}>, res: Response) {
    try{
        const methodId = req.params.methodId;
        
        const method = await getMethodDetailsForAdminForm(methodId);

        return res.send(method);
    } catch(e) {
        logger.error(e);

        return res.sendStatus(500);
    }
}

export async function getTagByKeywordHandler(req: Request, res: Response){
    try{
        const part=req.query
        const keyword = part.keyword.toString();
        
        const page=parseInt(part.page.toString())
        const limit=parseInt(part.limit.toString())
        
        const methods= await getTagsByKeyword(keyword,page,limit)
        return res.status(200).send(methods);
        
    } catch(e) {
        logger.error(e);

        return res.sendStatus(500).send(e.message );
    }
}

export async function searchtag(req: Request, res: Response){
    try{
        
    const part=req.query
    let limit=5
    let page=0
    
    if(part.keyword===undefined ||part.keyword.toString()=="" ){
        return res.send(
            {tagList:[],methodFromTagsList:[],methodList:[]}
        )
       
    }
     let keyword=part.keyword.toString()
    
    if(part.limit===undefined){
        limit=5
    }else{
         limit=parseInt(part.limit.toString())||5
    }
    if(!part.page===undefined){
    
         page=parseInt(part.page.toString())-1 || 0
    }   
    
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
     const deTags=await getTagsByKeyword(keyword,limit,page)
   let  methodl1= await getMethodsByTag();  

    methodl1=methodl1.filter((data)=>{

        
        return data.designTags.find((dat)=>dat.tag.toLowerCase().includes(keyword.toLowerCase()))
    })
    
console.log(methodl1)
    


    const methodsl2=await getMethodsByKeyword(keyword,limit,page) 
    return res.send({tagList:deTags,methodFromTagsList:methodl1,methodList:methodsl2});
   
   
    
    

} catch(e) {
    logger.error(e);

    return res.send({
        msg:e.message
    } );
}




}