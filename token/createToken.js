var jwt = require('jsonwebtoken')

module.exports = function (id) {
	const token = jwt.sign({ id }, 'secret', { expiresIn: '7 days' })
	return token;
}
