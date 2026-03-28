
# SocialMediaApp

SocialMediaApp is a modern social media platform built with Angular. It allows users to register, log in, create posts, interact with others, manage profiles, and receive notifications. The project demonstrates a modular, scalable architecture using Angular best practices.

## Features

- **Authentication**: User registration, login, logout, and password management (change/forget password).
- **Feed**: View a personalized feed, create new posts, like, comment, and share posts.
- **Profile**: View and edit user profile, see user posts, bookmarks, followers, and following.
- **Notifications**: Real-time notifications for likes, comments, follows, and more.
- **Friend Suggestions**: Discover and follow suggested users.
- **Responsive UI**: Clean, modern, and responsive design using Tailwind CSS and Flowbite.
- **Routing & Guards**: Protected routes for authenticated/guest users.
- **Error Handling**: Custom 404 Not Found page and robust error feedback.

## Project Structure

- `src/app/core/` – Core services, models, authentication, and guards
- `src/app/features/` – Feature modules: feed, profile, login, register, notifications, etc.
- `src/app/layouts/` – Main and auth layouts
- `src/app/shared/` – Shared UI components, directives, and pipes

## Technology Stack

- **Framework**: Angular 20+
- **Styling**: Tailwind CSS, Flowbite, FontAwesome
- **State & Forms**: Angular signals, Reactive Forms
- **HTTP**: Angular HttpClient
- **Testing**: Jasmine, Karma

## Getting Started

### Prerequisites
- Node.js & npm
- Angular CLI (`npm install -g @angular/cli`)

### Installation
1. Clone the repository:
	 ```bash
	 git clone https://github.com/your-username/socialMediaApp.git
	 cd socialMediaApp
	 ```
2. Install dependencies:
	 ```bash
	 npm install
	 ```

### Running the App
Start the development server:
```bash
ng serve
```
Visit [http://localhost:4200](http://localhost:4200) in your browser.

### Building for Production
```bash
ng build --configuration production
```
The build artifacts will be stored in the `dist/` directory.

### Running Tests
- **Unit tests:**
	```bash
	ng test
	```
- **End-to-end tests:**
	```bash
	ng e2e
	```

## API
This app uses a RESTful API for all backend operations (user, posts, notifications, etc.). Update API endpoints in the core services as needed.

## Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.


