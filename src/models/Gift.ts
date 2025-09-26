import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IGift extends Document {
  _id: mongoose.Types.ObjectId;
  title: string;
  image_link: string;
  image_alt?: string;
  thumb_url?: string;
  message?: string;
  love_surname: string;
  opened: boolean;
  opened_at?: Date;
  unlock_at?: Date;
  order: number;
  slug: string;
  created_at: Date;
  updated_at: Date;
}

const GiftSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    image_link: {
      type: String,
      required: true,
    },
    image_alt: {
      type: String,
    },
    thumb_url: {
      type: String,
    },
    message: {
      type: String,
    },
    love_surname: {
      type: String,
      required: true,
    },
    opened: {
      type: Boolean,
      default: false,
    },
    opened_at: {
      type: Date,
    },
    unlock_at: {
      type: Date,
    },
    order: {
      type: Number,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
);

const Gift: Model<IGift> = mongoose.models.Gift || mongoose.model<IGift>('Gift', GiftSchema);

export default Gift;
