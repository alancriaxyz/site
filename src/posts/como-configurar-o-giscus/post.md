---
title: Configurando o sistema de comentários (Giscus)
description: Sistema de comentários para sites ou blog, baseado no GitHub. Sem banco de dados.
datePublished: '2024-03-05'
dateModified: '2024-03-05'
---

## Fala Cria, firmeza? 👊🏽

### Contexto

Imagina ter que desenvolver um sistema de comentários para o seu site/blog onde precise ter as seguintes **15** funcionalidades:

- 👉🏽 Autenticação de usuário.
- 👉🏽 Postagem, edição e exclusão de comentários.
- 👉🏽 Respostas em Threads de discussão.
- 👉🏽 Moderação de conteúdo.
- 👉🏽 Classificação e ordenação de comentários.
- 👉🏽 Notificações para autores e participantes.
- 👉🏽 Integração com redes sociais.
- 👉🏽 Personalização visual.
- 👉🏽 Proteção contra spam e ataques maliciosos.
- 👉🏽 Filtros para conteúdo abusivo.
- 👉🏽 Encriptação de dados sensíveis.
- 👉🏽 Sistema de reações com emojis para expressar sentimentos.
- 👉🏽 Suporte para formatação Markdown.
- 👉🏽 Opção de adicionar GIF.
- 👉🏽 Inclusão de imagens e vídeos.

Pesado em?

Claro que da para codar o sistema do zero, mas será que em alguns casos essa é a melhor direção? Como sênior, darei minha opinião. **Depende!**

## O que é Giscus?

[Em 2020 o GitHub adicionou o recurso Discussões](https://github.blog/2020-05-06-new-from-satellite-2020-github-codespaces-github-discussions-securing-code-in-private-repositories-and-more/) que fornece uma funcionalidade de interação com o público. Não surpreendentemente, foi rapidamente adotado pelo projeto chamado Giscus (❤️) para criar um novo mecanismo de comentários.

Giscus permite adicionar facilmente um sistema de comentários aos seus sites estáticos, usando o GitHub Issues como backend. Isso significa que você pode aproveitar toda a infraestrutura de gerenciamento de problemas do GitHub para gerenciar os comentários do seu blog.

Se liga nos benefícios:

- Código Aberto. 🌏
- Sem rastreamento, sem anúncios, sempre grátis. 📡 🚫
- Nenhum banco de dados necessário. Todos os dados são armazenados no GitHub Discussions.
- Suporta temas personalizados! 🌗
- Suporta diversos idiomas. 🌐
- Amplamente configurável
- Automaticamente procura novos comentários e edições do GitHub. 🔃

## Como eu configurei?

##### Criei um novo repositório no GitHub para armazenar os comentários.

<img src="https://imagedelivery.net/rERI1EAHgESvdqY7zivYhQ/705ba579-0202-41c2-91bc-628649a24100/compression=fast,w=780,fit=crop,format=webp" alt="Criei um novo repositório no GitHub para armazenar os comentários." width="100%">

_Aqui chamei de alancria.xyz-comments._

##### Habilitando a opção de discussões nas configurações do repositório.

<img src="https://imagedelivery.net/rERI1EAHgESvdqY7zivYhQ/1354cfba-4cc6-4c80-59bf-19cb171bbb00/compression=fast" alt="Habilitando a opção de discussões nas configurações do repositório.">

## Instalando o Giscus ao meu repositório.

1 - Acesse a página de instalação do Giscus.

[https://github.com/apps/giscus](https://github.com/apps/giscus)

<img src="https://imagedelivery.net/rERI1EAHgESvdqY7zivYhQ/ccd04dfa-ddf6-4b35-e705-8c443a206700/compression=fast,w=780,format=webp" alt="Clique no botão Install" width="100%">

**Clique no botão Install**

2 - Selecione o repositório onde você quer instalar o Giscus. No meu caso, eu selecionei o repositório que criei (alancria.xyz-comments)

3 - Autorize a instalação.

## Adicione o script do giscus no seu site/blog

Para adicionar o script do Giscus, o jeito mais de boa é dar uma passada no site deles: [https://giscus.app/pt](https://giscus.app/pt)

Lá você pode dar uma customizada nos comentários do jeito que preferir. No fim das contas, sairá um script tipo esse aqui:

```html
<script
  src="https://giscus.app/client.js"
  data-repo="alancriaxyz/alancria.xyz-comments"
  data-repo-id="<no_site_do_giscus_ele_gera_id_pra_vc>"
  data-category-id="<no_site_do_giscus_ele_gera_id_pra_vc>"
  data-mapping="pathname"
  data-strict="0"
  data-reactions-enabled="1"
  data-emit-metadata="0"
  data-input-position="top"
  data-theme="dark"
  data-lang="pt"
  data-loading="lazy"
  crossorigin="anonymous"
  async></script>
```

Agora basta você adicionar no seu código e pronto, seu sistema de comentários está pronto.

_Alan, mas não eram 8 linhas?_

No código do meu site ficou assim:

```html
<div class="container">
  <div class="row">
    <div class="col col-12">
      <script
        src="https://giscus.app/client.js"
        data-repo="alancriaxyz/alancria.xyz-comments"
        data-repo-id=""
        data-category-id=""
        data-mapping="pathname"
        data-strict="0"
        data-reactions-enabled="1"
        data-emit-metadata="0"
        data-input-position="top"
        data-theme="dark"
        data-lang="pt"
        data-loading="lazy"
        crossorigin="anonymous"
        async></script>
    </div>
  </div>
</div>
```
