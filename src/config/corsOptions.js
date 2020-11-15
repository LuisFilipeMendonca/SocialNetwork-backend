const whitelist = ["http://localhost:3000"];

export default (req, cb) => {
  let corsOptions;

  if (whitelist.indexOf(req.header("Origin")) !== -1) {
    corsOptions = { origin: true };
  } else {
    corsOptions = { origin: false };
  }

  cb(null, corsOptions);
};
