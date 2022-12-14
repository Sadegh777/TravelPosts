const db = require('../config/connection');
const { User, Memory } = require('../models');
const userSeeds = require('./userSeeds.json');
const memorySeeds = require('./memorySeeds.json');

db.once('open', async () => {
  try {
    await Memory.deleteMany({});
    await User.deleteMany({});

    await User.create(userSeeds);

    for (let i = 0; i < memorySeeds.length; i++) {
      const { _id, memoryAuthor } = await Memory.create(memorySeeds[i]);
      const user = await User.findOneAndUpdate(
        { username: memoryAuthor },
        {
          $addToSet: {
            memories: _id,
          },
        }
      );
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('seeded');
  process.exit(0);
});
