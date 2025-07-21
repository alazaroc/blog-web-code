# TODO List

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
