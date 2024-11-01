import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    fname: String,
    lname: String,
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    recommended: Array,
    admin: Boolean,
    owner: Boolean
});

const User = mongoose.model('User', UserSchema);

export default User