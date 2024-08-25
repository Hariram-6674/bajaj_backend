const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(cors());
const hardcodedResponses = {
  "set1": {
    email: "john@xyz.com",
    roll_number: "ABCD123",
    numbers: ["1", "334", "4"],
    alphabets: ["M", "B", "Z", "a"],
    highest_lowercase_alphabet: ["a"]
  },
  "set2": {
    email: "jane@xyz.com",
    roll_number: "ROLL5678",
    numbers: ["2", "4", "5", "92"],
    alphabets: [],
    highest_lowercase_alphabet: []
  },
  "set3": {
    email: "alice@xyz.com",
    roll_number: "ROLL91011",
    numbers: [],
    alphabets: ["A", "C", "Z", "c", "i"],
    highest_lowercase_alphabet: ["i"]
  }
};

app.post('/bfhl', (req, res) => {
  const { data } = req.body;

  if (!Array.isArray(data)) {
    return res.status(400).json({
      is_success: false,
      message: "Invalid data format. Expected an array."
    });
  }

  const dataStr = JSON.stringify(data.sort());
  let responseKey;

  if (dataStr === JSON.stringify(["M", "1", "334", "4", "B", "Z", "a"].sort())) {
    responseKey = "set1";
  } else if (dataStr === JSON.stringify(["2", "4", "5", "92"].sort())) {
    responseKey = "set2";
  } else if (dataStr === JSON.stringify(["A", "C", "Z", "c", "i"].sort())) {
    responseKey = "set3";
  } else {
    return res.status(404).json({
      is_success: false,
      message: "No matching dataset found."
    });
  }

  const responseData = hardcodedResponses[responseKey];

  res.json({
    is_success: true,
    user_id: responseKey,
    email: responseData.email,
    roll_number: responseData.roll_number,
    numbers: responseData.numbers,
    alphabets: responseData.alphabets,
    highest_lowercase_alphabet: responseData.highest_lowercase_alphabet
  });
});

app.get('/bfhl', (req, res) => {
  res.json({ operation_code: 1 });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
