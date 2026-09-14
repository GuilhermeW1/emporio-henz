1. Problema

A Empório Henz, realiza a venda de luminárias, materiais de construção e móveis, sendo o último o seu carro-chefe de vendas, a Empório Henz é responsável pela venda, montagem e transporte dos móveis até o consumidor final. Atualmente a sua vitrine se estende apenas a loja física, a empresa possui presença em redes sociais porém ainda carente. As vendas a distância são realizadas diretamente pelo whatsapp. O cliente não tem como visualizar o acervo ou variações de móveis de forma autônoma, o que engessa o atendimento, limita o alcance da marca e impacta o volume de vendas.

2. Solução  
   

A criação de um catálogo de vendas online. O cliente não precisa necessariamente ir até a loja física para escolher os móveis que deseja, pelo catálogo de vendas ele pode dar uma olhada nos móveis ofertados. Assim, com uma “vitrine virtual”, o cliente consegue visualizar quais são as variações possíveis que pode escolher com o móvel e com isso gerar um pedido automático que é enviado pelo whatsapp para a loja, onde a partir desse primeiro contato é realizado as demais etapas do atendimento e da venda.

 

3. Escopo  
   

| Catálogo de produtos e filtros | Cria a "vitrine virtual", com sistema de busca e filtro/categorias |
| :---- | :---- |
| Sistema de carrinho | Permite a seleção de itens para gerar pedido |
| Geração de pedido via whatsapp | Resolve o problema de comunicação oficial |
| Login e autenticação segura (admin/cliente) | Protege a área administrativa e cria perfil de cliente |
| CRUD de itens e categorias (perfil admin) | Permite a loja a manter o catálogo autorizado |
| Seções “Destaques” e “Visto recentemente” | Requer tráfego prévio para gerar histórico |

   

4. Requisitos funcionais  
     
   

| RF01 | O sistema permite acesso com e-mail e senha, separando os perfis de Usuário (Cliente) e Administrador  |
| :---- | :---- |
| RF02  | O sistema permite que um usuário adicione, edite e remova itens de um carrinho  |
| RF03  | O sistema gera uma mensagem automática com os itens do carrinho e redireciona para o WhatsApp da loja |
| RF04 | O sistema permite ao Administrador cadastrar móveis, variações, cômodo, material e faixa de preço  |
| RF05 | O sistema permite pesquisar itens pelo nome e aplicar filtros cumulativos  |
| RF06 | O sistema incrementa um contador a cada visita no item e exibe os maiores contadores como "Destaques"  |
| RF07 | O sistema armazena e exibe ao usuário os últimos 4 itens vistos recentemente  |
| RF08 | O sistema exibe os tipos de pagamentos aceitos e o valor final no carrinho |

   

   

5. Requisitos não funcionais  
     
   

| ID | Requisito | Como se verifica |
| :---- | :---- | :---- |
| RNF01 | O sistema limita o upload a 5 imagens por item cadastrado | Tentativa de upload de 6 imagens no painel |
| RNF02 | O sistema armazena as senhas utilizando hash | Inspeção da tabela no banco de dados |
| RNF03 | O sistema utiliza cookies para gerenciar sessão de autenticação | Verificação de document.cookie e DevTools do navegador |
| RNF04 | O cadastro e edição de itens carregam em até 3 segundos | Medição na aba Network do navegador |
| RNF05 | O timeout de validação de usuários não deve ultrapassar 1 segundo | Medição na aba Network durante requisições protegidas |
| RNF06 | O sistema bloqueia a rota de login temporariamente após múltiplas falhas (Rate Limit) | Realizar 6 tentativas erradas em 1 minuto e checar erro 429 |

   

6. Histórias de usuário  
1) Como cliente, quero navegar pelo catálogo, pesquisar por nome e aplicar filtros (por cômodo, material e preço), para encontrar o móvel/luminária ideal para minha casa.  
2) Como cliente, quero adicionar produtos ao meu carrinho, como também editar a quantidade do produto ou até mesmo retirar do meu carrinho.  
3) Como cliente, quero gerar o pedido via WhatsApp, para que a loja receba minha lista de interesse formatada e saiba exatamente o que quero comprar  
4) Como cliente, quero poder editar meus dados de contato para manter eles atualizados  
5) Como usuário (cliente ou administrador), quero me autenticar com e-mail e senha de forma segura, para acessar as áreas e permissões do meu perfil.  
6) Como administrador, quero poder cadastrar móveis com suas principais características e até 5 imagens, para que o catálogo seja sempre atrativo  
7) Como administrador, quero poder editar características do móveis como preços e variações caso tenha novas variações disponíveis, além de poder deletar um móvel caso não ofertamos mais aquele produto

   

7. Casos de Uso  
     
   Atores:  
   

| Ator | Quem é |
| :---- | :---- |
| Cliente | Navega pelo catálogo, pesquisa pelos produtos que procura, manipula o seu carrinho e envia o pedido |
| Administrador | Responsável no gerenciamento do catálogo, quem cadastra, edita e deleta os produtos da loja, podendo também alterar o preço |

   

 


| Caso de uso | Vem da história | Realiza |
| :---- | :---- | :---- |
| UC01 \- Cadastrar-se e autenticar-se no sistema | 5 | RF01, RNF02, RNF03, RNF06 |
| UC02 \- Gerenciar perfil do cliente | 4 | RF01 |
| UC03 \- Pesquisar e filtrar por produtos | 1 | RF05, RF06, RF07 |
| UC04 \- Gerenciar carrinho de orçamento | 2 | RF02, RF03, RF08 |
| UC05 \- Gerar pedido via whatsapp | 3 | RF03 |
| UC06 \- Cadastrar e editar produto | 6, 7 | RF01, RF04, RNF01, RNF04 |
| UC07 \- Remover produto | 7 | RF01, RF04 |

UC01 \- Autenticar no sistema (Login)

| Campo | Conteúdo |
| :---- | :---- |
| Ator | Administrador ou Cliente cadastrado |
| Pré-condição | O usuário não deve possuir um cookie de sessão ativo no navegador |
| Disparo | O usuário insere suas credenciais na tela de login e clica em “Entrar” |
| Requisitos ligados | RF01, RNF02, RNF03, RNF06 |

**Fluxo principal:**

1. O usuário preenche e-mail e senha e submete o formulário de login.  
2. O servidor intercepta a requisição e valida as credenciais contra a tabela do banco via **better-auth**, comparando o hash *scrypt* da senha.  
3. O servidor gera a sessão e retorna o token gravado em um cookie **HttpOnly** com flag **Secure** (em produção).  
4. O tempo de resposta do servidor na validação ocorre em até 1 segundo (RNF05).  
5. O frontend lê a resposta do estado da sessão e redireciona o Administrador para o painel de gestão ou o Cliente para sua área de perfil.

**Fluxos alternativos:**

* **A1, credenciais incorretas:** Se o e-mail ou a senha estiverem errados, o sistema retorna erro HTTP 401 com a mensagem "Invalid email or password", sem confirmar qual campo falhou (evitando mapeamento de e-mails de usuários por terceiros).  
* **A2, estouro do limite de tentativas (Rate Limit):** Caso ocorram mais de 5 tentativas malsucedidas no intervalo de 1 minuto a partir da mesma origem, o backend bloqueia o endpoint retornando HTTP 429 por 60 segundos (RNF06).

**Pós-condição:** Um cookie de sessão criptografado (`better-auth.session_token`) é armazenado no navegador, liberando as rotas protegidas pelo middleware **`exigirLogin`** no servidor

**Fluxos alternativos:**

* **A1, credenciais incorretas:** Se o e-mail ou a senha estivem errados, o sistema retorna erro HTTP 401 com a mensagem "Invalid email or password", sem confirmar qual campo falhou (evitando mapeamento de e-mails de usuários por terceiros).  
* **A2, estouro do limite de tentativas (Rate Limit):** Caso ocorram mais de 5 tentativas malsucedidas no intervalo de 1 minuto a partir da mesma origem, o backend bloqueia o endpoint retornando HTTP 429 por 60 segundos.

**Pós-condição:** Um cookie de sessão criptografado (**`better-auth.session_token`**) é armazenado no navegador, liberando as rotas protegidas pelo middleware **`exigirLogin`** no servidor.

UC05 \- Gerar pedido via WhatsApp

| Campo | Conteúdo |
| :---- | :---- |
| Ator | Cliente (Visitante ou Cadastrado) |
| Pré-condição | O carrinho de orçamentos deve possuir pelo menos 1 produto adicionado.  |
| Disparo | O cliente clica no botão "Enviar pedido via WhatsApp" dentro da tela do carrinho.  |
| Requisitos ligados | RF05, RF06  |

**Fluxo principal:**

1. O cliente acessa a tela do carrinho, visualiza os itens selecionados, quantidades e as formas de pagamento aceitas pela loja.  
2. O cliente clica no botão "Enviar pedido via WhatsApp".  
3. O sistema captura os dados do carrinho e formata uma mensagem de texto.  
4. O sistema redireciona o cliente pelo link do WhatsApp, acionando o aplicativo móvel ou o WhatsApp Web no dispositivo do cliente.  
5. O cliente confirma a mensagem na interface do seu próprio aplicativo do WhatsApp e realiza o envio. 

**Fluxos alternativos:**

* **A1, carrinho vazio:** Se o cliente tentar acionar o botão sem nenhum produto no carrinho, o sistema bloqueia o redirecionamento e exibe a mensagem: *"Seu carrinho está vazio. Adicione pelo menos um item para enviar o orçamento."*

**Pós-condição:** O cliente é redirecionado para o aplicativo do WhatsApp com as informações do orçamento prontas para envio à Empório Henz.

UC06 \- Cadastrar e editar produto

| Campo | Conteúdo |
| :---- | :---- |
| Ator | Administrador |
| Pré-condição | Administrador autenticado com cookie de sessão ativo contendo a regra (role) "Admin". |
| Disparo | O administrador clica em "Novo Produto" ou "Editar" no painel de controle.  |
| Requisitos ligados | RF03, RF04, RNF01, RNF04  |

**Fluxo principal:**

1. O administrador preenche nome, descrição, categoria, preço, tipo de material, cômodo e variações do móvel.  
2. O administrador seleciona até 5 imagens do produto no seu computador.  
3. O administrador clica em "Salvar Produto".  
4. O servidor valida se a requisição possui a sessão de Administrador através da função **exigirLogin**.  
5. O sistema salva os dados e arquivos no servidor em até 3 segundos e atualiza o painel (RNF04).

**Fluxos alternativos:**

* **A1, excesso de imagens ou tamanho invalido:** Se o administrador enviar mais de 5 arquivos de imagem ou um arquivo maior que 5 MB, o sistema recusa o cadastro e exibe a mensagem: *"Máximo de 5 imagens por item (limite de 5 MB por arquivo)"*.  
* **A2, sessão expirada:** Se o cookie de sessão expirar durante o preenchimento, a API devolve código HTTP 401 e o frontend redireciona o usuário para a tela de login.

**Pós-condição:** O produto é gravado ou atualizado no banco de dados e fica imediatamente visível para busca e navegação na vitrine virtual.

8. Decisões de implementação  
     
* A autenticação é implementada utilizando a biblioteca **`better-auth`**, evitando a criação manual de mecanismos de hash e cookies.   
* A proteção das rotas administrativas no backend ocorre por meio da função **`exigirLogin`**, que avalia o cookie diretamente no servidor antes de autorizar alterações no catálogo.   
* A comunicação entre o frontend e backend exige o envio explícito dos cabeçalhos **`credentials: "include"`** (no *fetch*) e **`credentials: true`** (no CORS do Express) para garantir o transporte do cookie **`HttpOnly`.** 

9. Decisões de teste  
     
* Proteção de estado: Verificar se requisições para criar produtos retornam erro HTTP 401 caso realizadas sem um cookie de sessão válido.   
* Bloqueio de Brute-force: Realizar 6 tentativas de login e garantir que o *Rate Limit* retorna erro 429\.   
* Isolamento do navegador: Executar **`document.cookie`** no console do navegador e confirmar que a sessão não está visível para scripts. 

10. Fora de Escopo  
      
* Integração de gateways de pagamento online  
* Uso de APIs pagas (Whatsapp)  
* Cálculo automático de frete via integrações de transportadoras

11. Glossário  
    

| CookieHttpOnly | Dado de sessão salvo no navegador, impossível de ser lido via JavaScript (proteção contra XSS)  |
| :---- | :---- |
| Hash scrypt | Algoritmo criptográfico utilizado para mascarar irreversivelmente a senha do usuário no banco  |
| Rate Limit | Limite de requisições imposto pelo servidor para barrar robôs testando senhas (ex: max 5/min)  |

    