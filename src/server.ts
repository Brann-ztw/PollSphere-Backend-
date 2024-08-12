import { app } from './routers/index';
import { connectDb } from './config/database';
import { config } from './config/config';
const PORT = config.port;

connectDb()
.then((client) => {
  app.listen(PORT, () => console.log(`server up on ${PORT}`));
})
.catch((e) => {
  throw e;
});


