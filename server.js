const app = require("./app"); 

const port = process.env.PORT; 
app.listen(port, () => {
    console.log(`Application Started on port ${port}.` ); 
}); 