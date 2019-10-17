
module.exports = function (router) {
  router.get('/test_get', (req, res) => {
    const {name, pwd} = req.query
    setTimeout(() => {
      if (!name || !pwd) {
        res.send({
          code: 1, 
          msg: 'No user found'
        })
      } else {
        res.send({
          code: 0,
          data: { id: 2, name, pwd }
        })
      }
    }, 3000);
  })

  router.post('/test_post', (req, res) => {
    const {name, pwd} = req.body
    setTimeout(() => {
      if (!name || !pwd) {
        res.send({
          code: 1, 
          msg: 'incomplete user information'
        })
      } else {
        res.send({
          code: 0,
          data: { id: 4, name, pwd }
        })
      }
    }, 3000);
  })
}