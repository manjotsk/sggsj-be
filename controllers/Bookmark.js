const bookmarkmodel = require("../models/bookmarkmodel");
const { Objectid } = require("mongoose").Types;

const CreateBookmark = async (req, res) => {
  try {
    const { title, arth } = req.body;
    const Bookdata = await bookmarkmodel.create({ title, arth });

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
          createAt: -1,
        },
      },
    ]);
    res
      .status(200)
      .json({ message: "all Bookmarks fetched successfully ", data: Bookdata });
  } catch (err) {
    console.log(err);
  }
};
const Delete = async (req, res) => {
  try {
    const Del = await bookmarkmodel.deleteOne(Objectid);
    res.status(200).json({ message: " Bookmark deleted sucessfully" });
  } catch (err) {
    console.log(err);
  }
};
module.exports = { CreateBookmark, GetBookmark, Delete };
