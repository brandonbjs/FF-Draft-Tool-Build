import express from 'express'
import cors from 'cors'

const app = express()
app.use(express.json())
app.use(cors())

const FF_CALCULATOR_URL =
    'https://fantasyfootballcalculator.com/api/v1/adp/ppr?teams=10&year=2026'

app.get('/fetchPlayers', async (req, res) => {
    try {
        const response = await fetch(FF_CALCULATOR_URL)
        const data = await response.json()
        res.json(data.players)
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch player data' })
    }
})

const PORT = process.env.PORT || 1234
app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
