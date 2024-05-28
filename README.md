# Social Media App

This is a full-stack social media application built with React on the frontend and Node.js with Express on the backend. The app allows users to register, log in, create posts, comment on posts, and manage their profiles.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [Endpoints](#endpoints)
- [Contributing](#contributing)
- [License](#license)

## Features

- User Authentication: Register and log in using JWT.
- Profile Management: Update user profile information.
- Posts: Create, view, and delete posts.
- Comments: Add and delete comments on posts.
- Responsive Design: Works on mobile and desktop.

## Technologies Used

- **Frontend:**
  - React
  - React Router
  - SCSS
  - Axios
  - React Query

- **Backend:**
  - Node.js
  - Express
  - MySQL
  - JWT
  - Bcrypt.js

## Getting Started

### Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js and npm installed on your machine
- MySQL installed and running
- Create a MySQL database for the application

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/social-media-app.git
cd social-media-app
```

2. Install dependencies for both the client and server:

```bash
cd api
npm install
cd ../client
npm install
```

### Running the Application

1. Set up your environment variables:

Create a `.env` file in the `api` directory with the following content:

```env
REACT_APP_API_BASE_URL=http://localhost:8800/api/
PORT=8800
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=socials
JWT_SECRET=your_jwt_secret
```

2. Start the backend server:

```bash
cd api
npm start
```

3. Start the frontend server:

```bash
cd ../client
npm start
```

The frontend will be running on `http://localhost:3000` and the backend on `http://localhost:8800`.

## Environment Variables

The environment variables required for the project are:

- `REACT_APP_API_BASE_URL`: Base URL for the API.
- `PORT`: Port for the backend server.
- `DB_HOST`: MySQL database host.
- `DB_USER`: MySQL database user.
- `DB_PASSWORD`: MySQL database password.
- `DB_NAME`: MySQL database name.
- `JWT_SECRET`: Secret key for JWT.

## Project Structure

The project structure is as follows:

```plaintext
project-root/
├── api/
│   ├── controllers/
│   ├── routes/
│   ├── connect.js
│   ├── index.js
│   └── .env
└── client/
    ├── src/
    │   ├── components/
    │   ├── context/
    │   ├── pages/
    │   ├── App.js
    │   ├── index.js
    │   ├── axios.js
    │   └── style.scss
    ├── public/
    ├── package.json
    └── .env
```

## Endpoints

### Auth

- `POST /api/auth/register`: Register a new user
- `POST /api/auth/login`: Log in a user
- `POST /api/auth/logout`: Log out a user

### Users

- `GET /api/users/:id`: Get user information
- `PUT /api/users/:id`: Update user information

### Posts

- `GET /api/posts`: Get posts
- `POST /api/posts`: Create a new post
- `DELETE /api/posts/:id`: Delete a post

### Comments

- `GET /api/comments`: Get comments for a post
- `POST /api/comments`: Add a comment to a post
- `DELETE /api/comments/:id`: Delete a comment

### Likes

- `POST /api/likes`: Like a post
- `DELETE /api/likes`: Unlike a post

### Relationships

- `POST /api/relationships`: Follow a user
- `DELETE /api/relationships`: Unfollow a user

### Stories

- `GET /api/stories`: Get stories
- `POST /api/stories`: Add a story
- `DELETE /api/stories/:id`: Delete a story

## Contributing

To contribute, follow these steps:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature-branch`.
3. Make your changes and commit them: `git commit -m 'Add some feature'`.
4. Push to the branch: `git push origin feature-branch`.
5. Create a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Feel free to reach out if you have any questions or suggestions!