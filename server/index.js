const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  "048b84a669a8215ec00ceb242da21e4851ab728ba315705a2bcf97bf772228d2e400f99bad63e5d0981590e8ce2d5068de6e838ec411fa2ab9ace2895249e2ce1e": 100,
  "04ddefb40dc7234c2dfa5cae4f2a0ddb556cb816da4094df4ee84769bc3aa9667555a28a82688554d3301811c053d707b008b64dad7c9b6a7fead4073d089eb462": 50,
  "049f06b051f19e4d40a1d0f42d4fe5cfa507dc1c81fb8f222e64ff1c6417cf98c93aa52311844b77e3f452dfc7e514be08009a7bc5bc863279754fb14d3676ab7c": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { sender, recipient, amount } = req.body;

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
