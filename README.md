## Express + Mongoose API

### Prerequisites

- Node.js 18+
- MongoDB (local or MongoDB Atlas)

### Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Create a `.env` file in the project root based on `.env.example`:

   ```ini
   PORT=5000
   MONGODB_URI="mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database-name>?retryWrites=true&w=majority&appName=<appName>"
   ```

   - Never commit `.env` to Git.

3. Run the server:
   - Development (auto-restart on save):
     ```bash
     npm run dev
     ```
   - Production:
     ```bash
     npm start
     ```
   - Visit `http://localhost:5000`

### Scripts

- `npm run dev`: Starts the server with nodemon for development.
- `npm start`: Starts the server with Node for production/simple runs.

### Routes

- `GET /api/users` - List users
- `GET /api/users/:id` - Get one user
- `POST /api/users` - Create user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Notes

- Mongoose will use database from `MONGODB_URI` and the collection `users` for the `User` model.
- If you’re using MongoDB Atlas, whitelist your IP in Network Access.
