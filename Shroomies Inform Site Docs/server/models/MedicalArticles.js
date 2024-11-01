import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const MedicalArticlesSchema = new Schema({
    date: String,
    doctor: String,
    title: String,
    image: String,
    p: String
});

const MedicalArticles = mongoose.model('MedicalArticles',MedicalArticlesSchema);

export default MedicalArticles