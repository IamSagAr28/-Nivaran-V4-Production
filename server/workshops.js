const express = require('express');
const router = express.Router();
const { registerForWorkshop } = require('./shopify');

// POST /api/workshops/register
router.post('/register', async (req, res) => {
    try {
        const { name, email, phone, organization, date, participants, message } = req.body;

        if (!email || !name || !phone) {
            return res.status(400).json({ error: 'Name, Email, and Phone are required.' });
        }

        const result = await registerForWorkshop({
            name,
            email,
            phone,
            organization,
            date,
            participants,
            message
        });

        res.status(200).json(result);
    } catch (error) {
        console.error('Workshop Registration Error:', error);
        res.status(500).json({ error: 'Failed to register workshop.' });
    }
});

module.exports = router;
