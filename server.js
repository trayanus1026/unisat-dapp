const express = require('express');
const cors = require("cors");
const app = express();
const axios = require("axios");

app.use(express.json());
app.use(cors({ origin: true }));
app.use(express.urlencoded({ extended: false }));

const psbtPass = {
    psbtHex: "70736274ff01000a0000000000000000000000",
    autoFinalized: false,
    toSignInputs: [
        {
            index: 0,
            address: "tb1q8h8....mjxzny"
        },
        {
            index: 1,
            publicKey: "tb1q8h8....mjxzny",
            sighashTypes: [1]
        },
        {
            index: 2,
            publicKey: "02062...8779693f"
        }
    ]
};

// async function fetchUTXOs(userAddress) {
//     try {
//         const response = await axios.get(`https://unisat.io/wallet-api-v4/address/btc-utxo?address=${userAddress}`);
//         console.log(response.data);
//         return response.data.utxos;
//     } catch (error) {
//         console.error('Error fetching UTXOs:', error);
//         throw error;
//     }
// }

app.post('/api/fetch', (req, res) => {
//    fetchUTXOs(req.body.address);
    // console.log(req.body.address);
    res.send(psbtPass);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});