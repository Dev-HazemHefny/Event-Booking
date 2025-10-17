// export const auth = (req, res, next) => {
//   const authHeader = req.headers.authorization;
// //   const queryToken = req.query.token; 
  
// //   console.log("Auth Header:", authHeader);
// //   console.log("Query Token:", queryToken); 
  
//   const tokenSource = authHeader // Use either
  
//   if (!tokenSource) {
//     req.user = null;
//     return next();
//   }

//   const token = tokenSource.startsWith("Bearer ")
//     ? tokenSource.split(" ")[1]
//     : tokenSource;

//   console.log("Token:", token);

//   try {
//     const decoded = jwt.verify(token, "mearn");
//     console.log("Decoded:", decoded);
//     req.user = decoded;
//   } catch (err) {
//     console.log("JWT Error:", err.message);
//     req.user = null;
//   }

//   next();
// };