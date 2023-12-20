import config from './app/config';

import mongoose from 'mongoose';


async function main() {
  try {
    await mongoose.connect(config.data_base_url as string);

    app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`);
    });
  } catch (error) {
    console.log('');
  }
}

main();
