import mongoose from "mongoose";
import { contributionLink, ReferenceFormat, ReferenceType } from "../interfaces/types";
import { FeedbackDocument } from "./feedback.models";
import { ContributionDocument } from "./contribution.model";
import { QuerrryDocument } from "./querry.model";


export interface UserDocument extends mongoose.Document {
    name:string,
   phone:string,
   email:string,
   linkdIn:string,
   behance:string,
   instagram:string,
   links:string[]
   feedbacks:FeedbackDocument['_id'][],
   contribution:ContributionDocument['_id'][],
   queries:QuerrryDocument['_id'][]
   role:string,
}

const userSchema = new mongoose.Schema<UserDocument>({
    name:String,
    phone:String,
    email:String,
    linkdIn:String,
    behance:String,
    instagram:String,
    links:[{
            type:String
        }],
    feedbacks: [{
            type: mongoose.Types.ObjectId,
            ref: 'FeedBacks'
        }],
    contribution: [{
            type: mongoose.Types.ObjectId,
            ref: 'Contribution'
        }],

        queries: [{
            type: mongoose.Types.ObjectId,
            ref: 'Queries'
        }],
    
    role:String,
}, {
    timestamps: {updatedAt:false}
});

const UserSchema = mongoose.model<UserDocument>('User', userSchema);

export default UserSchema