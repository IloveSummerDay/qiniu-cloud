const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')

const app = express();

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// app.use('/', )




app.listen(12306, () => {
    console.log(`Server is running on port ${12306}`);
});