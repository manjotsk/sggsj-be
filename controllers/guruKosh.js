import Kosh from '../models/kosh.js';

async function searchKosh(queries) {
  try {
    const results = await Kosh.find({
      $or: [
        { word: { $in: queries } }, // Case-insensitive word search
        { 'otherFaces.word': { $in: queries } }, // Case-insensitive otherFaces search
      ],
    });

    return results;
  } catch (error) {
    throw error;
  }
}

async function searchKoshController (req, res) {
  console.log("jdfdwefe");
  const queries = ['ਉਸ','ਧੁਰਾਹੂ']; // Get the queries parameter as an array from the request
  try {
    const results = await searchKosh(queries);
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while searching.' });
  }
}



export  {
  searchKoshController
};

