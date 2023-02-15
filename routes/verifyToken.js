import jwt from 'jsonwebtoken'


export const verifyToken = (req, res, next) => {

    const authHeaders = req.headers.token;
    if (authHeaders) {

        const token = authHeaders.split(' ')[1]
        jwt.verify(token, process.env.JWT_MSG, (err, user) => {
            if (err) res.status(403).json('token is not valid')
            req.user = user;
            next()
        })

    } else {
        return res.status(401).json('you are not authorized || authenticated')
    }

}


export const verifyTokenAndAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next()
        } else {
            res.status(403).json('you are not allowed to do')
        }
    })
}

export const verifyTokenAndAdmin=(req,res,next)=>{
    verifyToken(req, res, () => {
        if ( req.user.isAdmin) {
            next()
        } else {
            res.status(403).json('you are not a Admin')
        }
    })
}