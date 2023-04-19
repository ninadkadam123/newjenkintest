import { DesignPhaseDocument } from "../models/designPhase.model";
import DesignPhase from '../models/designPhase.model';
import DesignTag from '../models/designTags.model';
import MethodCategory, { MethodCategoryDocument } from '../models/methodCategory.model';
import { Method, MethodSteps, Reference } from "../interfaces/types";
import DesignMethod, { MethodsDocument } from '../models/methods.model';
import MethodReference from '../models/reference.model';
import StepsModel from '../models/methodSteps.model';

export async function addDesignPhase (input: DesignPhaseDocument) {
    try {
        const designPhase = await DesignPhase.create(input);

        return designPhase;

    }
    catch(e) {
        throw e;
    }
}

export async function addDesignTags (input: {
    phase: string,
    tag: string
}[]) {
    try {

        const designPhases = await Promise.all(input.map( async (i) => {
            const designPhase = await DesignPhase.findOne({ name: i.phase });

            return {
                phase: designPhase,
                tag: i.tag
            }
        }))

        const designTag = await DesignTag.create(designPhases);


        return designTag;
    }
    catch(e) {
        throw e;
    }
}

export async function getDesignTags () {
    try {
        const designTags = await DesignTag.find().populate('phase');

        return designTags;
    }
    catch(e) {
        throw e;
    }
}


export async function deleteAllTags() {
    try {
        return DesignTag.remove();
    }
    catch(e) {
        throw e;
    }
}

export async function addMethodCategory(input: {category: string, color: string}[]) {
    try {
        const methodCategory = await MethodCategory.create(input);

        return methodCategory;
    }
    catch(e) {
        throw e;
    }
}

export async function addMethod(input: Method) {
    try {
        const method = await DesignMethod.create(input);

        return method;
    }
    catch(e) {
        throw e;
    }
}

export async function addReference(input: Reference[]) {
    try {
        const reference = await MethodReference.create(input);

        return reference;
    }
    catch(e) {
        throw e;
    }
}

export async function addSteps(input: MethodSteps[]) {
    try {
        const steps = await StepsModel.create(input);

        return steps;
    }
    catch(e) {
        throw e;
    }
}

export async function getMethodCategory() {
    try {
        const category = await MethodCategory.find();

        return category;
    }
    catch(e) {
        throw e;
    }
}


export async function updateMethodDetails (id: MethodsDocument['_id'], updatedDetails: Method) {
    try{
        await DesignMethod.findOneAndUpdate({_id: id}, updatedDetails);

        return 'Successfully updated designMethods';
    } catch(e) {
        throw e;
    }
}

export async function updateMethodSteps(id: MethodsDocument['_id'], updatedSteps: MethodSteps[]) {
    try{
        const method = await DesignMethod.findById(id);

        await StepsModel.deleteMany({method: id});

        const steps = updatedSteps.map(i => {
            return {
                ...i,
                method: id
            }
        });

        await addSteps(steps);

        return 'Successfully updated steps';
    } catch(e) {
        throw e;
    }
}

export async function updateMethodReference(id: MethodsDocument['_id'], updatedReferences: Reference[]) {
    try{

        const references = updatedReferences.map(i => {
            return {
                ...i,
                method: id
            }
        });

        await MethodReference.deleteMany({method: id});

        await addReference(references);
        
        return 'Successully updated references';
    } catch(e) {
        throw e;
    }
}


export async function deleteMethod(id: MethodsDocument['_id']) {
    try{
        await DesignMethod.findByIdAndDelete(id);
        
        return 'Method Deleted Successfully';

    } catch(e) {
        throw e;
    }
}

export async function deleteSteps(id: MethodsDocument['_id']) {
    try{
        await StepsModel.deleteMany({method: id});

        return 'Steps deleted Successfully';

    } catch(e) {
        throw e;
    }
}

export async function deleteReferences(id: MethodsDocument['_id']) {
    try{
        await MethodReference.deleteMany({method: id});

        return 'Reference Deleted Successfully';

    } catch(e) {
        throw e;
    }
}