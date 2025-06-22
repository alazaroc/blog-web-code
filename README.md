# Blog-web-code

- [Blog-web-code](#blog-web-code)
  - [Description](#description)
  - [Technology used](#technology-used)
  - [Type](#type)
  - [More information (generated with AI)](#more-information-generated-with-ai)
    - [Jekyll-based Blog Website for Playing AWS](#jekyll-based-blog-website-for-playing-aws)
    - [Repository Structure](#repository-structure)
      - [Key Files and Directories](#key-files-and-directories)
    - [Usage Instructions](#usage-instructions)
      - [Prerequisites](#prerequisites)
      - [Installation](#installation)
      - [Running Locally](#running-locally)
      - [Markdown Validation (lint)](#markdown-validation-lint)
      - [Configuration](#configuration)
      - [Adding Content](#adding-content)
      - [Customization](#customization)
    - [Data Flow](#data-flow)
    - [Deployment](#deployment)

## Description

This is the code of my blog: <https://www.playingaws.com/>

## Technology used

Static site generator with `Jekyll`.

## Type

Public project.

## More information (generated with AI)

### Jekyll-based Blog Website for Playing AWS

This repository contains the source code for a Jekyll-based blog website focused on AWS topics. The site, "Playing AWS," is designed to help users learn, remove barriers, and practice AWS concepts.

The blog is built using the Jekyll static site generator with the Chirpy theme. It features a responsive design, SEO optimization, and integration with various services such as Google Analytics and Giscus for comments.

This code has been deployed here: <https://www.playingaws.com/>

### Repository Structure

```code
blog-web-code/
├── _config.yml
├── _data/
├── _includes/
├── _layouts/
├── _plugins/
├── _posts/
├── _tabs/
├── assets/
├── CHANGELOG.md
├── index.html
└── README.md
```

#### Key Files and Directories

- `_config.yml`: Main configuration file for the Jekyll site
- `_data/`: Contains YAML files for contact information, localization, and sharing options
- `_includes/`: Houses partial HTML files and JavaScript for various site components
- `_layouts/`: Contains HTML templates for different page types
- `_posts/`: Directory for blog post markdown files
- `_tabs/`: Markdown files for main navigation tabs
- `assets/`: Static assets including CSS, JavaScript, and images

### Usage Instructions

#### Prerequisites

- Ruby (version specified in `.ruby-version` file)
- Bundler
- Node.js and npm (for asset compilation)

#### Installation

1. Clone the repository:

   ```code
   git clone https://github.com/alazaroc/blog-web-code.git
   cd blog-web-code
   ```

2. Install dependencies:

   ```code
   bundle install
   npm install
   ```

#### Running Locally

To start the development server:

```code
bundle exec jekyll serve
```

Visit `http://localhost:4000` in your browser to view the site.

#### Markdown Validation (lint)

To improve the quality of your content, you can run `markdownlint` locally:

```sh
npx markdownlint "_posts/**/*.md" "_tabs/**/*.md" "README.md"
```

To see a summary of the most frequently failing rules and decide if you want to disable them, you can use:

```sh
npx markdownlint "_posts/**/*.md" "_tabs/**/*.md" "README.md" | grep -o 'MD[0-9]\\+' | sort | uniq -c | sort -nr
```

You can customize the rules by creating or modifying the `.markdownlint.json` file in the project root.

#### Configuration

Edit `_config.yml` to customize site settings, including:

- Site title and description
- Social media links
- Google Analytics ID
- Comments system (Giscus)

#### Adding Content

1. Create new blog posts in the `_posts/` directory using the format `YYYY-MM-DD-title.md`.
2. Use the front matter to set post metadata:

   ```yaml
   ---
   title: "Your Post Title"
   date: YYYY-MM-DD HH:MM:SS +/-TTTT
   categories: [Category1, Category2]
   tags: [tag1, tag2]
   ---
   ```

3. Write your post content in Markdown below the front matter.

#### Customization

- Modify `_includes/` files to change site components
- Edit `assets/css/custom.css` for custom styles
- Update `_data/` YAML files to change contact and sharing options

### Data Flow

The blog follows a typical Jekyll static site generation process:

1. Content is written in Markdown files (posts and pages)
2. Jekyll processes these files along with the configuration and layout templates
3. Static HTML files are generated
4. These files are served to users via a web server

```code
[Markdown Files] -> [Jekyll Processing] -> [Static HTML] -> [Web Server] -> [User's Browser]
```

Jekyll handles the conversion of Markdown to HTML, applies layouts and includes, and generates the final static files that can be served by any web server.

### Deployment

The deployment process is not specified in the provided files. However, given the static nature of Jekyll sites, common deployment options include:

- GitHub Pages
- AWS S3 + CloudFront
- Netlify
- Vercel

Ensure that you build the site locally (`bundle exec jekyll build`) before deploying, or set up a CI/CD pipeline to automate the build and deployment process.

---

For more information on Jekyll and the Chirpy theme, refer to their respective documentation:

- [Jekyll Documentation](https://jekyllrb.com/docs/)
- [Chirpy Theme Documentation](https://github.com/cotes2020/jekyll-theme-chirpy#documentation)
