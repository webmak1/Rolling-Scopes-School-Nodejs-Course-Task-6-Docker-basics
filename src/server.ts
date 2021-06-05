import { app } from './app';
import { config } from './common/config';

app.listen(config.PORT, () => {
  if (config.PORT) {
    console.log(`App is running on http://localhost:${config.PORT}`);
  } else {
    console.log(`App is running on http://localhost`);
  }
});
