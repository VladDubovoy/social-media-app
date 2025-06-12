# Social Media Application

## Thesis Information
**Student:** Vladyslav Dubovyi  
**Group:** ZPI-zp-21  
**Department:** 121 Software Engineering
**University:** National Technical University of Ukraine "Igor Sikorsky Kyiv Polytechnic Institute"

## Project Overview
A full-stack social media application that allows users to create profiles, share posts, interact with other users, and manage their social network. The application implements modern web development practices and follows a microservices architecture.

## Features
- User authentication and authorization
- Profile management
- Post creation and management
- Social interactions (likes, comments)
- Friend system
- Image upload and management
- Real-time updates
- Responsive design

## Technology Stack

### Frontend
- **Core:**
  - React.js 18.2.0
  - React Router 6.4.2
  - Redux Toolkit 1.8.6
  - Redux Persist 6.0.0

- **UI/UX:**
  - Material UI 5.10.11
  - Emotion (styled components)
  - React Dropzone 14.2.3
  - React Toastify 11.0.5

- **Form Handling:**
  - Formik 2.2.9
  - Yup 0.32.11

### Backend
- **Core:**
  - Node.js 18.17.0
  - Express.js 5.1.0
  - MongoDB 8.15.0
  - Mongoose 8.15.0

- **Authentication & Security:**
  - JSON Web Token 9.0.2
  - Bcrypt 6.0.0
  - Helmet 8.1.0
  - CORS 2.8.5

- **File Handling:**
  - Multer 1.4.2
  - GridFS Stream 1.1.1
  - Multer GridFS Storage 5.0.2

## Prerequisites
- Node.js >= 18.17.0
- npm >= 9.0.0
- MongoDB
- NVM (Node Version Manager)

## Installation

1. **Clone the repository:**
```bash
git clone [repository-url]
cd social-media-app
```

2. **Install NVM (if not installed):**
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
```

3. **Install dependencies:**
```bash
npm run install-all
```

4. **Environment Setup:**
   - Create `.env` file in the back-end directory
   - Add the following variables:
     ```
     MONGO_URL=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
     PORT=6001
     ```

## Running the Application

### Development Mode
```bash
npm run dev
```
This will start both the front-end (port 3000) and back-end (port 6001) in development mode.

### Production Build
```bash
npm run build
```

## Project Structure
```
social-media-app/
├── front-end/              # React frontend
│   ├── public/            # Static files
│   └── src/               # Source files
├── back-end/              # Node.js backend
│   ├── api/              # API routes
│   ├── config/           # Configuration files
│   ├── middlewares/      # Custom middlewares
│   ├── models/           # Database models
│   └── services/         # Business logic
└── package.json          # Root package.json
```

## API Documentation
The API documentation is available at `/api-docs` when running the back-end server.

## Contributing
1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License
This project is licensed under the ISC License.

## Contact
Vladyslav Dubovyi  
Email: dubovyi.vladyslav@lll.kpi.ua
