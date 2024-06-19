import Lines from '../models/lines.js';

const Gurbani = async (req, res) => {
  try {
    const pageNo = req.params.id || 1;
    const lines = await Lines.find({ pageNo }).sort({ pageNo: 1, verseId: 1 });
    res.send({ lines, pageNo });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'An error occurred while fetching the lines' });
  }
};

export default Gurbani
