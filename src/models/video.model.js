import mongoose, { Schema, SchemaType } from "mongoose";
import mongooseAggregratePaginate from "mongoose-aggregrate=paginate-v2";

const userSchema = new Schema({
    videoFile: {
        type: String, //cloudinary url
        required: true,

    },
    thumbNail: {
        type: String, //cloudinary url
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    duration: {
        type: Number,
        required: true,
    },
    views: {
        type: Number,
        default: 0,
    },
    isPublished: {
        type: Boolean,
        default: false,
        
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',

    }    

},{timestamps: true})

videoSchema.plugin(mongooseAggregratePaginate)

export const Video = mongoose.model("Video" , userSchema)