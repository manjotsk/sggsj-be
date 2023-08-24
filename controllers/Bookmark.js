const bookmarkmodel = require("../models/bookmarkmodel");

const CreateBookmark = async (req, res) => {
  try {
    const { title, arth } = req.body;
    const Bookdata = await bookmarkmodel.create({ title, arth, ang },  { new: true });

    res
      .status(201)
      .send({ message: "bookMark create successfully", data: Bookdata });
  } catch (err) {
    console.log(err);
  }
};
const GetBookmark = async (req, res) => {
  try {
    const { query } = req;
    const { keyword } = req.query;

    const searchCeriteria = {};

    if (req.query.keyword) {
      searchCeriteria["$or"] = [
        { title: { $regex: `^${keyword.trim()}`, $options: "i" } },
        { arh: { $regex: `${keyword.trim()}`, $options: "i" } },
      ];
    }

    const Bookdata = await bookmarkmodel.aggregate([
      { $match: searchCeriteria },
      {
        $sort: {
          createAt: 1,
        },
      },
    ],  { new: true });
    res
      .status(200)
      .json({ message: "all Bookmarks fetched successfully ", data: Bookdata });
  } catch (err) {
    console.log(err);
  }
};
const Delete = async (req, res) => {
  try {
    const bookmarkId = req.params.id; // Assuming you're passing the bookmark ID in the URL parameter
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
