import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const BlogCommentSchema = new Schema({
    postId: String,
    author: String,
    date: Date,
    body: String,
    commentId: Number
});

const BlogComment = mongoose.model('BlogComment',BlogCommentSchema);

export default BlogComment