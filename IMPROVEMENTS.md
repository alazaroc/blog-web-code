## Automatizar

[ ] 1.  Increase Jekyll Build Speed
[ ] 5.  Revisar latencia blog: https://dev.to/aws-espanol/midiendo-la-latencia-hacia-la-nueva-region-de-aws-espana-eu-south-2-en-zaragoza-db
[ ] 20. Custom Home - no blog
[ ] 3. DUDA: Cambiar lambda@edge por cloudfront function???
[ ] 1. DUDA: Cambiar API REST por API HTTP? revisarlo
[ ] 2.  Include polls en la web? para que?
[ ] 3.  CodeBuild - use custom image with Terraform installed ---> Review how much money I will save?
[ ] 2.  Automate send of emails to email newsletter
[ ] Zona privada Cognito
[ ] Batch informe mensual
[ ] CodeBuild - use custom image with Terraform installed
[ ] Automate send of emails to email newsletter
[ ] Custom Home - no blog
[ ] Subscription flow
[ ] Cambiar lambda@edge por cloudfront function?
[ ] Page for speaker events?

## REVISAR


[ ] 1. Los articulos que sean de una serie, que aparezca visible en HOME para no tener que poner 1/5 etc
[ ] 3. Revisar DEPRECATED en mobile...
1. Subscription flow
2. Batch informe mensual
[ ] 7.  Create custom email with my domain



Quiero que analices mi aplicacion web, con detalle y me propongas mejoras que pueda hacer.


- En formato movil no se ve el area de widgets, ayudame a reubicarla.

- Ayudame a ponerle estilos a mi pagina de eventos. He puesto el texto de mis eventos pero ahora falta integrarlos en algo bonito. -> @events.md en mi pagina de eventos, tengo una serie de eventos que quiero incluir con estilos chulos, ¿me ayudas? el contenido está puesto como texto plano en el fichero, necesito darle estilos...

- en la home, el listado general, en "post-meta flex-grow-1 d-flex align-items-end" se ve toda la info muy mal. Ademas, que me recomiendas mostrar ahi? ahora muestro la fecha, la categoria y el nivel, me ayudas a pensar que mostrar y me ayudas a mejorarlo visualmente?

- Tengo un problema con las categorias, porque en los articulos en ingles se pone de una forma y en los articulos en español puede estar de otra. Entonces si en inglés es AI y en español IA cuando intento hacer el cambio de idioma intenta cambiar al nombre que ya estaba pero en el otro idioma es distinto y falla. Revisalo porfa, este es el codigo:ccen categorias.html, <!-- TODO: en español deberia abrirlo como /es/categories... --> <div class="category-card" onclick="window.location.href='/categories/{{ category[0] | slugify }}/'">

- formulario de suscripcion, actualizar, esto no es correcto: "https://api.convertkit.com/v3/forms/1234567/subscriptions"

- subscribe now -> pulso y que pasa? aparentemente nada! deberia realizar la peticion a la api definida...

- revisar otros formularios y actualizar URLs

- NO subir comunidad ni guides & faqs
- arreglar estilos oscuro
  - listado azul home
  - articulo: azul/naranja/blanco
  - series: no se ve texto

  - validar modo oscuro, dejar nuevo javascript o no?
  
- arreglar estilos blanco
  - listado azul home
  - articulo: azul/naranja/blanco
  quitar contenedores grises en modo oscuro: 
  - en listado de articulos, 
  - en articulo en cabecera (post-meta text-muted)
  - en articulo en pie donde se muestra la categoria (encima de los tags del articulo) --> que por cierto, me gustaria mostrar en el header (post-meta text-muted) tambien la categoria y los tags como links y no mostrarlos abajo en post-tail-wrapper text-muted mt-5
  - en categories & Tags, cada categoria tiene un contenedor gris con textos grises (se ve fatal!)
  - en categories & Tags, los tags estan dentro de un contenedor gris

- refactorizacion: para los javascript ayudame a refactorizarlos. Hay muchos embebidos en todas partes, quitalos de ficheros html y dejalos solo en ficheros javascript. Se que tienes funcionalidad duplicada. Por ejemplo (y es solo un ejempl), las funcionalidades de toggleSection... las tienes en categorias, series y muchos otros sitios. O las funcionalidades de  o de acordeon... Es verdad que seguramente ahora las tengas diferentes y para sacar un metodo comun tengas que refactorizar, pero seria lo ideal

