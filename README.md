## Getting Started

These instructions will help you set up and run the project on your local machine.

### Prerequisites

- Node.js v18.18.0 or higher
- MongoDB installed locally or a MongoDB Atlas account

### Installing

1. Clone the repository:

   ```bash
   git clone https://github.com/andrysatko/admin_panel.git
2. Add the following environment variables to `.env` file:`DATABASE_URL=""` - MongoDB connection string
3. Navigate to the server directory, install dependencies, and generate Prisma client:

   ```bash
   cd server
   npm install
   npx prisma generate
   npx prisma db push
   ```

4. Run the server ( in the server directory ):
   ```bash
    npm run dev
    ```
5. Navigate to the client directory ( from the root directory):
    ```bash
    cd client
    ```
6. Install the dependencies:
    ```bash
     npm install
     ```
7. Run the client:
    ```bash
     npm run dev
     ```
