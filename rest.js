// Feito em grupo Giovana, Wesley, Vitor Castro

// Questão 1
app.post('/users/create', (req, res) => {
    const newUser = { id: users.length + 1, ...req.body };
    users.push(newUser);
    res.status(201).json(newUser);
});
      
 app.get('/users/getAll', (req, res) => {
     res.status(200).json(users);
 });

// a) Qual é o problema com o uso das rotas acima?
/* O problema é que as rotas não seguem o padrão REST, faz com que as operações 
fiquem mais padronizadas e previsíveis.*/

// b) Explique como o código pode ser ajustado para se adequar ao Nível 2.
/* O código pode ser ajustado para se adequar ao nível 2, padronizando as rotas.*/

// c) Corrija o código.
app.post('/users', (req, res) => {
    const newUser = { id: users.length + 1, ...req.body };
    users.push(newUser);
    res.status(201).json(newUser);
});
      
app.get('/users', (req, res) => {
    res.status(200).json(users);
});

// Questão 2
// app.delete('/users/:id', (req, res) => {
//     const id = parseInt(req.params.id);
//     const userIndex = users.findIndex(user => user.id === id);
//     if (userIndex !== -1) {
//         users.splice(userIndex, 1);
//         res.json({ message: 'Usuário excluído' });
//     } else {
//         res.json({ message: 'Usuário não encontrado' });
//     }
// });

// a) Identifique o problema com os códigos de status HTTP usados no código.
/* O erro do codigo era a falta do status na resposta para o usuario, onde nesse caso 
especifica se da certo ou errado.*/

// b) Corrija o código, adicionando os status HTTP adequados para uma resposta RESTful.
app.delete('/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const userIndex = users.findIndex(user => user.id === id);
    if (userIndex !== -1) {
        users.splice(userIndex, 1);
        res.status(200).json({ message: 'Usuário excluído' });
    } else {
        res.status(404).json({ message: 'Usuário não encontrado' });
    }
});

// Questão 3
// app.put('/users/:id', (req, res) => {
//     const id = parseInt(req.params.id);
//     const user = users.find(user => user.id === id);
//     if (user) {
//         user.name = req.body.name;
//         res.status(200).json(user);
//     } else {
//         res.status(404).json({ message: 'Usuário não encontrado' });
//     }
// });
   
// a) Explique a diferença entre os métodos PUT e PATCH em uma API REST.
/* O metodo PUT é utilizado para atualizar um recurso inteiro, enquanto o PATCH é 
utilizado para atualizar um recurso parcialmente.*/

// b) Corrija o código acima, implementando uma rota PATCH para permitir atualizações parciais.
app.patch('/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const user = users.find(user => user.id === id);
    if (user) {
        user.name = req.body.name;
        res.status(200).json(user);
    } else {
        res.status(404).json({ message: 'Usuário não encontrado' });
    }
});

// Questão 4
// app.get('/users/:id', (req, res) => {
//     const id = parseInt(req.params.id);
//     const user = users.find(user => user.id === id);
//     if (user) {
//         res.status(200).json(user);
//     } else {
//         res.status(404).json({ message: 'Usuário não encontrado' });
//     }
// });
   
// a) Explique o que é HATEOAS e por que ele é importante no modelo REST.
/* HATEOAS é um acrônimo para Hypermedia As The Engine Of Application State, que é uma
restrição de arquitetura que diz que a API deve retornar links para que o cliente possa 
navegar pela API. Isso é importante para que o cliente não precise conhecer a API de 
antemão, apenas seguir os links que a API retorna.*/

// b) Altere o código para incluir links HATEOAS na resposta da API.
function addLinks(user) {
    return {
        self: { href: `/users/${user.id}` },
        delete: { href: `/users/${user.id}`, method: 'DELETE' },
        update: { href: `/users/${user.id}`, method: 'PUT' },
        partialUpdate: { href: `/users/${user.id}`, method: 'PATCH' }
    };
}

app.get('/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const user = users.find(user => user.id === id);
    if (user) {
        res.status(200).json({
            ...user,
            links: addLinks(user),
        });
    } else {
        res.status(404).json({ message: 'Usuário não encontrado' });
    }
});

// Questão 5
// app.get('/users/:id', (req, res) => {
//     const id = req.params.id;
//     const user = users.find(user => user.id === id);
//     if (user) {
//         res.status(200).json(user);
//     } else {
//         res.status(404).json({ message: 'Usuário não encontrado' });
//     }
// });

// a) Qual é o problema relacionado à validação nesse código?
// Teve que converter o id para inteiro para fazer a comparação.

// b) Corrija o código para incluir a validação adequada.
app.get('/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const user = users.find(user => user.id === id);
    if (user) {
        res.status(200).json(user);
    } else {
        res.status(404).json({ message: 'Usuário não encontrado' });
    }
});

// Questão 6
// app.post('/users', (req, res) => {
//     const newUser = { id: users.length + 1, ...req.body };
//     users.push(newUser);
//     res.status(201).json(newUser);
// });

// a) Qual é o problema de segurança com a falta de validação no corpo da requisição?
// Ele não valida se o campo name está presente.

// b) Corrija o código para validar se o campo name está presente e atende a requisitos básicos, como ser uma string com pelo menos 3 caracteres.
app.post('/users', (req, res) => {
    const name = parseInt(req.params.id);
    if (!name || name.length < 3) {
        res.status(400).json({ message: 'O campo name é obrigatório e deve ter pelo menos 3 caracteres' });
        return;
    } else {
        const newUser = { id: users.length + 1, ...req.body };
        users.push(newUser);
        res.status(201).json(newUser);
    }
});