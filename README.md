![Web App Image](https://velog.velcdn.com/images/hmmhmmhm/post/ed53364d-6920-440a-9dd1-8d28a5ec4272/image.gif)

- Web Service [posts.run](https://posts.run)
- [하루 만에 혼자 3D 로 신년카드 웹앱을? - 항해+ 코육대 2회 회고](https://velog.io/@hmmhmmhm/하루만에-혼자-3D-로-신년카드-웹앱을-항해-코육대-2회-회고)

<br />

# New Year's Greeting Card Project 🎉

Welcome to the New Year's Greeting Card Project! This project allows users to create and send personalized greeting cards for the New Year, complete with custom messages and AI-generated images.

## Features

- **Greeting Message Creation**: Users can craft a New Year's greeting message following specific guidelines, such as character limits and line restrictions. The message creation is facilitated by an AI service, ensuring unique and festive content.
- **Image Customization**: The platform offers an image customization feature where users can select styles and colors for AI-generated images that will accompany their greeting message.
- **Card Publishing**: Once the message and images are set, users can publish their card and receive a unique URL to share their New Year's greeting with others.
- **Interactive UI**: The project boasts an interactive user interface, allowing users to engage with various elements like the postbox and the card itself.

## Tech Stack

- **React**: Functional components with hooks for building the user interface.
- **TypeScript**: For adding static type definitions to enhance code quality and maintainability.
- **Tailwind CSS**: For styling components with a utility-first CSS framework.
- **Next.js**: As the React framework for server-side rendering and generating static websites.
- **Konsta UI**: A set of React components for building the user interface with a native look and feel.
- **Valtio**: For state management across the application.
- **OpenAI**: To leverage AI models for generating text and images.

## Key Components

- `MessageForm`: Allows users to input their greeting message with validation for character and line limits.
- `ImageForm`: Provides options for users to select AI image styles and colors, and to upload or generate images.
- `ModifyModalNavbar`: Navigation bar for the card modification modal, including options to cancel or complete the card creation process.
- `PublishWelcomeDialog`: A dialog that appears upon successful card creation, prompting users to share their card.

## API Endpoints

- `/api/new-year/create-message`: Generates a New Year's greeting message using OpenAI's GPT model.
- `/api/new-year/create-image`: Creates a New Year-themed image based on user-selected styles and colors using OpenAI's DALL-E model.
- `/api/new-year/publish-card`: Publishes the card and returns a unique URL for sharing.

## Configuration Instructions for `.env.local`

To set up your local environment for the New Year's Greeting Card Project, you'll need to create a `.env.local` file in the root of your project. This file will contain all the necessary environment variables required for the project to run correctly.

Here's a template for your `.env.local` file:

```bash
# OpenAI API Key
# Used for AI-generated text and images
OPENAI_API_KEY=your_openai_api_key_here

# Static URL
# Base URL for where your static assets are hosted
STATIC_URL=your_static_assets_url_here

# Cloudflare Account Details
# Used for Cloudflare integration
CLOUDFLARE_ACCOUNT_ID=your_cloudflare_account_id_here
R2_ACCESS_KEY_ID=your_r2_access_key_id_here
R2_SECRET_ACCESS_KEY=your_r2_secret_access_key_here
R2_BUCKET_NAME=your_r2_bucket_name_here

# Supabase Configuration
# Used for database and backend services
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here

# Shuffle Private Key
# Used for shuffling or randomizing operations
SHUFFLE_PRIVATE_KEY=your_shuffle_private_key_here
```

Replace the placeholder values (e.g., `your_openai_api_key_here`) with your actual configuration values. Do not share your actual keys publicly or commit them to your version control system.

Important: The `.env.local` file should never be committed to your repository, especially if it contains sensitive information. Make sure to add `.env.local` to your `.gitignore` file to prevent it from being tracked by Git.

## Getting Started

To run the project locally:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  }
}
```

Install dependencies and start the development server:

```
npm install
npm run dev
```

## Contributing

Contributions are welcome! Please read the project's contribution guidelines before submitting pull requests.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

Happy New Year, and happy coding! 🚀🎆
