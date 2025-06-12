# Social Media App - Frontend

A modern, responsive social media application built with React and Material-UI. This frontend application provides a rich user interface for social networking features including user profiles, posts, friend connections, and more.

## Features

- **User Authentication**
  - Secure login and registration system
  - JWT-based authentication
  - Protected routes

- **User Profiles**
  - Customizable user profiles
  - Profile picture upload
  - View profile statistics (views, impressions)
  - Social media links integration

- **Social Features**
  - Create and share posts
  - Like and comment on posts
  - Friend system
  - View friend lists
  - Profile viewing

- **UI/UX**
  - Responsive design for all devices
  - Dark/Light mode toggle
  - Modern Material-UI components
  - Smooth animations and transitions

- **Performance Optimizations**
  - React.memo for component memoization
  - useCallback for optimized event handlers
  - Efficient state management with Redux
  - Optimized image loading

## Tech Stack

- **Frontend Framework**: React.js
- **UI Library**: Material-UI (MUI)
- **State Management**: Redux Toolkit
- **Form Handling**: Formik with Yup validation
- **Routing**: React Router
- **HTTP Client**: Fetch API
- **Notifications**: React-Toastify
- **File Upload**: React-Dropzone

## Project Structure

```
front-end/
├── public/
│   ├── assets/        # Static assets (images, icons)
│   └── index.html     # HTML template
├── src/
│   ├── components/    # Reusable UI components
│   ├── state/         # Redux store and slices
│   ├── App.js         # Root component
│   └── index.js       # Entry point
```

## Getting Started

1. **Prerequisites**
   - Node.js (v14 or higher)
   - npm or yarn

2. **Installation**
   ```bash
   cd front-end
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory with:
   ```
   REACT_APP_API_URL=http://localhost:3001
   ```

4. **Running the Application**
   ```bash
   npm start
   ```
   The application will be available at `http://localhost:3000`

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App

## Performance Considerations

- Components are memoized using React.memo to prevent unnecessary re-renders
- Event handlers are optimized with useCallback
- Images are optimized for web delivery
- Lazy loading is implemented for better initial load time

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 