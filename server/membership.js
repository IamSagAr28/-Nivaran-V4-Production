const express = require('express');
const router = express.Router();
const db = require('./database');

router.post('/', (req, res) => {
  const {
    planTitle,
    region,
    price,
    fullName,
    mobile,
    email,
    address,
    landmark,
    city,
    pincode
  } = req.body;

  if (!planTitle || !region || !price || !fullName || !mobile || !email || !address) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const sql = `
    INSERT INTO membership_submissions (
      plan_title,
      region,
      price,
      full_name,
      mobile,
      email,
      address,
      landmark,
      city,
      pincode
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const params = [
    planTitle,
    region,
    price,
    fullName,
    mobile,
    email,
    address,
    landmark,
    city,
    pincode
  ];

  db.run(sql, params, function(err) {
    if (err) {
      console.error('Error inserting membership submission:', err.message);
      return res.status(500).json({ message: 'Internal server error' });
    }
    res.status(201).json({ message: 'Submission saved', id: this.lastID });
  });
});

module.exports = router;
