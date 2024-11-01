import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const PetitionFormSchema = new Schema({
    fname: String,
    lname: String,
    pnum: String,
    email: String,
    state: String,
    comment: String
});

const PetitionForm = mongoose.model('PetitionForm',PetitionFormSchema);

export default PetitionForm