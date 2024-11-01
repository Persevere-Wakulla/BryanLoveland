import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const MdmaSchema = new Schema({
    body: String
});

const Mdma = mongoose.model('Mdma',MdmaSchema);

export default Mdma