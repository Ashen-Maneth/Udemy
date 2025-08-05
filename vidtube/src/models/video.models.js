import mongoose , {Schema} from "mongoose";
import mongooseaggregatepaginate from "mongoose-aggregate-paginate-v2"


const videoSchema = new Schema(
    {
        videoFile : {
            type : String,
            required : true
        },
        thumbnail : {
            type : String,
            required : true
        },
        title : {
            type : String,
            required : true
        },
        description : {
            type : String,
            required : true
        },
        views : {
            type : Number,
            required : true
        },
        duration : {
            type : Number,
            required : true
        },
        ispublished : {
            type : Boolean,
            required : true
        },
        owner : {
            type : Schema.Types.ObjectId,
            ref : "User",
            required : true
        }


    }, 
    {
        timestamps : true
    }
);




videoSchema.plugin(mongooseaggregatepaginate);


export const Video = mongoose.model("Video", videoSchema);