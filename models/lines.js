import mongoose from "mongoose";
const linesSchema = new mongoose.Schema({
  verseId: Number,
  verse: String,
  translationSahibSingh: String,
  pageNo: Number,
  lineNo: Number,
});
const Lines = mongoose.model('lines', linesSchema);
export default Lines;