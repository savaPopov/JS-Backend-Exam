# Recipe Sharing Platform 🍳

A full-stack MVC web application for sharing and discovering recipes with secure user authentication and interactive features.

## ✨ Features

### 👤 Guest Users
- Browse public recipe catalog
- View recipe details with ingredients and instructions
- Search recipes by title
- User registration and login

### 🔐 Authenticated Users
- Create new recipes with images
- Edit and delete your own recipes
- Recommend other users' recipes
- Personalized dashboard
- Secure authentication system

## 🛠️ Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB with Mongoose
-  **Authentication:** **Custom JWT implementation**, bcrypt, middleware
- **Frontend:** Handlebars templating engine
- **Security:** express-validator, password hashing
- **Session Management:** Cookie-based JWT tokens

## 🚀 Installation

```bash
# Install dependencies
npm install

# Start the application
node src/index.js

# Server runs on http://localhost:3000

## 📸 Screenshots

<img width="1857" height="958" alt="HomePage" src="https://github.com/user-attachments/assets/0092e2cb-5feb-4eb3-ae89-1f75f14ffff5" />

<img width="1857" height="958" alt="Catalog" src="https://github.com/user-attachments/assets/430d5f1e-45a8-4d84-baf0-370fc4a442ac" />

<img width="1857" height="958" alt="Search" src="https://github.com/user-attachments/assets/f5d92926-0296-4a38-b120-87e0e5272af2" />

<img width="1857" height="958" alt="DetailsUnauthenticated" src="https://github.com/user-attachments/assets/d4de4d06-73a3-481a-b049-d3616c9ebfe1" />

<img width="1857" height="958" alt="Registration" src="https://github.com/user-attachments/assets/a3a069ac-1777-4202-8bfb-64e88125fa07" />

<img width="1857" height="958" alt="Login" src="https://github.com/user-attachments/assets/4e286409-0591-40ec-8e96-a682e906cf36" />

<img width="1857" height="958" alt="DetailsNotOwner" src="https://github.com/user-attachments/assets/613a1597-b6d3-4cdc-94f6-7805af1b8573" />

<img width="1857" height="958" alt="Create" src="https://github.com/user-attachments/assets/37bdfac1-81ed-4f83-b1a5-b66f8bb8384c" />

<img width="1857" height="958" alt="DetailsOwner" src="https://github.com/user-attachments/assets/7a7d738c-b685-4ba1-8382-b6fc1a9dedc7" />

<img width="1857" height="958" alt="Edit" src="https://github.com/user-attachments/assets/a39ff722-2eb6-44cc-b830-ed4455556848" />
