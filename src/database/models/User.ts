import { model, Schema } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  secondName: {
    type: String,
  },
  userName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  destinations: [{ type: Schema.Types.ObjectId, ref: "Destination" }],
});

const User = model("Users", userSchema, "users");

export default User;
