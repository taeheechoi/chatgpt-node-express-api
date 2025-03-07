### Start Project
- New Structure
    ```
    my-api/
    │── src/
    │   ├── controllers/
    │   │   ├── exampleController.ts
    │   ├── middleware/
    │   │   ├── errorHandler.ts
    │   ├── routes/
    │   │   ├── index.ts
    │   ├── config.ts
    │   ├── server.ts
    │── tsconfig.json
    │── package.json
    │── .gitignore
    │── README.md

    ```

- src/server.ts: Entry point
- src/routes/index.ts: API routes
- src/controllers/exampleController.ts: Example controller
- src/middleware/errorHandler.ts: Error handling middleware
- src/config.ts: Configuration file
- tsconfig.json: TypeScript configuration
- package.json
- Install Dependencies
```
npm install express dotenv
npm install --save-dev @types/express @types/node ts-node-dev typescript
npm run dev
```

### Update Code with Authentication
- Structures
    ```
    my-api/
    │── src/
    │   ├── controllers/
    │   │   ├── authController.ts
    │   │   ├── exampleController.ts
    │   ├── middleware/
    │   │   ├── authMiddleware.ts
    │   │   ├── errorHandler.ts
    │   ├── routes/
    │   │   ├── authRoutes.ts
    │   │   ├── index.ts
    │   ├── services/
    │   │   ├── authService.ts
    │   ├── utils/
    │   │   ├── jwt.ts
    │   │   ├── mail.ts
    │   ├── config.ts
    │   ├── server.ts
    │── tsconfig.json
    │── package.json
    │── .env
    │── .gitignore
    │── README.md
    ```
- Install Dependencies
    ```
    npm install bcryptjs jsonwebtoken nodemailer dotenv
    npm install --save-dev @types/jsonwebtoken @types/bcryptjs
    npm run dev
    ```
- .env: Configure Environment Variables
- src/config.ts: Update Code with Authentication
- src/utils/jwt.ts: JWT Utility Functions
- src/utils/mail.ts: Mail Utility for Password Reset
- src/middleware/authMiddleware.ts: Auth Middleware
- src/services/authService.ts: Business Logic for Authentication
- src/controllers/authController.ts: Handles API Requests
- src/routes/authRoutes.ts: Auth Routes

### Update Code with Rate Limiting and Validation using Zod
- Structures
    ```
    my-api/
    │── src/
    │   ├── controllers/
    │   │   ├── authController.ts
    │   │   ├── exampleController.ts
    │   ├── middleware/
    │   │   ├── authMiddleware.ts
    │   │   ├── errorHandler.ts
    │   │   ├── rateLimiter.ts <--
    │   │   ├── validateRequest.ts <--
    │   ├── routes/
    │   │   ├── authRoutes.ts
    │   │   ├── index.ts
    │   ├── services/
    │   │   ├── authService.ts
    │   ├── utils/
    │   │   ├── jwt.ts
    │   │   ├── mail.ts
    │   ├── validators/
    │   │   ├── authSchemas.ts <--
    │   ├── config.ts
    │   ├── server.ts
    │── tsconfig.json
    │── package.json
    │── .env
    │── .gitignore
    │── README.md
    ```

- Install Dependencies
    ```
    npm install express-rate-limit zod
    npm install --save-dev @types/express-rate-limit
    ```

- src/middleware/rateLimiter.ts: Rate Limiting Middleware
- src/server.ts: Apply this middleware to the entire /api route
- src/middleware/validateRequest.ts: Request Validation Middleware Zod
- src/validators/authSchemas.ts: Define Request Schemas Using Zod
- src/routes/authRoutes.ts: Apply Request Validation to Routes validateRequest()


### Update Code with Postgresql
- Structures
    ```
    my-api/
    │── prisma/
    │   ├── schema.prisma <--
    │── src/
    │   ├── controllers/
    │   │   ├── authController.ts
    │   │   ├── exampleController.ts
    │   ├── middleware/
    │   │   ├── authMiddleware.ts
    │   │   ├── errorHandler.ts
    │   │   ├── rateLimiter.ts 
    │   │   ├── validateRequest.ts 
    │   ├── routes/
    │   │   ├── authRoutes.ts
    │   │   ├── index.ts
    │   ├── services/
    │   │   ├── authService.ts
    │   ├── utils/
    │   │   ├── jwt.ts
    │   │   ├── mail.ts
    │   ├── validators/
    │   │   ├── authSchemas.ts 
    │   ├── config.ts
    │   ├── server.ts
    │── tsconfig.json
    │── package.json
    │── .env
    │── .gitignore
    │── README.md
    ```
- Install Dependencies
    ```
    npm install @prisma/client pg
    npm install --save-dev prisma
    ```
- Initialize Prisma and Create User Model
    ```
    npx prisma init
    ```
- Modify the .env file to include your PostgreSQL connection string
- prisma/schema.prisma:  Define User Mode
    ````
    generator client {
    provider = "prisma-client-js"
    }

    datasource db {
    provider = "postgresql"
    url      = env("DATABASE_URL")
    }

    model User {
    id        String  @id @default(uuid())
    email     String  @unique
    password  String
    createdAt DateTime @default(now())
    }
    ````
- Apply Prisma Migration: Create necessary tables
    ``` 
    npx prisma migrate dev --name init
    ```
- Install Prisma Client
    ```
    npx prisma generate
    ``` 
- src/services/authService.ts: Prisma  for user management

- Start the Server
    ```
    npm run dev
    ```
### Update Code with Test Cases
- Structures
    ```
    my-api/
    │── prisma/
    │   ├── schema.prisma 
    │── src/
    │   ├── controllers/
    │   │   ├── authController.ts
    │   │   ├── exampleController.ts
    │   ├── middleware/
    │   │   ├── authMiddleware.ts
    │   │   ├── errorHandler.ts
    │   │   ├── rateLimiter.ts 
    │   │   ├── validateRequest.ts 
    │   ├── routes/
    │   │   ├── authRoutes.ts
    │   │   ├── index.ts
    │   ├── services/
    │   │   ├── authService.ts
    │   ├── utils/
    │   │   ├── jwt.ts
    │   │   ├── mail.ts
    │   ├── validators/
    │   │   ├── authSchemas.ts
    │   ├── tests/
    │   │   ├── auth.test.ts <--  
    │   ├── config.ts
    │   ├── server.ts
    │── tsconfig.json
    │── package.json
    │── jest.config.js <--
    │── .env
    │── .gitignore
    │── README.md
    ```

- Install Dependencies
    ```
    npm install --save-dev jest ts-jest @types/jest supertest @types/supertest
    ```

- package.json
    ```
    "scripts": {
        "test": "jest --config jest.config.js",
        "test:watch": "jest --watch"
    }
    ```

- src/tests/auth.test.ts: Create Test Cases for Authentication
- Run Tests
    ```
    npm test
    ```
### Build TypeScript Project
- Compile code
    ```
    npx tsc
    ```
- Structure
    ```
    my-api/
    │── dist/
    │   ├── ...
    ```


### Add POST Service
- Structures
    ```
    my-api/
    │── prisma/
    │   ├── schema.prisma 
    │── src/
    │   ├── controllers/
    │   │   ├── authController.ts
    │   │   ├── exampleController.ts
    │   │   ├── postController.ts <--
    │   ├── middleware/
    │   │   ├── authMiddleware.ts
    │   │   ├── errorHandler.ts
    │   │   ├── rateLimiter.ts 
    │   │   ├── validateRequest.ts 
    │   ├── routes/
    │   │   ├── authRoutes.ts
    │   │   ├── index.ts
    │   │   ├── postRoutes.ts <--
    │   ├── services/
    │   │   ├── authService.ts
    │   │   ├── postService.ts <--
    │   ├── utils/
    │   │   ├── jwt.ts
    │   │   ├── mail.ts
    │   ├── validators/
    │   │   ├── authSchemas.ts
    │   │   ├── postSchemas.ts <--
    │   ├── tests/
    │   │   ├── auth.test.ts  
    │   ├── config.ts
    │   ├── server.ts
    │── tsconfig.json
    │── package.json
    │── jest.config.js
    │── .env
    │── .gitignore
    │── README.md
    ```
    - src/validators/postSchemas.ts: Create schemas for Zod validation
    - src/services/postService.ts: Business Logic for create Post and get Posts 
    - src/controllers/postController.ts: Handles API Requests
    - src/routes/postRoutes.ts: Route with authMiddleware and rateLimiter
    - src/server.ts: Include postRoutes
    - prisma/schema.prisma: Add a Post model
    - Apply Changes using Prisma commands
    ```
    npx prisma migrate dev --name add_posts
    ```
    - src/tests/post.test.ts: Write test cases




### Reference
- https://chatgpt.com/share/67c74c76-1354-800c-89f6-352cb4c60500
- https://levelup.gitconnected.com/the-chatgpt-hack-top-1-developers-use-to-write-code-10x-faster-d1f32d3b3c52
