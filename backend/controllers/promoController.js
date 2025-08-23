const Promo = require('../models/Promo');
const generateRandomCode = require('../middleware/generate-code');

exports.GetAllCodes = async (_, res) => {
    try {
        const codes = await Promo.find();
        res.status(200).json(codes);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching codes', error });
    }
}

    exports.GetByPromo = async (req, res) => {
        const { promo } = req.params;  
        try {
            const code = await Promo.findOne({promo});
            if (!code) {
                return res.status(404).json({ message: 'Code not found' });
            }
            res.status(200).json(code);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching code', error });
        }
    }

exports.CreateCodes = async (req, res) => {
  const { value } = req.params;

  if (!value || isNaN(value)) {
    return res.status(400).json({ message: 'Valid value is required' });
  }

  const codesToGenerate = parseInt(value);
  const generatedCodes = new Set();
  const savedCodes = [];

  try {
    while (generatedCodes.size < codesToGenerate) {

      const code = generateRandomCode();
      if (!generatedCodes.has(code)) {
        const exists = await Promo.findOne({ promo: code });
        if (!exists) {
          generatedCodes.add(code);
          const newCode = new Promo({ promo: code });
          await newCode.save();
          savedCodes.push(newCode);
        }
      }
    }

    res.status(201).json(savedCodes);
  } catch (error) {
    console.error('Error generating codes:', error);
    res.status(500).json({ message: 'Error generating codes', error });
  }
};

exports.ClearCodes = async (_, res) => {
  try {
    await Promo.deleteMany({});
    console.log('All codes cleared successfully');
    res.status(200).json({ message: 'All codes cleared successfully' });
  } catch (error) {
    console.error('Error clearing codes:', error);
    res.status(500).json({ message: 'Error clearing codes', error });
  }
}
