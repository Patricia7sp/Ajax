const bodyParser = require('body-parser')
const express = require('express')
const app = express();

app.use(express.static('.'))// pegando o conteudo estatico , para qualquer requisao
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

const multer = require('multer')

const storage = multer.diskStorage ({
  destination: function(req, file, callback){
    callback(null, './upload')// salvando na pasta atual
  },
  //parametro
  filename:function (req, file, callback){
    callback(null, `${Date.now()}_${file.originalname}`)
  }
   
})

// subir arquivo

const upload = multer({storage}).single('arquivo') 

app.post('/upload', (req, res) => {
  upload(req, res, err =>{
     if(err) {
     return res.end('Ocorreu um erro')
    }

    res.end('Concluido com Sucesso.')
  })
})

app.post('/formulario', (req, res) => {
  res.send({
    ...req.body,
    id: 7
  })
})

// vai atender par ou impar / vai responder  
  app.get('/parOuImpar', (req, res) => {
    const par = parseInt(req.query.numero) % 2 === 0
    res.send({
      resultado: par ? 'par' : 'impar'
    })
  })

app.listen(8080, () =>console.log('Executando...'));