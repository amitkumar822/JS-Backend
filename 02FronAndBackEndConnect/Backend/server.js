import express from 'express';

const app = express();

const PORT = process.env.PORT || 3000;

app.get('/', (req,res) =>{
    res.send('Server is Ready')
})


//get a list of 5 jokes

app.get('/api/jokes', (req,res) => {
    const jokes = [
        {
            id: 1,
            title:'A Joke',
            content: "I am a cat"
        },
        {
            id: 2,
            title:'Another Joke',
            content: "I am a dog"
        },
        {
            id: 3,
            title:'Third Joke',
            content: "I am a Badge"
        },
        {
            id: 4,
            title:'Fourth Joke',
            content: "I am a Rat"
        },
        {
            id: 5,
            title:'Fifth Joke',
            content: "I am Fifth Joke"
        }
    ]

    res.send(jokes)
})



app.listen(PORT, () => {
    console.log(`Server at http://localhost:${PORT}`)
})