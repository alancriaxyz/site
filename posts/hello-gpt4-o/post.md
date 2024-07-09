---
title: Hello GPT-4o
description: O GPT-4o é a mais recente iteração do poderoso modelo de linguagem da OpenAI, projetado para revolucionar a geração de texto, imagem, áudio e vídeo.
datePublished: '2024-05-13 00:00:00'
dateModified: '2024-05-13 00:00:00'
status: published
---

{% youtube id="tih3VnaTaPk" title="OpenAI GPT-4o | Primeiras Impressões e Alguns Teste com API" %}

## Conteúdo

## Lançamento

Hoje quem lançou a braba foi a galera da OpenAI. A jogada da vez foi o seu novo modelo [GPT-4o](https://openai.com/index/hello-gpt-4o/), projetado para revolucionar a geração de texto, imagem, áudio e vídeo.

Esse **"o"** aí vem de **"onipresente"**, ou seja, os caras vão estar em todos os lugares.
Eles querem que o GPT-4 consiga criar qualquer tipo de conteúdo, em qualquer formato e em qualquer idioma.

## Mudança

Atualmente muitos devs utilizam os seguintes modelos para atingir os seus objetivos:

| Modelo        | Entrada | Saída | Tokens |
| ------------- | ------- | ----- | ------ |
| gpt-3.5-turbo | Texto   | Texto | 16k    |
| gpt-4-turbo   | Texto   | Texto | 128k   |
| gpt-4-turbo   | Imagem  | Texto | 16k    |

A nova proposta da OpenAI promete entradas/saídas de imagens, áudios e vídeos, então o que veremos em um futuro próximo é:

| Modelo | Entrada | Saída  | Tokens |
| ------ | ------- | ------ | ------ |
| gpt-4o | Texto   | Texto  | 128k   |
| gpt-4o | Texto   | Imagem | 128k   |
| gpt-4o | Texto   | Áudio  | 128k   |
| gpt-4o | Imagem  | Texto  | 128k   |
| gpt-4o | Imagem  | Áudio  | 128k   |
| gpt-4o | Imagem  | Vídeo  | 128k   |
| gpt-4o | Vídeo   | Texto  | 128k   |
| gpt-4o | Vídeo   | Áudio  | 128k   |
| gpt-4o | Vídeo   | Vídeo  | 128k   |
| gpt-4o | Audio   | Texto  | 128k   |
| gpt-4o | Audio   | Imagem | 128k   |
| gpt-4o | Audio   | Vídeo  | 128k   |

Incrível, não? 🤯

E o melhor de tudo, uma janela de contexto de 128k tokens, ou seja, o modelo consegue entender e gerar textos muito mais longos e complexos, e tudo isso com um _CUSTO 50% MAIS BAIXO!_

A CTO [Mira Murati](https://twitter.com/miramurati) apontou que a utilização de três modelos diferentes pode causar latência no GPT. A solução é ter um único modelo capaz de processar áudio, texto e visão, eliminando esse problema e proporcionando uma interação mais fluída e imediata, semelhante à comunicação humana.

AGI se aproximando? 🤔

## Exemplos de uso

Os gringos lançaram uma pancada de exemplos de aplicações usando esse novo modelo:

- [Fazendo sarcasmo](https://vimeo.com/945587393)
- [Resolvendo problemas matemáticos](https://vimeo.com/945587328)
- [Aprendendo espanhol](https://vimeo.com/945587424)
- [Goolet Meet com IA](https://vimeo.com/945587401)
- [Tradução em tempo real](https://vimeo.com/945587808)
- [Canção de ninar](https://vimeo.com/945587944)
- [Falando mais rápido](https://vimeo.com/945587927)
- [Feliz Aniversário](https://vimeo.com/945587911)
- [GPT-4o com Andy, da BeMyEyes em Londres](https://vimeo.com/945587840)
- [Dois GPT-4s interagindo e cantando](https://vimeo.com/945587185)

> E você, já pensou no que vai criar com esse novo modelo? Conta aí nos comentários.

## Acessando a API

Vamos brincar um pouco com a API que já está disponível para todos os desenvolvedores.

```py:main.py
from openai import OpenAI
import os

SECRET_KEY = "SUA_CHAVE"
client = OpenAI(api_key=SECRET_KEY)

completion = client.chat.completions.create(
  model="gpt-4o",
  messages=[
    {"role": "system", "content": "Você é um assistente prestativo. Me ajude com a minha lição de matemática!"},
    {"role": "user", "content": "Olá! Você poderia resolver 2+2?"}
  ]
)

print("Assistente: " + completion.choices[0].message.content)

"""
Saida:
( 2 + 2 = 4 ). Se precisar de mais ajuda com sua lição de matemática, estou à disposição!
"""
```

Exemplo bem simples, certo?

Mas veja que não precisamos mais usar o _gpt-4-turbo_ para resolver problemas matemáticos, o _gpt-4_ já resolve isso para nós.

Eu ainda pretendo continuar usando o _gpt-3.5-turbo_ para algumas situações, pois ele ainda é mais rápido e mais barato para textos menores.

### Processamento de Imagem

Para esse teste peguei um screenshot do [meu linkedin](https://www.linkedin.com/in/alancriaxyz/) e vou pedir para o modelo descrever o que posso melhorar no meu perfil.

```py:main.py
from openai import OpenAI
import base64

SECRET_KEY = "SUA_CHAVE"
client = OpenAI(api_key=SECRET_KEY)

def encode_image(image_path):
    with open(image_path, "rb") as image_file:
        return base64.b64encode(image_file.read()).decode("utf-8")

base64_image = encode_image("linkedin.png")

response = client.chat.completions.create(
    model="gpt-4o",
    messages=[
        {"role": "system", "content": "Você é um assistente que analisa imagens."},
        {"role": "user", "content": [
            {"type": "text", "text": "O que eu poderia melhorar no meu perfil do LinkedIn?"},
            {"type": "image_url", "image_url": {
                "url": f"data:image/png;base64,{base64_image}"}
            }
        ]}
    ],
    temperature=0.0,
)

print(response.choices[0].message.content)

"""
Saida:
1. **Foto de Perfil e Capa**:
   - A foto de perfil é profissional e amigável, o que é ótimo. Certifique-se de que a foto de capa também seja relevante para sua área de atuação ou que reflita sua personalidade profissional.

2. **Título Profissional**:
   - Seu título atual é "CTO na VIK". Considere adicionar palavras-chave que descrevam suas habilidades e especializações, como "CTO | Engenheiro de Software | Especialista em Ruby on Rails".

3. **Resumo (Sobre)**:
   - O resumo é uma ótima oportunidade para destacar suas principais realizações e habilidades. Considere adicionar mais detalhes sobre projetos específicos, resultados alcançados e como você pode agregar valor a potenciais empregadores ou parceiros.

...
"""
```

Bem mais interessante, certo?

O modelo conseguiu analisar a minha foto e sugerir melhorias no meu perfil.

## Conclusão

Em breve a OpenAI disponibiliza as entradas/saídas de áudio e vídeo _(Sora?)_.

Eles não lançaram ainda, com a seguinte ressalva abaixo.

"Reconhecemos que as modalidades de áudio do GPT-4 apresentam uma variedade de riscos novos. Hoje estamos lançando publicamente entradas de texto e imagem e saídas de texto. Nas próximas semanas e meses, trabalharemos na infraestrutura técnica, usabilidade pós-treinamento e segurança necessária para liberar as outras modalidades. Por exemplo, no lançamento, as saídas de áudio serão limitadas a uma seleção de vozes pré-definidas e seguirão nossas políticas de segurança existentes."
