# Blog Platform - Complete Project Documentation

**Status**: Production Ready ✅  
**Last Updated**: April 15, 2026  
**Architecture**: Modular MVC (Model-View-Controller)  
**Tech Stack**: Next.js 14, React 18, TypeScript, MongoDB, Mongoose

---

## Table of Contents

1. [Quick Start](#quick-start)
2. [Project Overview](#project-overview)
3. [Architecture Pattern](#architecture-pattern)
4. [Directory Structure](#directory-structure)
5. [Module System](#module-system)
6. [API Endpoints](#api-endpoints)
7. [Adding New Features](#adding-new-features)
8. [Development Workflow](#development-workflow)
9. [Deployment](#deployment)
10. [Troubleshooting](#troubleshooting)

---

## Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- MongoDB (local, Docker, or Atlas)

### Installation

```bash
# Navigate to project
cd blog-nextjs

# Install dependencies
npm install

# Setup environment
cp .env.example .env.local

# Update .env.local with MongoDB URI
# MONGODB_URI=mongodb://localhost:27017/blogpost
# OR
# MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/blog

# Start dev server
npm run dev
```

### Access Points
- **Application**: http://localhost:3000
- **API**: http://localhost:3000/api/posts
- **Health Check**: http://localhost:3000/api/health

---

## Project Overview

### About This Project

Blog Platform is a full-stack web application for creating, reading, updating, and deleting blog posts with comment functionality. It demonstrates industry best practices for:
- Clean MVC architecture
- Modular design patterns
- Type-safe development with TypeScript
- RESTful API design
- Error handling and validation

### Key Features

✅ Full-Stack Application (Frontend + Backend)  
✅ RESTful API with CRUD operations  
✅ MongoDB for persistent storage  
✅ Type-Safe TypeScript throughout  
✅ Modular architecture for scalability  
✅ Real-time validation  
✅ Responsive React UI  
✅ Nested comment support  
✅ Error handling with standardized responses  
✅ Docker support for containerization  

### Technology Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, TypeScript, SCSS Modules |
| Framework | Next.js 14 (App Router) |
| Backend | Node.js with Express routing |
| Database | MongoDB with Mongoose ODM |
| Styling | SCSS with CSS Modules |
| Testing | Jest (configured) |
| Containerization | Docker & Docker Compose |

---

## Architecture Pattern

### MVC Concept

The application follows the Model-View-Controller pattern with clear separation of concerns:

```
┌─────────────────────────────────────────┐
│         User Interface (React)           │
│    Components, Forms, Post Lists         │
└────────────────┬──────────────────────────┘
                 │ HTTP Requests/Responses
                 ▼
┌─────────────────────────────────────────┐
│         Controllers                      │
│    Request Handlers, Route Logic         │
└────────┬──────────────────────┬──────────┘
         │                      │
    Service Calls        HTTP Status Codes
         │                      │
         ▼                      │
┌─────────────────────────────────────────┐
│         Services                         │
│    Business Logic, DB Operations         │
└────────────────┬──────────────────────────┘
                 │ Database Queries
                 ▼
┌─────────────────────────────────────────┐
│         Models                           │
│    Mongoose Schemas, Validation          │
└────────────────┬──────────────────────────┘
                 │
                 ▼
          MongoDB Database
```

### Data Flow

1. User clicks button in React component
2. Component calls API via custom hook (`usePosts`)
3. Request hits Next.js API route (`app/api/posts/route.ts`)
4. Route handler calls Controller method
5. Controller validates input and calls Service
6. Service retrieves/processes data via Model
7. Model interacts with MongoDB
8. Response flows back through layers
9. Component updates with new data

---

## Directory Structure

### Root Level Files

```
blog-nextjs/
├── PROJECT.md                 ← This file
├── package.json               ← Dependencies and scripts
├── tsconfig.json              ← TypeScript configuration
├── next.config.js             ← Next.js configuration
├── jest.config.js             ← Jest testing setup
├── jest.setup.js              ← Jest test utilities
├── Dockerfile                 ← Docker image definition
├── docker-compose.yml         ← Local Docker setup
├── .env.example               ← Environment variables template
├── .gitignore                 ← Git ignore rules
└── .next/                     ← Build output (generated)
```

### App Directory (`app/`)

**Purpose**: Next.js App Router - Contains pages and API routes

```
app/
├── layout.tsx                 ← Root layout component
├── page.tsx                   ← Home page component
├── globals.scss               ← Global styles
├── api-docs/                  ← (Deprecated - Swagger removed)
└── api/
    ├── posts/
    │   ├── route.ts          ← GET /api/posts, POST /api/posts
    │   ├── [id]/
    │   │   ├── route.ts      ← GET/PUT/DELETE /api/posts/:id
    │   │   └── comments/
    │   │       └── route.ts  ← POST /api/posts/:id/comments
    └── health/
        └── route.ts           ← GET /api/health
```

### Source Directory (`src/`)

**Purpose**: Application source code - Models, Services, Controllers, Components

```
src/
├── modules/                   ← MODULAR ARCHITECTURE (NEW)
│   ├── posts/
│   │   ├── types/
│   │   │   └── index.ts      ← Interfaces: IPost, ICreatePostRequest, etc.
│   │   ├── models/
│   │   │   └── Post.ts       ← Mongoose schema definition
│   │   ├── services/
│   │   │   └── PostService.ts ← Business logic layer
│   │   └── controllers/
│   │       └── PostController.ts ← HTTP request handlers
│   │
│   ├── comments/
│   │   ├── types/
│   │   │   └── index.ts      ← IComment, ICreateCommentRequest
│   │   ├── services/
│   │   │   └── CommentService.ts
│   │   └── controllers/
│   │       └── CommentController.ts
│   │
│   └── health/
│       └── controllers/
│           └── HealthController.ts
│
├── lib/                       ← Shared infrastructure
│   ├── config/
│   │   ├── database.ts        ← MongoDB connection & caching
│   │   └── swagger.ts         ← (Deprecated)
│   └── utils/
│       └── apiUtils.ts        ← Error handling, response formatting
│
├── components/                ← React UI components
│   ├── BlogApp.tsx            ← Main container component
│   ├── BlogApp.module.scss    ← Component styles
│   ├── PostList.tsx           ← Display all posts
│   ├── PostList.module.scss
│   ├── PostForm.tsx           ← Create/edit post form
│   ├── PostForm.module.scss
│   ├── CommentSection.tsx     ← Add/display comments
│   └── CommentSection.module.scss
│
└── hooks/                     ← Custom React hooks
    └── usePosts.ts            ← API communication hook
```

### Other Directories

```
public/                        ← Static files (images, fonts, etc.)
__tests__/                     ← Test files and examples
```

---

## Module System

### What is a Module?

A module is a self-contained, reusable feature that follows the MVC pattern. Each module encapsulates a specific business domain (Posts, Comments, Health, etc.) with all necessary code.

### Module Structure Pattern

Every module follows this consistent 4-layer structure:

```
src/modules/[moduleName]/
├── types/
│   └── index.ts              ← 1️⃣ DATA CONTRACTS
├── models/
│   └── [Module].ts           ← 2️⃣ DATABASE LAYER
├── services/
│   └── [Module]Service.ts    ← 3️⃣ BUSINESS LOGIC LAYER
└── controllers/
    └── [Module]Controller.ts ← 4️⃣ HTTP LAYER
```

### Layer Responsibilities

#### 1. Types (`types/index.ts`)
- Define TypeScript interfaces
- Data contracts and request body schemas
- Shared type definitions

```typescript
export interface IPost {
  _id?: string;
  title: string;
  author: string;
  category: 'tech' | 'finance' | 'lifestyle';
  body: string;
  comments: IComment[];
  createdAt: Date;
  updatedAt: Date;
}
```

#### 2. Models (`models/`)
- Mongoose schema definitions
- Database structure and validation rules
- Pre/post operation hooks

```typescript
const PostSchema = new Schema<IPost>({
  title: {
    type: String,
    required: [true, 'Title is required'],
    minlength: [5, 'Title must be at least 5 characters'],
  },
  // ... other fields
});
```

#### 3. Services (`services/`)
- Core business logic
- All database operations
- Data transformations and validation
- Reusable across multiple controllers

```typescript
class PostService {
  async getAllPosts(): Promise<IPost[]> {
    // Query logic
  }
  async createPost(data: ICreatePostRequest): Promise<IPost> {
    // Create logic
  }
  // ... other methods
}
```

#### 4. Controllers (`controllers/`)
- HTTP request handling
- Parameter validation
- Service orchestration
- Response formatting with proper HTTP status codes

```typescript
class PostController {
  async getAllPosts(req: NextRequest) {
    try {
      const posts = await PostService.getAllPosts();
      return successResponse(posts, 200);
    } catch (error) {
      return errorHandler(error);
    }
  }
  // ... other methods
}
```

### Current Modules

#### Posts Module (`src/modules/posts/`)
- **Purpose**: Blog post CRUD operations
- **Key Methods**: getAllPosts, getPostById, createPost, updatePost, deletePost, addComment

#### Comments Module (`src/modules/comments/`)
- **Purpose**: Comment management
- **Key Methods**: getCommentsByPostId, addCommentToPost, deleteCommentFromPost

#### Health Module (`src/modules/health/`)
- **Purpose**: System and database health monitoring
- **Key Methods**: check (returns status, database connection info)

---

## API Endpoints

### Base URL
```
http://localhost:3000/api
```

### Posts Endpoints

| Method | Endpoint | Status | Description |
|--------|----------|--------|-------------|
| GET | `/posts` | 200 | Get all posts sorted by updatedAt |
| POST | `/posts` | 201 | Create new post |
| GET | `/posts/:id` | 200/404 | Get single post by ID |
| PUT | `/posts/:id` | 200/404 | Update post (partial or full) |
| DELETE | `/posts/:id` | 200/404 | Delete post |
| POST | `/posts/:id/comments` | 201/404 | Add comment to post |

### Health Endpoint

| Method | Endpoint | Status | Description |
|--------|----------|--------|-------------|
| GET | `/health` | 200 | Check system and database health |

### Response Format

Success Response (200/201):
```json
{
  "success": true,
  "data": { /* resource data */ },
  "message": "Optional message",
  "timestamp": "2026-04-15T10:30:00Z"
}
```

Error Response (4xx/5xx):
```json
{
  "success": false,
  "error": "Error message",
  "status": 400,
  "timestamp": "2026-04-15T10:30:00Z"
}
```

---

## Adding New Features

### How to Create a New Module

Follow these steps to add a new feature (e.g., "Authors"):

#### Step 1: Create Folder Structure
```bash
mkdir -p src/modules/authors/{types,models,services,controllers}
```

#### Step 2: Create Types (`types/index.ts`)
```typescript
// src/modules/authors/types/index.ts
export interface IAuthor {
  _id?: string;
  name: string;
  email: string;
  bio?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICreateAuthorRequest {
  name: string;
  email: string;
  bio?: string;
}

export interface IUpdateAuthorRequest {
  name?: string;
  email?: string;
  bio?: string;
}
```

#### Step 3: Create Model (`models/Author.ts`)
```typescript
// src/modules/authors/models/Author.ts
import mongoose, { Schema } from 'mongoose';
import { IAuthor } from '../types';

const AuthorSchema = new Schema<IAuthor>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      minlength: [3, 'Name must be at least 3 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Valid email required'],
    },
    bio: { type: String, maxlength: [500, 'Bio must be at most 500 characters'] },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { collection: 'authors' }
);

AuthorSchema.pre('save', function (next) {
  this.updatedAt = new Date();
  next();
});

export default mongoose.models.Author || mongoose.model<IAuthor>('Author', AuthorSchema);
```

#### Step 4: Create Service (`services/AuthorService.ts`)
```typescript
// src/modules/authors/services/AuthorService.ts
import Author from '../models/Author';
import { IAuthor, ICreateAuthorRequest, IUpdateAuthorRequest } from '../types';
import { connectDB } from '@/lib/config/database';

class AuthorService {
  async getAll(): Promise<IAuthor[]> {
    await connectDB();
    return await Author.find().sort({ updatedAt: -1 }).exec();
  }

  async getById(id: string): Promise<IAuthor | null> {
    await connectDB();
    return await Author.findById(id).exec();
  }

  async create(data: ICreateAuthorRequest): Promise<IAuthor> {
    await connectDB();
    const author = new Author(data);
    return await author.save();
  }

  async update(id: string, data: IUpdateAuthorRequest): Promise<IAuthor | null> {
    await connectDB();
    return await Author.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async delete(id: string): Promise<IAuthor | null> {
    await connectDB();
    return await Author.findByIdAndDelete(id).exec();
  }
}

export default new AuthorService();
```

#### Step 5: Create Controller (`controllers/AuthorController.ts`)
```typescript
// src/modules/authors/controllers/AuthorController.ts
import { NextRequest } from 'next/server';
import AuthorService from '../services/AuthorService';
import { ApiError, successResponse, errorHandler } from '@/lib/utils/apiUtils';
import { ICreateAuthorRequest, IUpdateAuthorRequest } from '../types';

class AuthorController {
  async getAll(req: NextRequest) {
    try {
      const authors = await AuthorService.getAll();
      return successResponse(authors);
    } catch (error) {
      return errorHandler(error);
    }
  }

  async getById(req: NextRequest, { params }: { params: { id: string } }) {
    try {
      const { id } = params;
      const author = await AuthorService.getById(id);
      if (!author) throw new ApiError(404, 'Author not found');
      return successResponse(author);
    } catch (error) {
      return errorHandler(error);
    }
  }

  async create(req: NextRequest) {
    try {
      const body: ICreateAuthorRequest = await req.json();
      if (!body.name || !body.email) {
        throw new ApiError(400, 'Missing required fields: name, email');
      }
      const author = await AuthorService.create(body);
      return successResponse(author, 201);
    } catch (error) {
      return errorHandler(error);
    }
  }

  async update(req: NextRequest, { params }: { params: { id: string } }) {
    try {
      const { id } = params;
      const body: IUpdateAuthorRequest = await req.json();
      const author = await AuthorService.update(id, body);
      if (!author) throw new ApiError(404, 'Author not found');
      return successResponse(author);
    } catch (error) {
      return errorHandler(error);
    }
  }

  async delete(req: NextRequest, { params }: { params: { id: string } }) {
    try {
      const { id } = params;
      const author = await AuthorService.delete(id);
      if (!author) throw new ApiError(404, 'Author not found');
      return successResponse({ message: 'Author deleted', author });
    } catch (error) {
      return errorHandler(error);
    }
  }
}

export default new AuthorController();
```

#### Step 6: Create API Route (`app/api/authors/route.ts`)
```typescript
// app/api/authors/route.ts
import { NextRequest, NextResponse } from 'next/server';
import AuthorController from '@/modules/authors/controllers/AuthorController';

export async function GET(req: NextRequest) {
  return AuthorController.getAll(req);
}

export async function POST(req: NextRequest) {
  return AuthorController.create(req);
}
```

#### Step 7: Create Nested Routes (Optional)
```typescript
// app/api/authors/[id]/route.ts
import { NextRequest } from 'next/server';
import AuthorController from '@/modules/authors/controllers/AuthorController';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  return AuthorController.getById(req, { params });
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  return AuthorController.update(req, { params });
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  return AuthorController.delete(req, { params });
}
```

#### Step 8: Create React Hook (Optional)
```typescript
// src/hooks/useAuthors.ts
import { useState, useEffect } from 'react';

export function useAuthors() {
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAuthors = async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/authors');
        const { data } = await res.json();
        setAuthors(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAuthors();
  }, []);

  return { authors, loading, error };
}
```

#### Step 9: Create React Component (Optional)
```typescript
// src/components/AuthorList.tsx
'use client';
import { useAuthors } from '@/hooks/useAuthors';
import styles from './AuthorList.module.scss';

export function AuthorList() {
  const { authors, loading, error } = useAuthors();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading authors</div>;

  return (
    <div className={styles.container}>
      {authors.map((author) => (
        <div key={author._id} className={styles.card}>
          <h3>{author.name}</h3>
          <p>{author.email}</p>
        </div>
      ))}
    </div>
  );
}
```

---

## Development Workflow

### Common Tasks

#### Create a Blog Post
1. Visit http://localhost:3000
2. Fill the form on the right:
   - Title: minimum 5 characters
   - Author: minimum 3 characters
   - Category: tech, finance, or lifestyle
   - Body: minimum 50 characters
3. Click "Create Post"
4. Post appears in left sidebar

#### Add a Comment
1. Select a post from the left sidebar
2. Scroll to comments section
3. Enter commenter name and comment text
4. Click "Add Comment"

#### Update a Post
1. Select post from sidebar
2. Modify form fields
3. Click "Update" button
4. Post updates and returns to list

#### Delete a Post
1. Select post from sidebar
2. Click "Delete Post" button
3. Post removed from list and database

### Terminal Commands

```bash
# Development
npm run dev              # Start dev server on port 3000
npm run build            # Build for production
npm start                # Run production build

# Testing
npm test                 # Run tests once
npm run test:watch       # Run tests in watch mode

# Code Quality
npm run lint             # Run ESLint
npm run type-check       # Run TypeScript type checking

# Docker
docker-compose up        # Start with MongoDB
docker-compose down      # Stop services
```

---

## Deployment

### Prerequisites for Deployment
- MongoDB connection string (Atlas or self-hosted)
- Node.js 18+ runtime
- Git repository

### Deploy to Vercel

```bash
# Push to GitHub
git add .
git commit -m "Ready for deployment"
git push origin main

# Connect to Vercel
# 1. Go to https://vercel.com
# 2. Click "Import Project"
# 3. Select your GitHub repository
# 4. Add environment variables:
#    - MONGODB_URI: your MongoDB connection string
# 5. Deploy
```

### Deploy to Heroku

```bash
# Install Heroku CLI and login
heroku login

# Create app
heroku create your-app-name

# Set environment variables
heroku config:set MONGODB_URI=your_mongodb_uri

# Push to Heroku
git push heroku main

# View logs
heroku logs --tail
```

### Deploy to AWS EC2

1. Launch EC2 instance (Ubuntu 22.04)
2. Install Node.js and MongoDB
3. Clone repository
4. Run `npm install && npm build`
5. Use PM2 for process management: `pm2 start npm -- start`

### Environment Variables Required

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/blog
NODE_ENV=production
```

---

## Troubleshooting

### Common Issues and Solutions

#### Issue: MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solutions**:
- Check if MongoDB is running: `mongod --version`
- Use Docker: `docker-compose up -d`
- Use MongoDB Atlas with connection string in `.env.local`

#### Issue: Port 3000 Already in Use
```
Error: listen EADDRINUSE :::3000
```
**Solutions**:
```bash
# Find process using port 3000
lsof -i :3000          # macOS/Linux
netstat -ano | findstr :3000  # Windows

# Kill process
kill -9 <PID>          # macOS/Linux
taskkill /PID <PID> /F  # Windows

# Or use different port
PORT=3001 npm run dev
```

#### Issue: TypeScript Errors
**Solution**:
```bash
# Clear cache and rebuild
rm -rf .next node_modules
npm install
npm run dev
```

#### Issue: Dependency Issues
**Solution**:
```bash
# Clear cache
npm cache clean --force

# Reinstall
rm -rf node_modules package-lock.json
npm install
```

#### Issue: Environment Variables Not Loading
**Solution**:
- Ensure `.env.local` file exists in root directory
- Restart dev server after changing `.env.local`
- Use correct variable names: `MONGODB_URI`

### Debug Mode

To enable verbose logging:

```bash
DEBUG=* npm run dev
```

### Getting Help

1. Check error messages in terminal
2. Review API response in Network tab (DevTools)
3. Check MongoDB data in MongoDB Atlas dashboard
4. Look at Git history: `git log --oneline`

---

## Summary

### Key Takeaways

- ✅ **Modular Architecture**: Each feature is self-contained and reusable
- ✅ **Four-Layer Pattern**: Types → Models → Services → Controllers
- ✅ **Type Safety**: Full TypeScript support throughout
- ✅ **Scalability**: Add new modules without affecting existing code
- ✅ **Best Practices**: Follows industry standards for MVC applications
- ✅ **Production Ready**: Tested, documented, and deployment-ready

### Quick Links

- API Documentation: `http://localhost:3000/api/posts`
- Health Check: `http://localhost:3000/api/health`
- Frontend: `http://localhost:3000`
- Package.json: Project dependencies
- tsconfig.json: TypeScript configuration

### Contact & Support

For issues, refer to the troubleshooting section or check terminal output for detailed error messages.

---

**Built with ❤️ using Next.js, React, and MongoDB**
