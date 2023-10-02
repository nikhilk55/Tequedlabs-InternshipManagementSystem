import express from 'express'
import mysql from 'mysql'
import cors from 'cors'
import cookieParser from 'cookie-parser'



const app = express();
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.static('public'));



const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password:"",
    database:"signup"
})

con.connect(function(err) {
    if(err){
        console.log("Error");
    }
    else{
        console.log("Connected");
    }
})

app.get("/getStudents",(req,res)=>{
    const sql = "SELECT * FROM students";
    con.query(sql,(err,result)=>{
        if(err) return res.json({Error:"Get Students error"});
        return res.json({ Status:"Success", Result: result});
    })

})

app.get("/get/:id", (req,res)=>{
    const id = req.params.id;
    const sql = "SELECT * FROM students WHERE id=?";
    con.query(sql, [id], (err, result)=>{
        if(err) return res.json({Error: "Get students error in SQL"});
        return res.json({Status: "Success", Result: result})
    })
})

app.delete('/delete/:id', (req,res) => {
    const id = req.params.id;
    const sql = "DELETE FROM students WHERE id=?";
    con.query(sql,[id], (err,result) => {
        if(err) return res.json({Error: "Delete students error in SQL"});
        return res.json({Status: "Success", Result: result})    
    })
})

app.get('/studentCount', (req,res) => {
    const sql = "SELECT COUNT(id) AS students FROM students";
    con.query(sql, (err,result) => {
        if(err) return res.json({Error: "Error in running SQL"});
        return res.json(result[0]);  
    })
})

app.get('/studentsWithFinishedProjects', (req, res) => {
    const sql = "SELECT COUNT(id) AS students FROM students WHERE project = '1'";
    con.query(sql, (err, result) => {
        if (err) {
            console.error("Error in running SQL:", err);
            return res.status(500).json({ error: "Internal Server Error" });
        }
        return res.json(result[0]); // Return the count directly
    });
});


app.get('/certificatesIssued', (req, res) => {
    const sql = "SELECT COUNT(id) AS certificates FROM students WHERE certification = '1'";
    con.query(sql, (err, result) => {
        if (err) {
            console.error("Error in running SQL:", err);
            return res.status(500).json({ error: "Internal Server Error" });
        }
        return res.json(result[0]); // Return the count directly
    });
});




app.post('/login',(req,res)=>{
   const sql = "SELECT * FROM login where email=? AND password=?";
   con.query(sql,[req.body.email,req.body.password],(err,result)=>{
    if(err) return res.json({
        Status:"Error in Server",
        Error:"Wrong Email/password"
    });
    if(result.length>0){
        return res.json({Status:"Success"})
    }
    else{
        return res.json({
            Status:"Error in Server",
            Error:"Wrong Email/password"
        });
    }
   })
})

app.post('/NewAdmin', (req, res) => {
    const { email, password } = req.body;
    const sql = 'INSERT INTO login (email, password) VALUES (?, ?)';
    con.query(sql, [email, password], (err, result) => {
        if (err) {
            console.error('Error signing up admin:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        return res.json({ status: 'Admin signup successful' });
    });
});


app.post('/create', (req, res) => {
    const sql = "INSERT INTO students ( `name`, `email`, `whno`, `college`, `domain`) VALUES (?)";
    // console.log(req.body.name);
        const values = [
        req.body.name,
        req.body.email,
        req.body.whno,
        req.body.college,
        req.body.domain
    ]
    con.query(sql, [values], (err, result) => {
        if (err)  return res.json({ Error: "Inside signup query"+err });
        return res.json({ Status: "Success" });
              })
})

app.post('/updateProjectStatus/:id', (req, res) => {
    const studentId = req.params.id;
    const { project } = req.body;

    // Validate the 'project' value to ensure it's either 'Yes' or 'No'.
    if (project !== '1' && project !== '0') {
        return res.status(400).json({ error: 'Invalid project status value' });
    }

    // Update the project status in the database.
    const sql = 'UPDATE students SET project = ? WHERE id = ?';
    con.query(sql, [project, studentId], (err, result) => {
        if (err) {
            console.error('Error updating project status:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        // Check if any rows were affected. If none, the student with that ID might not exist.
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Student not found' });
        }
        return res.json({ status: 'Success' });
    });
});

// ... (previous code)

app.post('/updateProjectAndCertificationStatus/:id', (req, res) => {
    const studentId = req.params.id;
    const { project, certification } = req.body;

    // Validate the 'project' and 'certification' values to ensure they're either '1' or '0'.
    if ((project !== '1' && project !== '0') || (certification !== '1' && certification !== '0')) {
        return res.status(400).json({ error: 'Invalid status values' });
    }

    // Update the project and certification statuses in the database.
    const sql = 'UPDATE students SET project = ?, certification = ? WHERE id = ?';
    con.query(sql, [project, certification, studentId], (err, result) => {
        if (err) {
            console.error('Error updating project and certification status:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        // Check if any rows were affected. If none, the student with that ID might not exist.
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Student not found' });
        }
        return res.json({ status: 'Success' });
    });
});

// ... (remaining code)




app.listen(8081, () => {
    console.log('Running');
});