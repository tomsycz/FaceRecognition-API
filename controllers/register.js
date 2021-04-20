const handleRegister = (req, res, db, bcrypt) => {
  const { email, name, password } = req.body;
  if (!email || !name || !password) {
    return res.status(400).json("incorect form submition");
  }
  bcrypt.hash(password, 10, (err, hash) => {
    db.transaction(trx => {
      trx
        .insert({ hash, email })
        .into("login")
        .returning("email")
        .then(loginEmail => {
          return db("users")
            .returning("*")
            .insert({
              email: loginEmail[0],
              name: name,
              joined: new Date(),
            })
            .then(user => {
              res.json(user[0]);
            });
        })
        .then(trx.commit)
        .catch(trx.rollback);
    }).catch(err => res.status(400).json("unable to register"));
  });
};

module.exports = {
  handleRegister,
};
