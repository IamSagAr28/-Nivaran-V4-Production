const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const authRoutes = require('./auth');
const webhookRoutes = require('./webhooks');
const adminRoutes = require('./admin');
const newsletterRoutes = require('./newsletter');
const membershipRoutes = require('./membership');
const workshopRoutes = require('./workshops');
const sessionMiddleware = require('./session');

// ... existing code ...

app.use('/api/admin', adminRoutes);
app.use('/api/newsletter', newsletterRoutes);
app.use('/api/membership', membershipRoutes);
app.use('/api/workshops', workshopRoutes);

// Health Check
app.get('/', (req, res) => {
  res.send('Nivaran Auth Server is running.');
});

// Start Server only if run directly
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`👉 Client URL: ${process.env.FRONTEND_URL || 'http://localhost:3000'}`);
  });
}

module.exports = app;
