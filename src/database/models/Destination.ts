import { model, Schema } from "mongoose";

const DestinationSchema = new Schema({
  destination: {
    type: String,
    required: true,
    unique: true,
  },
  image: {
    type: String,
    required: true,
  },
  backupImage: {
    type: String,
  },
  latitude: {
    type: Number,
    required: true,
  },
  longitud: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  firstPlan: {
    type: String,
    required: true,
  },
  descriptionFirstPlan: {
    type: String,
    required: true,
  },
  secondPlan: {
    type: String,
  },
  descriptionSecondPlan: {
    type: String,
  },
  thirdPlan: {
    type: String,
  },
  descriptionThirdPlan: {
    type: String,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const Destination = model("Destination", DestinationSchema, "destinations");

export default Destination;
