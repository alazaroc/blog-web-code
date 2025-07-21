# Playing AWS Blog

A modern, feature-rich Jekyll blog focused on AWS topics with gamification, multi-language support, and advanced user engagement features.

## 🚀 Features

### Core Features

- **Multi-language Support**: English and Spanish with complete localization
- **Gamification System**: Badges, progress tracking, and user engagement
- **Series Management**: Organized content with navigation and progress tracking
- **AWS Integration**: Cognito authentication, CloudWatch RUM monitoring
- **Responsive Design**: Mobile-first approach with touch navigation

### User Engagement

- **Reading Progress Bar**: Visual progress indicator for long posts
- **Like System**: User interaction with posts
- **Comment Integration**: Giscus-powered discussions
- **Newsletter Subscription**: ConvertKit integration with smart popups
- **Feedback System**: User feedback collection and rating

### Technical Features

- **Dark Mode**: AWS-branded color scheme
- **Search Functionality**: Full-text search across content
- **SEO Optimized**: Meta tags, structured data, sitemap
- **Performance**: Optimized assets, lazy loading, CDN ready

## 🛠 Technology Stack

- **Static Site Generator**: Jekyll with Chirpy theme
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Styling**: Bootstrap 5, custom AWS-themed CSS
- **Comments**: Giscus (GitHub Discussions)
- **Analytics**: CloudWatch RUM, GoatCounter
- **Deployment**: AWS S3 + CloudFront

## 📁 Project Structure

```code
blog-web-code/
├── _config.yml                 # Main configuration
├── _data/
│   ├── locales/               # Multi-language support
│   │   ├── en.yml            # English translations
│   │   └── es.yml            # Spanish translations
│   ├── contact.yml           # Contact information
│   └── share.yml             # Social sharing config
├── _includes/                # Reusable components
├── _layouts/                 # Page templates
├── _posts/                   # Blog posts (organized by language)
├── _tabs/                    # Navigation pages
├── assets/
│   ├── css/                  # Stylesheets
│   ├── js/                   # JavaScript modules
│   └── img/                  # Images and media
└── CHANGELOG.md              # Version history
```

## 🚀 Quick Start

### Prerequisites

- Ruby (see `.ruby-version`)
- Bundler
- Node.js (for asset compilation)

### Installation

```bash
   git clone https://github.com/alazaroc/blog-web-code.git
   cd blog-web-code
   bundle install
```

### Development

```bash
bundle exec jekyll serve --livereload
```
Visit `http://localhost:4000`

## 📝 Content Management

### Adding Posts

   ```yaml
   ---
   title: "Your Post Title"
date: 2025-01-01 12:00:00 +0000
categories: [AWS, Cloud]
tags: [ec2, serverless]
series: aws-well-architected-framework  # Optional
   ---
   ```

### Multi-language Posts

- English: `_posts/en/`
- Spanish: `_posts/es/`

### Series Configuration

Configure series in `_data/locales/[lang].yml`:

```yaml
series:
  aws-well-architected-framework:
    name: "AWS Well-Architected Framework"
    description: "Complete guide to AWS best practices"
    posts:
      - title: "Part 1: Introduction"
        url: "/posts/introduction/"
        order: 1
```

## 🏅 Playing AWS Gamification Badges

¡Desbloquea logros techies mientras exploras el blog!

### Series Badges

- 🤓 **Series Finisher**: Completa 1 serie
- 🏅 **Series Guru**: Completa 5 series
- 🌟 **Series Legend**: Completa 10 series
- 🦸 **AWS Hero**: Consigue todos los demás badges

### Reading Badges

- 📖 **First Read**: Lee tu primer artículo
- ☁️ **Cloud Reader**: Lee 5 artículos
- 🔎 **Knowledge Seeker**: Lee 10 artículos
- 🧭 **Content Explorer**: Lee 20 artículos
- 🏆 **Ultimate Reader**: Lee 50 artículos

### Otros badges

- ❤️ **First Like**: Primer like
- 🚀 **Like Enthusiast**: 5 likes
- 💬 **First Comment**: Primer comentario
- 🗣️ **Feedback Fan**: 3 comentarios
- 🤝 **Community Builder**: 5 comentarios

## 🌐 Localization

Complete multi-language support with:

- **Content**: Posts, pages, and navigation
- **UI Elements**: Buttons, forms, messages
- **Gamification**: Badge titles and descriptions
- **Series**: Names and descriptions

## 🔧 Configuration

### AWS Integration

```yaml
# _config.yml
cognito:
  region: us-east-1
  userPoolId: your-user-pool-id
  clientId: your-client-id
  domain: your-domain.auth.region.amazoncognito.com

cloudwatch_rum:
  applicationId: your-app-id
  clientToken: your-client-token
```

### Newsletter

```yaml
# _config.yml
convertkit:
  formId: your-form-id
  apiKey: your-api-key
```

## 📊 Analytics & Monitoring

- **CloudWatch RUM**: Real user monitoring
- **GoatCounter**: Privacy-friendly analytics
- **Performance Tracking**: Core Web Vitals monitoring

## 🚀 Deployment

The blog is optimized for deployment on:

- **AWS S3 + CloudFront** (recommended)
- **GitHub Pages**
- **Netlify**
- **Vercel**

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test locally
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🔗 Links

- **Live Site**: https://www.playingaws.com/
- **Theme**: [Chirpy](https://github.com/cotes2020/jekyll-theme-chirpy)
- **Documentation**: [Jekyll Docs](https://jekyllrb.com/docs/)

---

Built with ❤️ and ☁️ for the AWS community.
