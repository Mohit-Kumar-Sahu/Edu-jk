
# EduPath Navigator PWA

EduPath Navigator is a comprehensive Progressive Web App designed to guide students through their educational and career journeys. It provides interactive tools and resources to help users discover career paths, find suitable colleges, manage applications, and more.

## Features

### Career Quiz
An interactive quiz that assesses users' interests, skills, and preferences to suggest suitable career paths. It uses a series of questions to provide personalized career recommendations.

### College Locator
A database-driven college search system integrated with MongoDB. Users can search for colleges based on location, courses offered, eligibility criteria, and other filters. Detailed information includes contact details, hostel availability, library facilities, and official websites.

### Scholarship Checker
A tool to discover and track scholarship opportunities. Users can search for scholarships based on their profile and track application statuses.

### Resume Builder
An AI-powered resume creation tool that helps users build professional resumes using customizable templates and intelligent suggestions.

### Application Tracker
A centralized system to track the status of college and scholarship applications, ensuring users stay organized throughout the application process.

### AI Career Chatbot
An intelligent conversational assistant that provides personalized career counseling, answers questions, and offers advice using natural language processing.

### Notification Center
A real-time notification system that alerts users about important deadlines, application updates, new opportunities, and other relevant information.

### Profile Management
User account management system for storing preferences, personal information, and application history for a personalized experience.

## Tech Stack

- **Frontend**: React with Vite for fast development and building.
- **Backend**: Hono framework for API server.
- **Database**: MongoDB for storing college data.
- **Styling**: Tailwind CSS with Radix UI components.
- **State Management**: React hooks and context.

## Setup and Installation

1. Clone the repository.
2. Install dependencies: `npm install`
3. Set up MongoDB database (local or Atlas) with the EDU2CAREER database and EDU2CAREER_DB collection.
4. Start the backend API server: `npm run api`
5. Start the frontend development server: `npm run dev`
6. Access the app at `http://localhost:5173`

## Project Structure

- `src/`: Frontend React application
  - `features/`: Feature-based component organization
  - `api/`: Backend API server files
- `requirements.md`: Project requirements
- `user-guide.md`: User guide for the application

## Contributing

Contributions are welcome. Please follow the standard Git workflow and ensure all tests pass.

## License

This project is licensed under the MIT License.
  