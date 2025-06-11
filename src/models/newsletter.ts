import mongoose, { Schema, Document } from 'mongoose';

export interface INewsletter extends Document {
  userId: string;
  name: string;
  prompt: string;
  timeOfDay: string;
  emailList: string[];
}

const NewsletterSchema: Schema = new Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  prompt: { type: String, required: true },
  timeOfDay: { type: String, required: true }, // formato "HH:mm"
  emailList: { type: [String], required: true },
});

export const Newsletter = mongoose.model<INewsletter>('Newsletter', NewsletterSchema);