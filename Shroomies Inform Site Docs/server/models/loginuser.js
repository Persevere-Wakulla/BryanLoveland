// import mongoose from 'mongoose'
// const Schema = mongoose.Schema;
// import User from "./User.js";


//  (req, res) => {
//     const { username, password } = req.body;

//     User.findOne({username:username}, (error,User) => {
//         if (User) {
//             compare(password, User.password, (error, same) => {
//                 if(same) {
//                     res.redirect('/')
//                 }
//                 else {
//                     res.json('Not Logged In')
//                 }
//             })
//         }
//     })
// }

// const loginuser = mongoose.model('loginuser', UserSchema);

// export default loginuser