# Crie o seu cartão de negócios

Esse sistema foi desenvolvidor como um estudo da biblioteza do Canvas do HTML5, utilizando as ferramenta [Konva][konva-org] e [AngularJS][angularjs].


## `angular-seed` — uma semente para aplicações AngularJS

Este projeto é um esqueleto baseado em um aplicativo da web [AngularJS][angularjs]. Você pode usá-lo para inicializar rapidamente seus projetos de webapp angular e ambiente de desenvolvimento para esses projetos.

A semente contém um aplicativo AngularJS de amostra e é pré-configurado para instalar a estrutura AngularJS e um monte de ferramentas de desenvolvimento e teste para gratificação instantânea de desenvolvimento da web.

O aplicativo seed não faz muito, apenas mostra como conectar dois controladores e visualizações.


### Instalando as dependencias de desenvolvimento

Temos dois tipos de dependências neste projeto: ferramentas e código do framework AngularJS. As ferramentas nos ajudam a gerenciar e testar o aplicativo.

* Obtemos as ferramentas das quais dependemos e o código AngularJS via `npm`, utilizando o [Node package manager][npm].
* Para executar os testes de ponta a ponta, você também precisará ter o [Java Development Kit (JDK)][jdk] instalado em sua máquina.
* Para executar automatizar algumas tarefas, estamos utilizando o [Gulp][GulpJs], dessa forma ganhamos muito tempo ao fazer o build do projto! Então este também precisa estar instalado em sua máquina.

```
npm install --global gulp-cli
```

### Executando os sitema:

Pré-configuramos o npm para copiar automaticamente os arquivos AngularJS baixados e dependências do sistema para o doretório `app/lib`, sendo assim, para iniciar o sistema basta executar o comando a seguir:

```
npm install
```

#### Imagens do sistema

Crie estruturas simples e complexas:

![alt text](app/assets/images/exemples/card-1.png)


As ferramentas ainda são básicas, mas vão melhorar!

![alt text](app/assets/images/exemples/card-2.png)


Você pode criar seu cartão como quiser e baixar ele como imagem!

![alt text](app/assets/images/exemples/card-3.png)


[angularjs]: https://angularjs.org/
[konva-org]: https://konvajs.org/
[GulpJs]: https://gulpjs.com/
[git]: https://git-scm.com/
[http-server]: https://github.com/indexzero/http-server
[jasmine]: https://jasmine.github.io/
[jdk]: https://wikipedia.org/wiki/Java_Development_Kit
[jdk-download]: http://www.oracle.com/technetwork/java/javase/downloads
[karma]: https://karma-runner.github.io/
[local-app-url]: http://localhost:8000/index.html
[node]: https://nodejs.org/
[npm]: https://www.npmjs.org/
[protractor]: http://www.protractortest.org/
[selenium]: http://docs.seleniumhq.org/
[travis]: https://travis-ci.org/
[travis-docs]: https://docs.travis-ci.com/user/getting-started
