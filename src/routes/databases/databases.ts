import server from '../../server';

server.post('/databases/insert', (req, res) => {
    res.send('Teste');
});

server.get('/databases/all', (req, res) => {
    res.send('test');
});