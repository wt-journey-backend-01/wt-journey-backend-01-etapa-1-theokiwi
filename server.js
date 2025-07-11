const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const fs = require('fs');

app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));    

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/sugestao', (req,res) =>{
    fs.readFile('./views/sugestao.html', 'utf8', (err, data) =>{
        if(err){
            return res.status(500).send('Erro ao ler o arquivo');
        }
         let html = data
            .replace('{{nome}}', req.query.nome)
            .replace('{{ingredientes}}', req.query.ingredientes);
        res.send(html);
    })

});

app.get('/contato', (req, res) =>{
    res.sendFile(path.join(__dirname, 'views', 'contato.html'));
});

app.post('/contato', (req, res) => {
    fs.readFile('./views/respContato.html', 'utf8', (err, data) => {
        if(err){
            return res.status(500).send('Erro ao ler o arquivo');
        }
        let html = data
            .replace('{{nome}}', req.body.nome)
            .replace('{{email}}', req.body.email)
            .replace('{{assunto}}', req.body.assunto)
            .replace('{{mensagem}}', req.body.mensagem)
        res.send(html);
    })
});

app.get('/api/lanches', (req, res) => {
  const lanches = [
    {
      id: 1,
      nome: "DevBurger Clássico",
      ingredientes: "Pão brioche, Carne 150g, Queijo cheddar, Alface americana, Tomate fresco, Molho especial"
    },
    {
      id: 2,
      nome: "Burger de Bacon",
      ingredientes: "Pão australiano, Carne 180g, Queijo prato, Bacon crocante, Cebola caramelizada, Molho barbecue"
    },
    {
      id: 3,
      nome: "Commit Veggie",
      ingredientes: "Pão integral, Burger de grão de bico, Queijo vegano, Rúcula, Tomate seco, Maionese de ervas"
    }
  ];

  res.status(200).json(lanches);
});


app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
})