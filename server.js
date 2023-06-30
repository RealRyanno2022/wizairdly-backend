const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.post('/message', async (req, res) => {
    const userMessage = req.body.message;
    try {
        const response = await axios.post(
            'https://api.openai.com/v1/engines/davinci-codex/completions',
            {
                prompt: userMessage,
                max_tokens: 100
            },
            { headers: { 'Authorization': 'Bearer YOUR_OPENAI_KEY' }}
        );

        const aiMessage = response.data.choices[0].text.trim();
        res.json({ message: aiMessage });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error in OpenAI request' });
    }
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
