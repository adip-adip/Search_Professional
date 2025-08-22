import jwt from 'jsonwebtoken';
import UserModel from '../modules/user.module.js';

export async function authMiddleware(req, res, next) {
    try {
        const token = req.headers['authorization']?.split(' ')[1];

        if (!token) {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Token decoded:', decoded);
        
        // Use decoded.sub instead of decoded.id
        const user = await UserModel.findById(decoded.sub).select('-password');
        console.log('User found:', user ? user._id : 'None');
        
        if (!user) {
            console.log('User not found in database');
            return res.status(401).json({ message: 'User not found' });
        }
        
        req.user = user;
        console.log('User attached to request:', req.user._id);
        next();
    } catch (error) {
        console.error('Auth middleware error:', error);
        
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: 'Invalid token' });
        }
        
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token expired' });
        }
        
        return res.status(500).json({ message: 'Authentication error' });
    }
}