import 'dotenv/config';
import app from '../src/app.js';
import env from '../src/config/env.js';
import { connectDB } from '../src/config/db.js';

connectDB().catch((err) => {
  console.error('Failed to connect to MongoDB:', err);
});

app.listen(env.PORT, () => {
  console.log(`Server running on port ${env.PORT}`);
});

export default app;
