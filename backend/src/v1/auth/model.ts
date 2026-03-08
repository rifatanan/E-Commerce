import { model, Schema } from "mongoose";
import bcrypt from "bcrypt"

const userSchema = new Schema({

    name:{
        type:String,
        required:true,
        trim:true,
    },

    email:{
        type:String,
        required: true,
        unique: true,
        lowercase:true,
        trim: true,
        match: [
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            "Please enter a valid email address",
        ],
    },

    password:{
        type:String,
        required: true,
    },

},
    {
        timestamps: true,
    }
);

userSchema.pre("save", async function() {
    if (!this.isModified("password")) return;
    this.password = await bcrypt.hash(this.password, 10);
});

const User = model('User', userSchema);

export default User;