# Personal Portfolio & AI Chatbot

This is the repository for my personal portfolio website, which includes a sophisticated AI-powered chatbot. The portfolio showcases my projects, skills, and experience, while the chatbot provides an interactive way for visitors to learn more about me.

## Features

*   **Sleek & Responsive Design:** The portfolio is built with Next.js and Tailwind CSS, providing a modern and responsive user experience across all devices.
*   **Dynamic Content:** Project and skill information is served from a simple JSON-based backend, making it easy to update.
*   **Interactive AI Chatbot:** The chatbot, powered by Google's Generative AI, can answer questions about my profile, projects, and skills. It features multiple personas, including:
    *   **Professional (Default):** A general-purpose assistant.
    *   **Recruiter Mode:** Focuses on my professional value and project impact.
    *   **Tech Mentor:** Provides in-depth explanations of the technical aspects of my projects.
    *   **Developer Mode:** Engages in technical discussions.
    *   **Resume Reviewer:** Offers feedback on resumes.
*   **Contact Form:** A functional contact form allows visitors to get in touch.

## Tech Stack

### Frontend

*   **Framework:** [Next.js](https://nextjs.org/) (React)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
*   **UI/Animation:** [Framer Motion](https://www.framer.com/motion/), [Lucide React](https://lucide.dev/guide/packages/lucide-react) (icons)
*   **Language:** [TypeScript](https://www.typescriptlang.org/)

### Backend

*   **Framework:** [Node.js](https://nodejs.org/) with [Express](https://expressjs.com/)
*   **AI:** [@google/genai](https://www.npmjs.com/package/@google/genai)
*   **Middleware:** [CORS](https://www.npmjs.com/package/cors)

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

*   Node.js and npm (or yarn) installed.
*   A Google AI API key.

### Installation

1.  **Clone the repo:**
    ```sh
    git clone https://github.com/your-username/your-repo-name.git
    cd your-repo-name
    ```

2.  **Install frontend dependencies:**
    ```sh
    cd frontend
    npm install
    ```

3.  **Install backend dependencies:**
    ```sh
    cd ../backend
    npm install
    ```

4.  **Configure environment variables:**

    *   In the `backend` directory, create a `.env` file and add your Google AI API key:
        ```
        API_KEY=your_google_ai_api_key
        ```

    *   In the `frontend` directory, create a `.env.local` file and add the backend API URL:
        ```
        NEXT_PUBLIC_API_URL=http://localhost:5000
        ```

### Running the Application

1.  **Start the backend server:**
    ```sh
    cd backend
    npm start
    ```

2.  **Start the frontend development server:**
    ```sh
    cd ../frontend
    npm run dev
    ```

The frontend will be available at `http://localhost:3000`, and the backend will be running on `http://localhost:5000`.

## Project Structure

The repository is divided into two main parts: `frontend` and `backend`.

```
.
├── backend/
│   ├── controllers/    # API logic
│   ├── data/           # JSON data files
│   ├── routes/         # API routes
│   └── server.js       # Express server setup
└── frontend/
    ├── app/            # Next.js 13 app router
    ├── components/     # React components
    ├── public/         # Static assets
    └── ...
```

## API Endpoints

The backend exposes the following API endpoints:

*   `GET /api/projects`: Returns a list of projects.
*   `GET /api/skills`: Returns a list of skills.
*   `GET /api/stats`: Returns website statistics.
*   `POST /api/contact`: Submits the contact form.
*   `POST /api/chat`: Interacts with the AI chatbot.

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

Your Name - [@your_twitter](https://twitter.com/your_twitter) - your.email@example.com

Project Link: [https://github.com/your-username/your-repo-name](https://github.com/your-username/your-repo-name)