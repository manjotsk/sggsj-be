const bookmarkmodel = require("../models/bookmarkmodel");

const CreateBookmark = async (req, res) => {
  try {
    const { title, engAkhar, arth, lineno, ang, hindi, english } = req.body;
    if (!title || !arth || !ang || !lineno) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const Bookdata = await bookmarkmodel.create({
      title,
      engAkhar,
      arth,
      userId: req.token.id,
      ang,
      lineno,
      hindi,
      english,
    });
    res
      .status(201)
      .send({ message: "bookMark create successfully", data: Bookdata });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Bad Request" });
  }
};

const GetBookmark = async (req, res, next) => {
  const userId = req.token.id;
  let userBookmark;
  try {
    userBookmark = await bookmarkmodel.find({ userId });
  } catch (error) {
    console.log(error);
  }
  if (!userBookmark) {
    res.status(404).json({ message: "No Bookmark Found" });
  } else {
    res
      .status(200)
      .json({ message: "bookmark is fetch Successfully", data: userBookmark });
  }
};
const Delete = async (req, res) => {
  try {
    const bookmarkId = req.params.id;
    const Del = await bookmarkmodel.deleteOne({ _id: bookmarkId });

    if (Del.deletedCount === 0) {
      res.status(404).json({ message: "Bookmark not found" });
    } else {
      res.status(200).json({ message: "Bookmark deleted successfully" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "An error occurred" });
  }
};

module.exports = { CreateBookmark, GetBookmark, Delete };
