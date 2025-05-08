<h1>🌦️ Weather App — Built with Next.js 15, Tailwind CSS & Redux</h1>

<p>
  This is a modern weather application built using
  <a href="https://nextjs.org/" target="_blank">Next.js</a> 15+ (with App Router), styled with Tailwind CSS, and powered by Redux for state management.
  It integrates with external weather APIs and supports caching via Upstash Redis.
</p>

<h2>🚀 Features</h2>
<ul>
  <li>🔍 Search for weather by city name</li>
  <li>🧠 Redux Toolkit for global state management</li>
  <li>🎨 Tailwind CSS 4 for responsive styling</li>
  <li>🗃️ Upstash Redis caching for faster responses</li>
  <li>💨 Framer Motion animations</li>
  <li>🌐 Deploy-ready for <a href="https://www.netlify.com/" target="_blank">Netlify</a> or <a href="https://vercel.com/" target="_blank">Vercel</a></li>
  <li>📦 Optimized with Turbopack for development</li>
</ul>

<h2>🧑‍💻 Getting Started</h2>

<h3>1. Install dependencies</h3>
<pre><code>npm install
# or
yarn install</code></pre>

<h3>2. Run the development server</h3>
<pre><code>npm run dev
# or
yarn dev</code></pre>

<p>
  Open <a href="http://localhost:3000" target="_blank">http://localhost:3000</a> in your browser to view the app.
</p>

<h3>3. Build for production</h3>
<pre><code>npm run build
npm start</code></pre>

<h2>🧱 Tech Stack</h2>
<ul>
  <li><strong>Framework</strong>: <a href="https://nextjs.org/">Next.js 15</a></li>
  <li><strong>Styling</strong>: <a href="https://tailwindcss.com/">Tailwind CSS 4</a></li>
  <li><strong>State Management</strong>: <a href="https://redux-toolkit.js.org/">Redux Toolkit</a></li>
  <li><strong>API</strong>: <a href="https://axios-http.com/">Axios</a></li>
  <li><strong>Icons</strong>: <a href="https://lucide.dev/">Lucide</a>, <a href="https://react-icons.github.io/react-icons/">React Icons</a></li>
  <li><strong>Animations</strong>: <a href="https://www.framer.com/motion/">Framer Motion</a></li>
  <li><strong>Caching</strong>: <a href="https://upstash.com/redis">Upstash Redis</a></li>
  <li><strong>Deployment</strong>: Netlify / Vercel</li>
</ul>

<h2>🌍 Environment Variables</h2>
<p>Create a <code>.env.local</code> file at the root of your project and add:</p>
<pre><code>WEATHER_API_KEY=your_openweather_key
REDIS_REST_URL=your_upstash_url
REDIS_REST_TOKEN=your_upstash_token</code></pre>

<h2>☁️ Deployment on Netlify</h2>
<ol>
  <li>Ensure <code>@netlify/plugin-nextjs</code> is listed in your dependencies.</li>
  <li>Create a <code>netlify.toml</code> file:</li>
</ol>

<pre><code>[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
</code></pre>

<ol start="3">
  <li>Push your code to GitHub and connect your repo to Netlify.</li>
  <li>Add environment variables in the Netlify dashboard.</li>
  <li>Click <strong>Deploy Site</strong>.</li>
</ol>

<h2>📚 Resources</h2>
<ul>
  <li><a href="https://nextjs.org/docs">Next.js Documentation</a></li>
  <li><a href="https://tailwindcss.com/docs">Tailwind CSS Docs</a></li>
  <li><a href="https://redux-toolkit.js.org/">Redux Toolkit</a></li>
  <li><a href="https://upstash.com/docs">Upstash Redis</a></li>
</ul>

<h2>🤝 Contributing</h2>
<p>
  Pull requests and feedback are welcome! For major changes, please open an issue first to discuss what you'd like to change.
</p>

<hr />

<p>Made with ❤️ by <strong>Your Name</strong></p>
