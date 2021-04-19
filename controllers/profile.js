const handleProfileGet = (req, res, db) => {
  const { id } = req.params;
  db.select("*")
    .from("users")
    .where({
      id,
    })
    .then(user => {
      if (user.length) {
        res.json(user[0]);
      } else {
        throw err;
      }
    })
    .catch(err => res.status(404).json("not found"));
};

module.exports = { handleProfileGet };
