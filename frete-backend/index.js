const express = require("express");
const axios = require("axios");
const cors = require("cors");
const qs = require("qs");

const app = express();
app.use(cors());
app.use(express.json());

const MELHOR_ENVIO_TOKEN =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiMzJjZDMyYmQ3NTNkYjhmZDMxYWUyZDEzMTQzNGI1NjJlNTZkYmU1NmIzOWMxYmM3YTBkZTFkOGU2NjA1ZjdjNDg4ZmZmMDg0Y2I5NWFkMzMiLCJpYXQiOjE3NDQwNjg3MjIuMDUwODQxLCJuYmYiOjE3NDQwNjg3MjIuMDUwODQzLCJleHAiOjE3NzU2MDQ3MjIuMDM2MTY4LCJzdWIiOiI5ZTlmMzM2Mi1mOGY1LTQ3OWEtYTRjYy05MjhkYjc5Y2FmY2YiLCJzY29wZXMiOlsiY2FydC1yZWFkIiwiY2FydC13cml0ZSIsImNvbXBhbmllcy1yZWFkIiwiY29tcGFuaWVzLXdyaXRlIiwiY291cG9ucy1yZWFkIiwiY291cG9ucy13cml0ZSIsIm5vdGlmaWNhdGlvbnMtcmVhZCIsIm9yZGVycy1yZWFkIiwicHJvZHVjdHMtcmVhZCIsInByb2R1Y3RzLWRlc3Ryb3kiLCJwcm9kdWN0cy13cml0ZSIsInB1cmNoYXNlcy1yZWFkIiwic2hpcHBpbmctY2FsY3VsYXRlIiwic2hpcHBpbmctY2FuY2VsIiwic2hpcHBpbmctY2hlY2tvdXQiLCJzaGlwcGluZy1jb21wYW5pZXMiLCJzaGlwcGluZy1nZW5lcmF0ZSIsInNoaXBwaW5nLXByZXZpZXciLCJzaGlwcGluZy1wcmludCIsInNoaXBwaW5nLXNoYXJlIiwic2hpcHBpbmctdHJhY2tpbmciLCJlY29tbWVyY2Utc2hpcHBpbmciLCJ0cmFuc2FjdGlvbnMtcmVhZCIsInVzZXJzLXJlYWQiLCJ1c2Vycy13cml0ZSIsIndlYmhvb2tzLXJlYWQiLCJ3ZWJob29rcy13cml0ZSIsIndlYmhvb2tzLWRlbGV0ZSIsInRkZWFsZXItd2ViaG9vayJdfQ.ucbpNrbJVzuOnwbxYsgicjHMfHR9fJjZIgwwqBpQog2q_KHQp6dsEDRI7RhZwPhZ9BMCxx2H8eqGU9hPUtRkW0rpDiAJdSD4TcoRy93hlhccy_2sHSdZsRCJpxRPeS4zdk8f141sIxg2aoMj06JqY4pqP5u4f9E6mCznbw9-8ShVyxidotadN2Q7RxdDxW_P7Z4kuuhLlkk8CcDFwSry3f_jE082g2vpq19os8lXgSfQFGzpyC2zTeFRlhPxByD2Ch8IDjlrKabI4ekc53CDGhqZbifvLJvd9Zzwa1nuufEkdZA9LC0KnBsmpIKoJGjs7XbpjK32d9ytgv0TSiaFLO-IDxRdNjSiThuw2Z2-hI0l-tiYhv06EVFt8bPa_JTm6Yp8A9V7MGs12k3LxQWp-pa6TBRctwf2ALcgv_ZjL8FNYk-hqyh0VNMYO2b_2CHxrbGc_nX8zXDGfE2k6FNyxQkzj200UOgCluQaCnBqZU0b9gZt2Dwtffage3rRnWhgc4PGXm1cFzIWNleN2IePQbRY6-LhKrpdM1CS1buQ9Z5q9CQDKiM_bUnrW9hsFoBMTDfL-XuLRlGu2JG7xK_hqC0MC5RMpcR7g8IfrCBY4oP9_jdJ2CuMFIeAaDih3RuSX7WBEFknY3t_l9MXOAa_Z0eiw7pE9bNnvSlDXrxknlo"; // insira o token novo aqui

app.post("/frete", async (req, res) => {
    const { cepDestino } = req.body;

    const payload = {
        from: { postal_code: "04571-150" },
        to: { postal_code: cepDestino },
        products: [
            {
                id: "1",
                width: 20,
                height: 5,
                length: 25,
                weight: 0.8,
                quantity: 1,
            },
        ],
        options: {
            insurance_value: 0,
            receipt: false,
            own_hand: false,
        },
        services: [],
    };

    try {
        const queryString = qs.stringify(payload, { encode: false });

        const response = await axios.get(
            `https://www.melhorenvio.com.br/api/v2/shipment/calculate?${queryString}`,
            {
                headers: {
                    Authorization: `Bearer ${MELHOR_ENVIO_TOKEN}`,
                    Accept: "application/json",
                },
            }
        );

        res.json(response.data);
    } catch (error) {
        console.error(
            "Erro ao calcular frete:",
            error.response?.data || error.message
        );
        res.status(500).json({
            error: "Erro ao calcular frete",
            detalhes: error.response?.data || error.message,
        });
    }
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`🔥 Servidor rodando em http://localhost:${PORT}`);
});
