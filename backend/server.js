const fs = require("fs");
const bodyParser = require("body-parser");
const jsonServer = require("json-server");
const jwt = require("jsonwebtoken");
var { nanoid } = require("nanoid");
const bcrypt = require("bcrypt");

const server = jsonServer.create();
// const database = JSON.parse(fs.readFileSync("./dataBase/db.json", "utf-8"));
// const router = jsonServer.router("./dataBase/db.json");
const database = JSON.parse(
  fs.readFileSync("./../backend/dataBase/db.json", "utf-8")
);
const router = jsonServer.router("./../backend/dataBase/db.json");
const middlewares = jsonServer.defaults();
// Add default middleware(logger, static, cors и no-cache)
server.use(middlewares);
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(jsonServer.defaults());

const SECRET_KEY = "72676376";

const expiresIn = "1h";

function createToken(payload) {
  return jwt.sign(payload, SECRET_KEY, { expiresIn });
}

function findUserByAuthData({ email, password }) {
  
  return database.users.find(
    (user) => user.email === email && user.password === password
  );
}

function findUserByEmail({ email }) {  
  return database.users.find(
    (user) => user.email === email 
  );
}

function isLoginAuthenticated({ email, password }) {
  return (
    database.users.findIndex(
      (user) => user.email === email && user.password === password
    ) !== -1
  );
}

function isRegisterAuthenticated({ email }) {
  return database.users.findIndex((user) => user.email === email) !== -1;
}

server.post("/api/auth/register", async (req, res) => {
  console.log("_____________________________________");
  console.log("Hello from registerAPI: BODY: ", req.body);

  const { username, name, email, password, registrationDate } = req.body;
  
  if (isRegisterAuthenticated({ email })) {
    const status = 400;
    //const message = "Email already exist: ";
    const message = `User with email ${email} already exists `;
    res.status(status).json({ status, message });
    return;
  }
  const userId = nanoid();
  console.log(`Hello from registerAPI: nanoid = ${userId}`);

  console.log("Hello from registerAPI: fs.readFile() started");
  // fs.readFile("./dataBase/db.json", (err, data) => {
  fs.readFile("./../backend/dataBase/db.json", async (err, data) => {
    if (err) {
      const status = 400;
      const message = err;
      res.status(status).json({ status, message });
      return;
    }
    data = JSON.parse(data.toString());
    console.log(`Hello from registerAPI: fs.readFile() ended`);

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);
    console.log("bcrypt: ", passwordHash);
    data.users.push({
      id: userId,
      registrationDate: registrationDate,
      name: name,
      username: username,
      email: email,
      password: passwordHash,
    });
    console.log(`Hello from registerAPI: user ${email} pushed`);
    // let writeData = fs.writeFile(
    //   "./dataBase/db.json",
    let writeData = fs.writeFile(
      "./../backend/dataBase/db.json",
      JSON.stringify(data, null, "\t"),
      (err, result) => {
        if (err) {
          const status = 400;
          const message = err;
          res.status(status).json({ status, message });
          return;
        }
      }
    );
    console.log(`Hello from registerAPI: writeData ended`);
  });
  const access_token = createToken({ userId });
  res.status(200).json({ authUserId: userId, access_token });
  // res.status(200).json({ passwordHash: passwordHash });
});


server.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;

  const userData = findUserByEmail({ email });
  //if (!isLoginAuthenticated({ email, password })) {
    if (!userData) {
    const status = 400;
    const message = "Incorrect Email or Password";
    res.status(status).json({ status, message });
    return;
  }

  const validPassword = await bcrypt.compare(password, userData.password); 
  console.log("password: ", password);
  console.log("userData.password: ", userData.password);
  if (!validPassword) {
    const status = 400;
    const message = "Incorrect Email or Password";
    res.status(status).json({ status, message });
    return;
  }

  const access_token = createToken({ userId: userData.id });  
  res.status(200).json({ authUserId: userData.id, access_token });
});

server.use(router);
server.listen(3001, () => {
  console.log("Running fake api json server");
});
