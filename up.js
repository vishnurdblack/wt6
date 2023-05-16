

const http = require('http');
const qs = require('querystring');
const path=require("path");
const collection=require("./mongodb")
const server = http.createServer((req, res) => {
  if (req.method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end',async () => {
      const formData = qs.parse(body);
            const email=formData.Email;
            const pwd=formData.Password;
            const Name=formData.Name;
            const phone=formData.phoneno;
      collection.findOneAndUpdate({email:email},{$set:{Name:Name,phone:phone}} )
        .then((user) => {
        if (!user) {
          throw err;
        } else {
          console.log("Updated")
        }
      })
      res.end("User signed in successfully");
    //   .catch((error) => {
    //     console.log('Error finding user:', error);
    //     res.end("invalid username password");
    //   });


  
    });
  }
   else {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(`
      not correct
    `);
  }
});

server.listen(5004, () => {
  console.log('Server running on port 3010');
});
