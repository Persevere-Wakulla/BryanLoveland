import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const PsilocybinSchema = new Schema({
    body: String
});

const Psilocybin = mongoose.model('Psilocybin',PsilocybinSchema);

export default Psilocybin