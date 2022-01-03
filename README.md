# Social Diary

> The mission: *Provides helpful tools and reminders of keeping in touch with your loved ones.*

## Project details

Social Diary is an app that allows you to keep safe logs of discussions with people that are important in your life.

See what Social Diary is about in the [presentation video](https://www.youtube.com/watch?v=U3mrwpsgh-Q).

### Problem statement

Sometimes life takes us travelling frequently, staying away from our closed ones for long periods or time, or simply makes us grow out of touch.
With 2020 and 2021 especially, it is more important than ever to employ some new tactics, or the new situation will become the new norm:
- less human contact, impacting mental and physical health measurably
- a more frequent feeling of loneliness, exacerbated by lockdowns here and there
- more easily feel 'out-of-touch'

### How Social Diary helps

If you're looking to **strengthen or maintain the bonds** you've created or you're looking to **improve your relationships** with your closed ones, Social Diary helps you do that in a _structured_ way.

By adding contacts, then classifying them by category or priority/frequency, you **keep track** of who you should reach out to, if you haven't reached out in the allotted interval. This means that you'll keep an open channel of communication, allowing you both to more easily have meaningful conversations and, overall, relationships.

## Implementation Details

### Tech stack
  - **TypeScript** as the language of choice. Typescript enables me to write better, more stable code for production and it also enables me to have a much better developer experience, with the helpful IDE tips.
  - **Next.js** for the full-stack framework possibility. I knew it would eventuall allow me the necessary flexibility in choosing the right solutions to get to the end product.
  - **Supabase** for data storage and management. I wanted to learn about this Firebase backend alternatives built on top of SQL. I found Supabase very intriguing and the flow has been great so far.
  - **Tailwind CSS** and **daisyUI**:  I chose **Tailwind** because I wanted to learn, to build something meaninfgul with it, to see what it's like building websites with a utility-first CSS framework. What I like the most is that it gives you freedom to create your own UI and customize it to build something original, comparing to Bootstrap which gives you the classes for pre-styled components that you'd want to use, and customizing these might take some time. What I didn't like was how hard it seemed to make debugging CSS itself. As for **daisyUI**, I made an early choice not to create full components from scratch, and instead focus on functionality and layouts;
  - **ESLint** for _static code_ analysis
  - **Prettier** - formatted code

### Folder structure
  - public - folder used by Next.js to statically serve files like the favicon.ico, SVG files, etc.
  - src - the folder where the application actually lives
    - components - contains all the elements, layouts and UI building blocks
    - lib - folders and files for utilities and React Context API (used for state management - it enables you to store global variables and pass them around as needed, instead of dealing with the concept of "prop-drilling" 
    - pages - contains the pages of the application; each file automatically matches a route
    - styles - an addition to the styling that's being applied using Tailwind CSS and daisyUI
    - types - a folder with general types

### Future updates

The application, at this point, is a Minimum Viable Product, that can be extended with numerous features, such as:
  -  **multiple sign-up/login options** - for example, if you would choose to login with Facebook, you should have the option to import contacts and automatically populate a category. 
  -  **filtering** - each page (categories, priorities, etc.), should have filters that allow you to better use the app.
  -  **contact avatars** - upload or import a photo of your contacts to more readily identify them in lists.

And lastly, there's a lot to improve in terms of code readability and efficiency.

## Demo

1. Clone the repository and checkout main:

```
$ git clone https://github.com/disi1/social-diary.git
$ cd social-diary
$ git checkout main
```

1. This project uses an Authentication system with [Supabase](https://supabase.com/).
  - Register/login with Github at https://app.supabase.io/api/login.
  - Create a Supabase project.
  - Copy the generated URL and the public anon keys.
  - Open the project and add them the to the .env.local file at the root of the project like this:

    ```
    NEXT_PUBLIC_SUPABASE_URL=https://<project-name>.supabase.co
    NEXT_PUBLIC_SUPABASE_KEY=<project-access-key-from-supabase>
    ```

3. Run `npm install` or `yarn install` to install the dependencies.
4. Run the development server:

    ```bash
    npm run dev
    # or
    yarn dev
    ```


Open [http://localhost:3000](http://localhost:3000) with your browser to interact with the app.

## Contact
Reach out at [diana.sica29@gmail.com](mailto:diana.sica29@gmail.com) for questions or concerns
