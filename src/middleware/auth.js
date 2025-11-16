const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

const authenticate = (req, res, next) => {
    try {
        // ⛔ استثناء كل GET requests
         if (req.method === "GET") {
            return next();
        }

        // ✅ 2) استثناء مسارات الـ Login و Register
        if (
            req.path === "/auth/login" ||
            req.path === "/auth/register"
        ) {
            return next();
        }

        const authHeader = req.headers.authorization;

        const token = authHeader.slice(7); // remove 'Bearer '

        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;

        next();

    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token expired' });
        }
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: 'Invalid token' });
        }
        return res.status(401).json({ message: 'Authorization failed' });
    }
};


const isAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        return next();
    }
    return res.status(403).json({ message: 'Access denied. Admin only.' });
};

module.exports = { authenticate, isAdmin, JWT_SECRET };
