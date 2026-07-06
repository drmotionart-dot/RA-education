import 'dotenv/config';
import app from '../src/app.js';
import env from '../src/config/env.js';

app.listen(env.PORT, () => {
  console.log(`Server running on port ${env.PORT}`);
});

export default app;
