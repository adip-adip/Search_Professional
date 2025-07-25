import jwt from 'jsonwebtoken';

export function authMiddleware(req, res, next) {
    const token = req.headers['authorization']?.split(' ')[1]; // Extract token from Authorization header

    if (!token) {
        return res.status(403).json({ message: 'Unauthorized' });
    }

    try {
        const data = jwt.verify(token, process.env.JWT_SECRET);
        req.user = data; // Attach user info to request object
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
}