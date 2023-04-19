import mongoose from 'mongoose';

export interface MethodCategoryDocument extends mongoose.Document {
    category: string,
    color: string
}

const methodCategorySchema = new mongoose.Schema<MethodCategoryDocument>({
    category: String,
    color: String
});

const MethodCategorySchema = mongoose.model<MethodCategoryDocument>('MethodCategory', methodCategorySchema);

export default MethodCategorySchema;