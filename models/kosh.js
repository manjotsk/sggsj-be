import mongoose from "mongoose";
const koshSchema = new mongoose.Schema({
  word: String,
  meaning: String,
  examples: [{
    line: String,
    ref: String
  }],
  otherFaces: [{
    word: String
  }]
});
const Kosh = mongoose.model('kosh', koshSchema);
export default Kosh;