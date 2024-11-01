import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const NewsArticlesSchema = new Schema({
    Date: String,
    title: String,
    p: String,
    image: String
});

const NewsArticles = mongoose.model('NewsArticles',NewsArticlesSchema);

export default NewsArticles