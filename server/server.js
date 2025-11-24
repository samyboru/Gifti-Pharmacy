// File Location: server/server.js

const express = require('express');
const cors = require('cors');
const path = require('path');
const helmet = require('helmet');
const cookieParser = require('cookie-parser'); // <-- IMPORTED

require('dotenv').config();

const app = express();

app.use(helmet());

// --- START: CRITICAL SECURITY FIX for cookies ---
// This configuration is essential for allowing the frontend and backend to exchange cookies.
const corsOptions = {
    // This MUST exactly match the URL of your Vite development server. No trailing slash.
    origin: 'http://localhost:5173', 
    // This allows the browser to send the secure httpOnly cookie with requests.
    credentials: true, 
};
app.use(cors(corsOptions)); // <-- APPLIED CORS options
// --- END: CRITICAL SECURITY FIX ---

app.use(express.json());
app.use(cookieParser()); // <-- APPLIED: This middleware must be used to parse cookies

app.use(express.static(path.join(__dirname, 'public')));

// Import Routes
const authRoutes = require('./routes/auth');
const usersRoutes = require('./routes/users');
const productsRoutes = require('./routes/products');
const suppliersRoutes = require('./routes/suppliers');
const salesRoutes = require('./routes/sales');
const purchaseOrdersRoutes = require('./routes/purchaseOrders');
const dashboardRoutes = require('./routes/dashboard');
const activityLogRoutes = require('./routes/activityLog');
const inventoryRoutes = require('./routes/inventory');
const doctorsRoutes = require('./routes/doctors');
const prescriptionsRoutes = require('./routes/prescriptions');
const notificationsRoutes = require('./routes/notifications');
const notificationService = require('./services/notificationService');
const reportsRoutes = require('./routes/reports');
notificationService.generateAlerts();

// 2. Schedule to run every hour (3600000 ms)
// This keeps the system updated without manual intervention
setInterval(() => {
    notificationService.generateAlerts();
}, 3600000);

// Define API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/suppliers', suppliersRoutes);
app.use('/api/sales', salesRoutes);
app.use('/api/purchase-orders', purchaseOrdersRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/activity-log', activityLogRoutes);
app.use('/api/inventory', inventoryRoutes);
app.use('/api/doctors', doctorsRoutes);
app.use('/api/prescriptions', prescriptionsRoutes);
app.use('/api/notifications', notificationsRoutes);
app.use('/api/reports', reportsRoutes);

// Define Port & Start Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Backend server started on port ${PORT}`));