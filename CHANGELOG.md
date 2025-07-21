# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [3.0.0] - 2025-07-15

### 🎮 Added

- **Gamification System**: Complete badge system with reading, likes, and comment tracking
- **Reading Progress Bar**: Visual progress indicator for long posts
- **Series Management**: Enhanced series navigation with progress tracking and banners
- **AWS Cognito Integration**: Authentication system ready for private content
- **CloudWatch RUM**: Real user monitoring and performance tracking
- **Enhanced Multi-language**: Complete localization system with externalized texts
- **Touch Navigation**: Mobile gesture support for better UX
- **Like System**: User interaction with posts and tracking
- **Improved Mobile Typography**: Better readability on mobile devices

### 🔧 Enhanced

- **Localization Architecture**: All UI texts moved to locale files (`_data/locales/`)
- **Series Banners**: Interactive navigation with tooltips and progress indicators
- **Badge System**: 12 different badges with progress tracking and animations
- **Mobile Responsiveness**: Improved card layouts and touch interactions
- **Search Experience**: Better styling and positioning
- **Categories & Tags**: Merged interface with collapsible sections
- **Timeline Navigation**: Renamed "Archives" to "Timeline" with calendar icon

### 🎨 Improved

- **AWS Branding**: Consistent orange color scheme throughout
- **Dark Mode**: Enhanced contrast and readability
- **Badge Notifications**: Centered popups with celebration animations
- **Series Badges**: Visual indicators in post lists
- **Progress Bars**: AWS-themed styling for gamification progress
- **Tooltips**: Enhanced hover information for badges and series

### 🐛 Fixed

- **Language Detection**: Proper locale loading in JavaScript
- **Badge Tracking**: Robust Giscus comment detection
- **Series Navigation**: Fixed text truncation and tooltip display
- **Mobile Layout**: Improved sidebar and menu organization
- **Search Bar**: Better positioning and styling
- **Tag Colors**: Consistent AWS orange theme

### 🔄 Technical

- **Code Cleanup**: Removed all hardcoded texts from JavaScript
- **Locale Injection**: Proper data injection for client-side localization
- **Performance**: Optimized badge tracking and series management
- **Modular Architecture**: Separated concerns between gamification, series, and UI

## [2.2.0] - 2025-06-22

- Improved mobile layout and responsiveness
- Added new subscription popup
- Added legal notice and cookies pages in footer
- Reviewed feed.xml and added new rss.xml
- Refactored HTML structure for better maintainability

## [2.1.0] - 2025-03-21

- Updated version of my theme `jekyll-theme-chirpy` to version 7.2.4
- Added multi-language! Included new language: Spanish

## [2.0.0] - 2024-08-23

- Using the gem v.6.4.2 of the `jekyll-theme-chirpy`.
- New logo (version 2): [image link](https://github.com/alazaroc/blog-web-code/blob/main/assets/img/favicons/logo_v2.png)
- Removing fix header and other customizations to use the new styles in the Chirpy theme.
- Customize the right section by adding my custom `featured-list` posts between the update-list and the trending-tags.

## [1.0.0] - 2022-02-28

- First version of the website based in the Jekyll theme [Chirpy](https://github.com/cotes2020/jekyll-theme-chirpy).
- Forked version of the Chirpy theme, https://github.com/alazaroc/jekyll-theme-chirpy, based on the version `5.4.0`.
- Customized styles:
  - Logo of the website (version 1): [image link](https://github.com/alazaroc/blog-web-code/blob/main/assets/img/favicons/logo_v1.png)
  - Fix header image in all pages.
  - Custom html pages: `home.html` and `page.html`.
  - New list type `featured-list.html`.
  - Custom forms and styles: contact and subscribe.
