const express = require('express')
const cors = require('cors')
const fs = require('fs');
const app = express()
//fs 모듈 - readFileSync(): 읽기,WriteFileSync():쓰기

const bodyParser = require('body-parser');
const axios = require('axios');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json()) // 파서 등록! 

app.get('api',(req,res)=>{
  res.header("Access-Control-Allow-Origin","https://opendict.korean.go.kr/")
  res.send(data)
})


app.get('/openapi', async function (req, res) { 
  // const {url} = req.query;
  
  const a = await axios.get('https://opendict.korean.go.kr/api/search?key=4E4101E1F9C6B578FCE4D6CABE483676&target_type=search&req_type=json&part=word&q=구두')
  console.log(a)
  res.send(a.data)
})

app.get('/', function (req, res) { 
    const jD = fs.readFileSync('./gameData.json') 
    res.send( JSON.parse(jD) )
  })

app.post('/insert', function (req, res) {
    const jD = JSON.parse(fs.readFileSync('./gameData.json'))  //파서로 읽어올 수 있도록
    fs.writeFileSync('./gameData.json', JSON.stringify([...jD,req.body])); //기존 게임데이터와 신규 게임데이터를 쌓아주기 
    res.send("저장");
})



app.listen(3030)