const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {

	const token = req.headers['authorization']
	if (!token) {
		res.status(401)
		return res.json({ message: 'No token, please re-login' })
	}
	
	let decoded = jwt.decode(token, 'secret')

	if (!decoded || decoded.exp <= Date.now() / 1000) {
		res.status(401)
		return res.json({ message: 'token expired, please re-login' })
	}

	
	next();
}
