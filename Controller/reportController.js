const Report = require('../Models/reportModel');

// Add user
exports.submit_report = async (req, res) => {
    try {
        const report = new Report(req.body);
        await report.save();
        res.status(201).json({ message: 'Report submitted successfully!' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};