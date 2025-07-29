# REST Express Application

## Overview

This is a full-stack web application built with React and Express.js that serves as a content management system for articles and subscriber management. The application features a modern dark theme blog-style frontend with an administrative interface for content management.

## User Preferences

Preferred communication style: Simple, everyday language.
Domain: Curioustube.com
Design inspiration: nav.al (Naval Ravikant's website)
Deployment target: Cloudflare Pages (free hosting)
Theme: Pure black background with white text for maximum readability

## System Architecture

The application follows a monorepo structure with clear separation between client and server code:

- **Frontend**: React with TypeScript using Vite as the build tool
- **Backend**: Express.js with TypeScript running in Node.js
- **Database**: PostgreSQL with Drizzle ORM for data management
- **UI Components**: Radix UI with shadcn/ui components and Tailwind CSS for styling

## Key Components

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite with development server integration
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query (React Query) for server state management
- **UI Library**: shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **Forms**: React Hook Form with Zod validation

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Database ORM**: Drizzle ORM with PostgreSQL
- **Validation**: Zod schemas for request validation
- **Storage**: In-memory storage implementation with interface for future database integration
- **Development**: Hot reload with Vite integration in development mode

### Database Schema
The application uses two main entities:
- **Articles**: Content pieces with title, preview, full content, publication status, and timestamps
- **Subscribers**: Email subscriptions with active status tracking

## Data Flow

1. **Article Management**: 
   - Admin interface allows CRUD operations on articles
   - Articles are validated using Zod schemas before storage
   - Public interface displays published articles with expandable content

2. **Subscription System**:
   - Users can subscribe via modal interface
   - Email validation and duplicate prevention
   - Admin can view and manage subscribers

3. **API Layer**:
   - RESTful endpoints for articles (`/api/articles`) and subscribers (`/api/subscribe`)
   - Express middleware for request logging and error handling
   - JSON responses with proper HTTP status codes

## External Dependencies

### Core Framework Dependencies
- **@neondatabase/serverless**: Database connection for Neon PostgreSQL
- **drizzle-orm** & **drizzle-kit**: Database ORM and migration tools
- **@tanstack/react-query**: Server state management
- **wouter**: Lightweight React routing

### UI and Styling
- **@radix-ui/***: Accessible UI primitives (dialog, dropdown, form components, etc.)
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Component variant management
- **lucide-react**: Icon library

### Development Tools
- **vite**: Build tool and development server
- **tsx**: TypeScript execution for Node.js
- **@replit/vite-plugin-runtime-error-modal**: Development error handling

## Deployment Strategy

The application is configured for multiple deployment scenarios:

### Development Mode
- Vite development server with HMR (Hot Module Replacement)
- Express server with middleware integration
- TypeScript compilation on-the-fly
- Replit development environment integration

### Production Build
- Vite builds the React application to `dist/public`
- esbuild compiles the Express server to `dist/index.js`
- Static file serving from the built React app
- Environment variable configuration for database connections

### Database Setup
- Drizzle migrations stored in `./migrations`
- Database schema defined in `shared/schema.ts`
- PostgreSQL connection via `DATABASE_URL` environment variable
- Migration commands via `db:push` script

The application is designed to work seamlessly in Replit's environment while maintaining compatibility with standard Node.js deployment platforms.

## Cloudflare Pages Deployment

The application includes deployment configuration for Cloudflare Pages:

### Build Configuration
- Custom build script (`build.js`) handles client and server bundling
- Generates static React app and serverless functions
- Creates `_routes.json` for proper API routing on Cloudflare
- Production-optimized bundle with external dependencies

### Deployment Files
- `wrangler.toml` - Cloudflare Workers configuration
- `_routes.json` - API routing configuration
- `CLOUDFLARE_DEPLOYMENT.md` - Step-by-step deployment guide
- `build.js` - Custom build script for static generation + serverless functions

### Email System
- Subscription collection via modal interface
- Admin dashboard for subscriber management
- Ready for integration with Resend, Mailgun, or SendGrid
- Unsubscribe functionality with dedicated endpoints