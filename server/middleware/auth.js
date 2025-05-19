import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    try {
        let token = req.header('Authorization');
        if (!token) {
            return res.status(403).json({ message: 'Access denied. No token provided.' });
        }
        if ( token.startsWith('Bearer ') ) {
            token = token.slice(7, token.length).trimLeft();
        }
        req.user = jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch (err) {
        res.status(401).json({ error: err.message });
    }
}
