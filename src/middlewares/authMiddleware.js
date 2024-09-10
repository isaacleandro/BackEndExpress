
const AUTHORIZATION_UUID = 'sombra'

const authMiddleware = ((req, res, next) => {
    if (req.headers.authorization !== AUTHORIZATION_UUID) {
        return res.status(401).json({ message: 'Unauthorized' })
    }

    next()
})

export default authMiddleware;

