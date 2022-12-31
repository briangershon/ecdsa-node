import server from "./server";
import { getPublicKey } from "ethereum-cryptography/secp256k1";
import { toHex } from "ethereum-cryptography/utils";

function Wallet({
  privateKey,
  setPrivateKey,
  address,
  setAddress,
  balance,
  setBalance,
}) {
  async function onChange(evt) {
    const privateKey = evt.target.value;
    setPrivateKey(privateKey);
    const address = toHex(getPublicKey(privateKey));
    setAddress(address.slice(-20));
    if (address) {
      const {
        data: { balance },
      } = await server.get(`balance/${address}`);
      setBalance(balance);
    } else {
      setBalance(0);
    }
  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        Private Key
        <input
          placeholder="Type your private key, for example 04ddef... (no leading 0x)"
          value={privateKey}
          onChange={onChange}
        ></input>
      </label>

      <div>Address: {address}</div>

      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;
