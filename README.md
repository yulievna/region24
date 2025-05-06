# Region 24 Website

A modern, responsive website for Region 24 design and construction workshop built with Vue.js and SCSS.

## Features

- Modern and responsive design
- Dynamic content management
- Interactive portfolio gallery
- Contact form with map integration
- Smooth animations and transitions
- Mobile-first approach

## Tech Stack

- Vue.js 3 (Composition API)
- Vue Router
- SCSS
- GSAP for animations
- Google Maps API (for contact map)

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/region24-website.git
cd region24-website
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env` file in the root directory and add your Google Maps API key:
```
VUE_APP_GOOGLE_MAPS_API_KEY=your_api_key_here
```

## Development

To start the development server:

```bash
npm run serve
# or
yarn serve
```

The application will be available at `http://localhost:8080`

## Building for Production

To build the project for production:

```bash
npm run build
# or
yarn build
```

The built files will be in the `dist` directory.

## Project Structure

```
region24-website/
├── public/
│   ├── index.html
│   └── images/
├── src/
│   ├── assets/
│   │   ├── styles/
│   │   │   └── main.scss
│   │   └── images/
│   ├── components/
│   ├── views/
│   │   ├── Home.vue
│   │   ├── Services.vue
│   │   ├── Portfolio.vue
│   │   ├── About.vue
│   │   └── Contacts.vue
│   ├── router/
│   │   └── index.js
│   ├── App.vue
│   └── main.js
├── package.json
└── README.md
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

Your Name - your.email@example.com
Project Link: https://github.com/yourusername/region24-website 