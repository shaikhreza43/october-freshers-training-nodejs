const router = require("express").Router();
const User = require("./models/user.models");

//CRUD operation on User
router.post("/create-user", async (req, res) => {
  const requestBody = req.body;
  if (!requestBody.username || !requestBody.password || !requestBody.email) {
    res.status(500).json({ error: "Request Body is invalid" });
  }
  try {
    const newUser = {
      userId: Math.ceil(Math.random() * 1000),
      username: requestBody.username,
      password: requestBody.password,
      email: requestBody.email,
    };
    const userModel = await new User(newUser);
    userModel
      .save()
      .then((resp) => {
        console.log("User Created", resp);
        res
          .status(201)
          .json({ message: "User Created Successfully", response: resp });
      })
      .catch((err) => {
        console.log("User Creation Failed", err);
        res
          .status(201)
          .json({ message: "User Creation Failed", response: err });
      });
  } catch (err) {
    console.log("Error While Creating User", err);
  }
});

router.put("/update-user/:userId", async (req, res) => {
  const requestBody = req.body;
  const userId = req.params.userId;
  if (!userId) {
    res.status(500).json({ error: "User Id is missing" });
  } 
  if (
    !requestBody.username ||
    !requestBody.password ||
    !requestBody.email
  ) {
    res.status(500).json({ error: "Request Body is Invalid" });
  }
  const userObject = await User.findOne({ userId });
  if (!userObject) {
    res.status(500).json({ error: "User Id is not found in db" });
  }
  userObject.username = requestBody.username;
  userObject.email = requestBody.email;
  userObject.password = requestBody.password;

  try {
    const updateResponse = await userObject.save();
    res
      .status(200)
      .json({ message: "User Update is successful", response: updateResponse });
  } catch (error) {
    console.log("User Updation Failed", error);
    res.status(500).json({ message: "User Updation Failed", error });
  }
});

router.delete("/delete-user/:userId", (req, res) => {});

router.get("/get-user/:userId", (req, res) => {
  const userId = req.params;
  res.json({ message: userId });
});

module.exports = router;
