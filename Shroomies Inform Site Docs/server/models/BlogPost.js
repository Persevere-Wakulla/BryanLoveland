import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const BlogPostSchema = new Schema({
    author: String,
    date: String,
    title: String,
    image: String,
    recommend:{
        type: Number,
        default: 0
    },
   sections: Array,
    comment: Array
});

const BlogPost = mongoose.model('BlogPost',BlogPostSchema);

export default BlogPost