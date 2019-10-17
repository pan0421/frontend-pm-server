const jwt = require('jsonwebtoken')

const token = jwt.sign({ id: '123' }, 'secret', { expiresIn: '10 s' })

const decoded = jwt.decode(token, 'secret')
console.log('-----', decoded)