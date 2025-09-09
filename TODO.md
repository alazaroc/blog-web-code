# TODO List

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
