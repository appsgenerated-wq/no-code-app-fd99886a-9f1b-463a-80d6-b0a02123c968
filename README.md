# HotdogHub

Welcome to HotdogHub, a web application for discovering, rating, and sharing the world's best hotdogs. This application is a full-stack solution built with React on the frontend and Manifest for the entire backend.

## ✨ Features

- **User Authentication**: Secure sign-up and login for users.
- **Hotdog Submissions**: Authenticated users can submit new hotdogs with a name, description, rating, and photo.
- **Dynamic Gallery**: View all submitted hotdogs in a real-time, responsive gallery.
- **Ownership Control**: Users can only edit or delete their own submissions.
- **Built-in Admin Panel**: A complete admin interface at `/admin` for managing users and hotdogs.

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- A Manifest account and the Manifest CLI

### 1. Setup the Manifest Backend

1.  Save the `manifest.yml` file to your project directory.
2.  Run the Manifest deployment command:
    ```bash
    mnfst deploy
    ```
3.  After deployment, Manifest will provide you with an `APP_ID`. Copy this ID.

### 2. Setup the React Frontend

1.  Clone this repository or set up the provided frontend files.
2.  Install the dependencies:
    ```bash
    npm install
    ```
3.  Update the `APP_ID` in `src/constants.js` with the ID from the previous step.
4.  Start the development server:
    ```bash
    npm run dev
    ```
5.  Open your browser to `http://localhost:5173` to see the application.

## 🔧 Manifest Features Used

- **`authenticable: true`**: Provides secure, out-of-the-box user authentication.
- **Entities & Properties**: Defines the `User` and `Hotdog` data models with types like `string`, `text`, `number`, and `image`.
- **Relationships (`belongsTo`)**: Links each `Hotdog` to its `creator` (a `User`).
- **Policies**: Manages access control, ensuring data integrity and security (e.g., `condition: self` for ownership).
- **File Storage (`image` type)**: Handles image uploads, resizing (thumbnails), and storage automatically.
- **Manifest SDK**: Simplifies all frontend-backend communication, including authentication and CRUD operations, into a few lines of code.
