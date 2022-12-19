const express = require("express");
const https = require("https");
const port  = 6700;


const app = express();
app.use(express.static("public"))

app.get("/", (req,res) => {
    // res.sendFile( __dirname + "/index.html")
})

app.post("/", (req,res) => {
    const url = "https://official-joke-api.appspot.com/random_joke"
    https.get(url, (response) => {
        console.log(response.statusCode);

        response.on("data", (data) => {
            const joke = JSON.parse(data);
            const jokeQuestion = joke.setup;
            const jokeAnswer = joke.punchline;
            // console.log(jokeQuestion)
            // res.send(`Joke-Question:${jokeQuestion}. Joke-Anser: ${jokeAnswer}`)
            res.send(`
            <!DOCTYPE html>
            <html lang="en">
            <head> <title>Jokes API</title></head>
            <style>
            body {
                margin: 0;
                /* color: black; */
                font-family: Lato-light;
            }
            
            .txt-center {
                text-align: center;
            }
            
            .txt-red {
                color: #FF1E1E;
            }
            
            .first {
                background-color: #497174;
                width: 65%;
                margin: auto;
                padding: 30px 0;
                border: solid 20px #D6E4E5;
            }
            
            .second {
                background-color: #D6E4E5;
                width: 85%;
                margin: 5px auto;
                padding: 15px 0;
            }
            
            .third {
                width: 80%;
                margin: 10px auto;
                border: 2px solid black;
                padding: 10px;
                font-size: 25px;
            }
            
            .btn {
                background-color: #497174;
                width: 80px;
                height: 40px;
                border: 0;
                outline: 0;
                color: white;
                cursor: pointer;
            }
            </style>
            <body>
                <header><h1 class="txt-center txt-red">Jokes</h1></header>
                <main>
                    <div class="first">
                        <div class="second">
                            <h2 class="txt-center txt-red">
                                Here's your joke!!!
                                <div class="third">
                                   Joke Question: ${jokeQuestion} <br>
                                   Joke Answer: ${jokeAnswer}.
                                </div>
                            </h2>
                        </div>
                    </div>
                </main>
            </body>
            </html>
            `)
            // res.send(data);
        })
    })
})

app.listen(port, () => {
    console.log(`Server is up and running on port ${port}`);
})