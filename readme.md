# Improvements

❌ Mistakes I Made
1. Hardcoded Port
app.listen(3400, ...)

👉 Problem: Not flexible, breaks in deployment

2. Not Using Environment Variables

👉 I directly used port instead of:

const PORT = process.env.PORT || 3400;
3. Missing Middleware

👉 I didn’t add:

app.use(express.json());

👉 Impact: POST/PUT requests won’t parse JSON body

4. Incorrect Use of PORT Variable
app.listen(3400, () => {
  console.log(`server is running on ${PORT}`);
});

👉 Problem: PORT variable defined but not used in listen()

5. Confusion About Middleware Folder

👉 Thought all middleware must be in middlewares/

✅ Correct Understanding (Corporate Way)
✔ 1. Use Environment Variables Properly
const PORT = process.env.PORT || 3400;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
✔ 2. Built-in vs Custom Middleware
🔹 Built-in Middleware (Keep in server.js)
app.use(express.json());

👉 Reason: Global middleware used everywhere

🔹 Custom Middleware (Keep in middlewares/ folder)

Examples:

auth.middleware.js
error.middleware.js

👉 Reason: Reusable & modular logic

✔ 3. Keep server.js Clean

👉 server.js should only handle:

App initialization
Global middleware
Route mounting
Server start
✔ 4. Follow Separation of Concerns
Routes → define endpoints
Controllers → handle request/response
Services → business logic
Models → database schema
✔ 5. Write Meaningful Logs
console.log(`Server running on port ${PORT}`);

👉 Helps in debugging & monitoring

🧠 Final Learning
Never hardcode configs
Always think about scalability
Understand difference between built-in and custom middleware
Keep code modular and clean
Follow team conventions strictly