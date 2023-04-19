import mongoose from "mongoose";
import { contributionLink, ReferenceFormat, ReferenceType } from "../interfaces/types";


export interface ContributionDocument extends mongoose.Document {
    email:string,
    links:contributionLink[]
    suggestion:string[],
    kits:string[],
}

const contributionSchema = new mongoose.Schema<ContributionDocument>({
    email:String,
    suggestion:String,
    links:[{
            link:String,
            format:String,
        }],
    kits:[{
        type:String,
    }]
}, {
    timestamps: {updatedAt:false}
});

const ContributionSchema = mongoose.model<ContributionDocument>('Contribution', contributionSchema);

export default ContributionSchema;



