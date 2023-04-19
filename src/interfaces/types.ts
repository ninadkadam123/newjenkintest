import { type } from "os";
import { DesignPhaseDocument } from "../models/designPhase.model";
import { MethodsDocument } from "../models/methods.model";
import { MethodStepsDocument } from "../models/methodSteps.model";
import { ReferenceDocument } from "../models/reference.model";
import { MethodCategoryDocument } from '../models/methodCategory.model';
import { DesignTagsDocument } from "../models/designTags.model";
import { FeedbackDocument } from "../models/feedback.models";
import { ContributionDocument } from "../models/contribution.model";
import { QuerrryDocument } from "../models/querry.model";

export type AddDesignPhaseRequest = {
    body: DesignPhaseDocument
}

export enum ReferenceType {
    Resource = "Resource",
    Example = "Example"
}

export enum ReferenceFormat {
    Video = "Video",
    Article = "Article"
}

export type Method = Pick<MethodsDocument, 'title' | 'illustration' | 'shortDescription' | 'designTags' | 'category'>;

export type Reference = Pick<ReferenceDocument, 'type' | 'format' | 'link'>;

export type MethodSteps = Pick<MethodStepsDocument, 'title' | 'description' | 'stepNumber'>;

export type AdminFormBody = {
    method: Method,
    reference: Reference[],
    steps: MethodSteps[]
}

export type ReferenceVideo = {
    uri: string,
    youtubeVideoId: string,
    id: string
}

export type MethodDetailsResponse = {
    title: string,
    description: string,
    category: MethodCategoryDocument,
    steps: MethodSteps[],
    resources: {
        articles: Pick<ReferenceDocument, 'type' | 'format' | 'link' | '_id'>[],
        videos: ReferenceVideo[]
    }
}

export type MethodDetailsResponseForAdmin = {
    id: string,
    title: string,
    description: string,
    illustration: string,
    designTags: DesignTagsDocument[],
    category: MethodCategoryDocument,
    references: Reference[],
    steps: MethodSteps[]
}

export type FeedbackBody = {
    message: string,
    email?: string
}

export type GetFeedbackResponse = {
    _id: string,
    email: string,
    feedback: string,
    status: FeedbackStatus,
    resolved: boolean,
    createdAt: string
}[]

export enum FeedbackStatus {
    new,
    rose,
    bud,
    thorn,
    bin
}

export type UpdateFeedbackStatusBody = {
    updatedStatus: FeedbackStatus
}

export type ResolveFeedbackBody={
    resolved:boolean
}

export type QuerryBody = {
    question: string,
    email?: string,
    designTags:DesignTagsDocument[]
    
}

export type contributionLink={
    link:string,
    format:ReferenceFormat
}

export type contributionResponse={
    suggestion:string,
    email?:string,
    kits:string[],
    links:contributionLink[]
}


export type userBody={
   name:string,
   phone?:string,
   email?:string,
   linkdIn?:string,
   behance?:string,
   instagram?:string,
   links:string[],
   feedbacks:FeedbackDocument[],
   contribution:ContributionDocument[],
   querie:QuerrryDocument[]
   role:string,
}

