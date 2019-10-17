var express = require("express");
var jwt = require("jsonwebtoken");
var router = express.Router();
const md5 = require("blueimp-md5");
const UserModel = require("../models/UserModel");
const _filter = {
  __v: 0
}; 

const createToken = require("../token/createToken");
const checkToken = require("../token/checkToken");
const userDatabase = require("../data/user.json");

const test = require("./test");
test(router);

router.post("/login_pwd", function (req, res) {
  setTimeout(function () {
    const username = req.body.username;
    const pwd = req.body.pwdHash;
    const index = userDatabase.findIndex(user=>user.username == username)
    if(index === -1){
      res.send({
        code: 1, msg: "Incorrect Username or Password"
      })
    }else if(userDatabase[index].pwd !== pwd){
      res.send({
        code: 1, msg: "Incorrect Username or Password"
      })
    }else{
      const user = userDatabase[index]
      res.send({
        code: 0, data: {...user, token: createToken(user.id)}
      })
    }
  }, 100);
});

router.post("/change_password", function (req, res) {
  setTimeout(function () {
    const username = req.body.username;
    const newPwd = req.body.pwdHash;
    const index = userDatabase.findIndex(user=>user.username == username)
    if(index === -1){
      res.send({
        code: 1, msg: "Username does not exist"
      })
    }else{
      const user = userDatabase[index]
      const newUser = {
        ...user, pwd: newPwd
      }
      userDatabase.splice(index, 1, newUser)
      const updatedUser = userDatabase[index]
      res.send({
        code: 0, data: {...updatedUser, token: createToken(updatedUser.id)}
      })
    }
  }, 100);
});

router.get("/auto_login", function (req, res) {
  setTimeout(function () {
    const token = req.headers["authorization"];
    if (!token) {
      return res.send({
        code: 1,
        msg: "Please login first"
      });
    }
    const decoded = jwt.decode(token, "secret");
    if (!decoded || decoded.exp < Date.now() / 1000) {
      res.status(401);
      return res.json({
        message: "token expired, please re-login"
      });
    }
    const userId = decoded.id;
    const index = userDatabase.findIndex(user=>user.id == userId)
    const user = userDatabase[index]
    res.send({
      code: 0, data: user
    })
  }, 100);
});

// if connecting to database
// router.post("/login_pwd", function (req, res) {
//   const username = req.body.username;
//   const pwd = req.body.pwdHash;
//   UserModel.findOne({
//       username
//     })
//     .then(user => {
//       if (user) {
//         if (user.pwd !== pwd) {
//           res.send({
//             code: 1,
//             msg: "Incorrect Username or Password"
//           });
//         } else {
//           res.send({
//             code: 0,
//             data: {
//               _id: user._id,
//               username: user.username,
//               pwd: user.pwd,
//               birthday: user.birthday,
//               age: user.age,
//               avatar: user.avatar,
//               token: createToken(user._id),
//               aboutme: user.aboutme,
//               education: user.education
//             }
//           });
//         }
//         return new Promise(() => {});
//       } else {
//         return UserModel.create({
//           username,
//           pwd
//         });
//       }
//     })
//     .then(user => {
//       const data = {
//         _id: user._id,
//         username: user.username,
//         pwd: user.pwd,
//         token: createToken(user._id),
//         birthday: user.birthday,
//         age: user.age,
//         aboutme: user.aboutme,
//         education: user.education
//       };
//       // new user
//       res.send({
//         code: 0,
//         data
//       });
//     })
//     .catch(error => {
//       console.error("/login_pwd", error);
//     });
// });

// router.post("/change_password", function (req, res) {
//   const username = req.body.username;
//   const pwd = req.body.password;
//   console.log(username, pwd);

//   UserModel.findOneAndUpdate({
//     username: username
//   }, {
//     pwd: pwd
//   }).then(user => {
//     if (user) {
//       res.send({
//         code: 0,
//         data: {
//           _id: user._id,
//           username: user.username,
//           pwd: pwd,
//           token: createToken(user._id),
//           birthday: user.birthday,
//           age: user.age,
//           aboutme: user.aboutme,
//           education: user.education
//         }
//       })
//     }
//   }).catch(error => {
//     console.log("Failed to update" + error)
//   })
// });

// router.get("/auto_login", function (req, res) {
//   const token = req.headers["authorization"];

//   if (!token) {
//     return res.send({
//       code: 1,
//       msg: "Please login"
//     });
//   }
//   const decoded = jwt.decode(token, "secret");
//   if (!decoded || decoded.exp < Date.now() / 1000) {
//     res.status(401);
//     return res.json({
//       message: "token expired, please re-login"
//     });
//   }

//   const userId = decoded.id;
//   UserModel.findOne({
//     _id: userId
//   }, _filter).then(user => {
//     res.send({
//       code: 0,
//       data: user
//     });
//   });
// });

router.get("/products", function (req, res) {
  setTimeout(function () {
    const data = require("../data/products.json");
    res.send({
      code: 0,
      data
    });
  }, 300);
});

module.exports = router;