const express = require("express");
const mysql = require("mysql");
const cors = require('cors');

const bcrypt = require('bcrypt');
const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"cms"

})

app.post('/check-email', (req, res) => {
  const { email } = req.body;

  // Check if the email already exists in the database
  const checkEmailQuery = "SELECT * FROM login WHERE email = ?";
  db.query(checkEmailQuery, [email], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ exists: false, error: "Database error" });
    }

    if (result.length > 0) {
      // Email already exists
      return res.json({ exists: true });
    } else {
      // Email does not exist
      return res.json({ exists: false });
    }
  });
});
app.post('/signup', (req, res) => {
  const { name, email, password, phone, gender } = req.body;

  // Hash the password
  const saltRounds = 10; // Adjust the number of salt rounds as needed
  bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
    if (err) {
      console.error(err);
      return res.status(500).json("Error"); // Send an error response
    }

    const sql = "INSERT INTO login (name, email, password, phone, gender) VALUES (?, ?, ?, ?, ?)";
    const values = [
      name,
      email,
      hashedPassword, // Use the hashed password
      phone,
      gender
    ];

    db.query(sql, values, (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).json("Error"); // Send an error response
      }
      return res.json(data);
    });
  });
})



  app.get('/getUserName', (req, res) => {
    const { email } = req.query;
  
    // Query the database to fetch the user's name based on their email
    const query = `SELECT name FROM login WHERE email = ?`;
    db.query(query, [email], (err, results) => {
        console.log(email);
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while fetching the user name.' });
      } else {
        if (results.length > 0) {
          res.json({ name: results[0].name });
          console.log({ name: results[0].name })
        } else {
          res.status(404).json({ error: 'User not found.' });
        }
      }
    });
  });


  app.get('/getUserCount', (req, res) => {
    const sql = 'SELECT COUNT(*) AS totalUserCount FROM login';
  
    db.query(sql, (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'An error occurred while fetching user count.' });
      } else {
        const totalUserCount = data[0].totalUserCount;
  
        res.json({ totalUserCount });
      }
    });
  });

  
  app.get('/getUserGenderCount', (req, res) => {
    const sql = `
      SELECT
        gender,
        COUNT(*) AS count
      FROM
        login
      GROUP BY
        gender;
    `;
  
    db.query(sql, (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'An error occurred while fetching user gender count.' });
      } else {
        // The 'data' variable will contain the count of male and female users.
        // You can format the response as needed.
        const genderCounts = {};
        data.forEach((row) => {
          genderCounts[row.gender] = row.count;
        });
  
        res.json(genderCounts);
      }
    });
  });
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  // SQL query to fetch the user's hashed password based on their email
  const query = "SELECT email, password FROM login WHERE email = ?";
  
  db.query(query, [email], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json("Error");
    }

    if (results.length === 0) {
      return res.json("Failed"); // User not found
    }

    const hashedPassword = results[0].password;

    // Compare the provided password with the hashed password
    bcrypt.compare(password, hashedPassword, (compareError, isMatch) => {
      if (compareError) {
        console.error(compareError);
        return res.status(500).json("Error");
      }

      if (isMatch) {
        return res.json("Success"); // Passwords match, send a success response
      } else {
        return res.json("Failed"); // Passwords do not match, send a failure response
      }
    });
  });
});


// app.get('/Productindex', (req, res) => {
//     const sql = "Select * from products";

//     db.query(sql, (err, data) => {
//         if (err) {
//             console.error(err);
//             return res.status(500).json("Error"); // Handle the error appropriately
//         }

        
//         return res.json(data);
//     });
// });
app.get('/Productindex', (req, res) => {
    const sql = "SELECT * FROM products";

    db.query(sql, (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json("Error"); // Handle the error appropriately
        }
        console.log(data)
        // Convert image Buffers to base64 strings for PNG images
        const dataWithBase64Images = data.map((item) => ({
            ...item,
            image: `data:image/png;base64,${item.image}`, // Assuming 'image' is the property containing the Buffer
        }));
        //console.log(dataWithBase64Images)
        return res.json(dataWithBase64Images);
    });
});

app.get('/Usertable', (req, res) => {
    const sql = "SELECT * FROM login";

    db.query(sql, (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "An error occurred" }); // Handle the error appropriately
        }
        console.log(data);
        res.json(data);
    });
});

app.post('/Addproduct', (req, res) => {
    const sql = "INSERT INTO products (name, collection, description,image) VALUES (?, ?, ?, ?)";
console.log(req)
    const values = [
        req.body.name,
        req.body.collection,
        req.body.description,
        req.body.image
        // Buffer.from(req.body.image1, 'base64')
    ];

    db.query(sql, values, (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json("Error"); // Send an error response
        }
        return res.json(data);
    });
});

app.put('/EditProduct/:id', (req, res) => {
    const sql = "UPDATE products set name =?, collection =?, description =? ,image =? WHERE id =?";
    const values = [
        req.body.name,
        req.body.collection,
        req.body.description,
        req.body.image,
    ];
const id = req.params.id;
    db.query(sql, [...values , id ], (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json("Error"); // Send an error response
        }
        return res.json(data);
    });
});

app.delete('/Productindex/:id', (req, res) => {s
    const productId = req.params.id;
    const sql = "DELETE FROM products WHERE id = ?";

    db.query(sql, [productId], (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json("Error"); // Send an error response
        }
        return res.json(data);
    });
});
app.listen(8082, ()=>{
    console.log("listening");
})