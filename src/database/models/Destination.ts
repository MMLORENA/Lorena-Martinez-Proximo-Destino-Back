import { model, Schema } from "mongoose";

const DestinationSchema = new Schema({
  destino: {
    type: String,
    required: true,
    unique: true,
  },
  image: {
    type: String,
    required: true,
  },
  latitude: {
    type: Number,
    required: true,
  },
  longitud: {
    type: Number,
    required: true,
  },
  cateogry: {
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

const Destination = model("Destination", DestinationSchema, "destinos");

export default Destination;
