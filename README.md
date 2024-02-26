<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Lista de dispositivos</title>
</head>
<body>
  <h1>Aplicação de controle de dispositivos</h1>
  
  <h2>Introdução</h2>
  <p>Esta é uma aplicação full stack desenvolvida com Node.js, TypeScript, Express no backend e TypeScript, React e Vite no frontend. MongoDB como banco princial.</p>
  
  <h2>Como Usar</h2>
  
  <h3>1. Iniciar a Aplicação</h3>
  <p>Para iniciar a aplicação, siga estas etapas:</p>
  <pre><code>docker-compose up</code></pre>
  <p>A aplicação backend estará disponível em <a href="http://localhost:3001">http://localhost:3001</a> e a aplicação frontend em <a href="http://localhost:5173">http://localhost:5173</a>.</p>
  
  <h3>2. Executar Testes Unitários no Backend</h3>
  <p>Para executar os testes unitários no backend, siga estas etapas:</p>
  <pre><code>docker ps</code></pre>
  <p>Encontre o ID do contêiner do backend na lista de contêineres em execução.</p>
  <pre><code>docker exec -it &lt;ID_DO_CONTAINER&gt; npm run test</code></pre>
  
  <h2>Exemplos de Uso</h2>
  
  <h3>Rotas Backend</h3>
  <p>Aqui estão alguns exemplos de uso das rotas do backend:</p>
  
  <h4>Atualizar IOT</h4>
  <p><strong>Endpoint:</strong> <code>PATCH /api/v1/iot/:imei</code></p>
  <p><strong>Exemplo de uso:</strong></p>
  <pre><code>curl -X PATCH -H "Content-Type: application/json" -d '{"tag":"poweron", "value":100}' http://localhost:3001/api/v1/iot/123456789</code></pre>
  
  <h4>Criar IOT</h4>
  <p><strong>Endpoint:</strong> <code>POST /api/v1/iot</code></p>
  <p><strong>Exemplo de uso:</strong></p>
  <pre><code>curl -X POST -H "Content-Type: application/json" -d '{"tag":"poweroff", "imei":"987654321", "value":200}' http://localhost:3001/api/v1/iot</code></pre>
  
  <h4>Listar IOTs</h4>
  <p><strong>Endpoint:</strong> <code>GET /api/v1/iot</code></p>
  <p><strong>Exemplo de uso:</strong></p>
  <pre><code>curl http://localhost:3001/api/v1/iot?status=on-and-offs&amp;imei=</code></pre>
    <h4>Status aceitos</h4>
  <li>
    <ul>has-reports</ul>
    <ul>has-no-reports</ul>
    <ul>on-and-offs</ul>
    <ul>errors</ul>
  </li>

  <h4>Criação de IOT</h4>
  <h4>Exemplo</h4>
  <pre><code>
{
    tag: poweron
    imei: string
    value: 1
}
  </code></pre>


<h4>Tags aceitas</h4>
  <ul>
    <li>poweron</li>
    <li>poweroff</li>
    <li>timebased</li>
    <li>errorCode</li>
  </ul>

  <h4>Listar erros individualmente</h4>
  <p>Essa rota cataloga todos os erros cadastrados no backend para que sejam renderizados em uma tabela no front-end e caso queiramos podemos ampliar a aplicação para que possa ser possível cadastrar soluções para que tenhamos um feedback para cada usuário</p>

  <pre><code>
    GET http://localhost:3001/api/v1/iot/errors
  </code></pre>
</body>
</html>
