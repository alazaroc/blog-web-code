# TODO List

- [ ] Mi ventana home no se ve, yo creo que es por el idioma porque no me carga ningún texto, ¿me ayudas? Y ademas, ¿que información me recomiendas mostrar aquí? Esta es la web de mi blog pero he decidido tener una ventana home que no sea el listado de mis articulos. Creo que necesito en la home ciertas categorias como por ejemplo 5 ultimos articulos, 5 ultimas "news", featured_posts, y algo mas de este estilo, ¿que me recomiendas? Ademas de incluri algo de informacion sobre mi y luego tambien algo de informacion acerca del blog y como contribuir (con un enlace a la info de que me paguen que esta en la pagina de about)
- [ ] Quiero que cambies la pagina de events. En la pagina events.md dentro de _tabs/en he puesto en texto la información que quiero aqui. Pero no lo enfoques a eventos de la comunidad, sino a eventos publicos
- [ ] Ejecutar npm run lint:css y arreglar los errores
- [ ] Ejecutar lint:js y arreglar los errores (siempre que no haya templates liquid por el medio, de ser asi habra que crear excepciones porque no quiero tener que formatearlo, lo quiero como lo tengo para que sea mas legible)

REVISAR YO:
- categorias y tags -> clickable option
---

Para tu flujo ideal (sencillo)

Trabajar en la feature

git switch -C feature/v3.0.0   # la primera vez
# o: git switch feature/v3.0.0 # si ya existe
git add -A
git commit -m "feat: algo nuevo"
git push -u origin feature/v3.0.0


✅ Commits normales, como siempre.

Actualizar la feature con main (de vez en cuando)

git fetch origin
git switch feature/v3.0.0
git rebase origin/main   # o merge si prefieres
git push --force-with-lease   # si usaste rebase


➡️ Esto NO toca main. Solo mantiene tu rama al día.

Cuando quieras publicar algo en main

Te pones en main.

Traes los cambios de la feature con merge --squash o cherry-pick -n.

Seleccionas qué publicar (git add de lo que quieras).

Haces un commit limpio y git push origin main.

## 🔥 Prioridad alta

- [ ]

## 🧩 Tareas medias

- [ ] NEW: nueva sección "noticias" o "sabias que" o similar... con ACTUALIZACIONES de servicios de AWS, curiosidades, noticias breves... ---> Crear un nuevo apartado NEWS? --> y a veces saldrá articulo a veces solo ese mensaje... como lo enfoco? que posibilidades tiene?
  - Ejemplo de noticia: 1 noticia:
    > **Aviso Terraform (v1.10+)**. Si ejecutas Terraform **1.10 o superior**, el parámetro `dynamodb_table` del backend S3 está **deprecado**. Usa `use_lockfile = true` y **elimina** `dynamodb_table`.  
    > En versiones **anteriores a 1.10**, mantén `dynamodb_table` para el *locking* distribuido.  
    > Ejemplo para 1.10+:  
    >
    > ```hcl
    > terraform {
    >   backend "s3" {
    >     bucket        = "mi-bucket-state"
    >     key           = "ruta/a/terraform.tfstate"
    >     region        = "eu-west-1"
    >     encrypt       = true
    >     use_lockfile  = true
    >   }
    > }
    > ```
    {: .prompt-warning }
- [ ]

## 💤 Nice to have

- [ ]
