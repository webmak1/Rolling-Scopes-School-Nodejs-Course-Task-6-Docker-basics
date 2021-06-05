import { app } from './app';
import { config } from './common/config';

app.listen(config.PORT, () =>
  console.log(`App is running on http://localhost:${config.PORT}`)
);
