const { v4: uuidv4 } = require("uuid");
const { createClient } = require("@vercel/postgres");
//const { User } = require("@/lib/definitions");
//const users = require("../src/app/lib/placeholder.js");
const bcrypt = require("bcryptjs");


async function seedUsers(client) {
  let insertedUsers = [];
  let users = [
    {
      email: "aroyofla@gmail.com",
      password: "t0rcUat0$",
      name: "Àlex",
      role: "admin",
      verified: true
    }
  ];

  try {
    // Clear the "users" table
    await client.sql`DROP TABLE users CASCADE`;

    // Create the "users" table if it doesn't exist
    await client.sql`
      CREATE TABLE IF NOT EXISTS users (
        id UUID DEFAULT uuid_generate_v4(),
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        name VARCHAR(255),
        role VARCHAR(8) NOT NULL,
        verified BOOLEAN DEFAULT FALSE,
        PRIMARY KEY(id)
      )
    `;
    console.log(`Created "users" table`);

    // Insert data into the "users" table
    insertedUsers = await Promise.all(
      users.map(async (user) => {
        const userId = user?.id || uuidv4();
        const hashedPassword = await bcrypt.hash(user.password, 10);

        await client.sql`
          INSERT INTO users (id, name, email, password, role, verified)
          VALUES (${userId}, ${user.name}, ${user.email}, ${hashedPassword}, ${user.role}, ${user.verified})
          ON CONFLICT (id) DO NOTHING
        `;
        return user;
      })
    );
    console.log(`Seeded ${insertedUsers?.length} users`);

    return insertedUsers;
  }
  catch (error) {
    console.error("Error seeding users:", error);
    throw error;
  }
}

async function seedCodes(client) {
  let insertedCodes = [];

  try {
    // Clear the "codes" table
    await client.sql`DROP TABLE codes CASCADE`;

    // Create the "codes" table if it doesn't exist
    await client.sql`
      CREATE TABLE IF NOT EXISTS codes (
        id UUID DEFAULT uuid_generate_v4(),
        email TEXT NOT NULL UNIQUE,
        date DATE NOT NULL DEFAULT CURRENT_DATE,
        PRIMARY KEY(id),
        CONSTRAINT fk_user
          FOREIGN KEY(email)
          REFERENCES users(email)
          ON DELETE CASCADE
      )
    `;
    console.log(`Created "codes" table`);
  }
  catch (error) {
    console.error("Error seeding users:", error);
    throw error;
  }
}


async function seedCompetitions(client) {
  //let insertedCompetitions = [];

  try {
    // Clear the "competitions" table
    await client.sql`DROP TABLE competitions CASCADE`;

    // Create the "competitions" table if it doesn't exist
    await client.sql`
      CREATE TABLE IF NOT EXISTS competitions (
        id INT GENERATED ALWAYS AS IDENTITY,
        owner_id UUID DEFAULT uuid_generate_v4(),
        type VARCHAR(8) NOT NULL,
        logo VARCHAR(255),
        name VARCHAR(255) NOT NULL,
        description VARCHAR(255),
        private BOOLEAN DEFAULT TRUE,
        PRIMARY KEY(id),
        CONSTRAINT fk_user
          FOREIGN KEY(owner_id)
          REFERENCES users(id)
          ON DELETE CASCADE
      )
    `;
    console.log(`Created "competitions" table`);
  }
  catch (error) {
    console.error("Error seeding competitions:", error);
    throw error;
  }
}


async function seedMembersCompetition(client) {
  //let insertedMembersCompetition = [];

  try {
    // Clear the "members_competition" table
    await client.sql`DROP TABLE members_competition CASCADE`;

    // Create the "members_competition" table if it doesn't exist
    await client.sql`
      CREATE TABLE IF NOT EXISTS members_competition (
        id INT GENERATED ALWAYS AS IDENTITY,
        competition_id INT NOT NULL,
        user_id UUID DEFAULT uuid_generate_v4(),
        PRIMARY KEY(id),
        CONSTRAINT fk_competition
          FOREIGN KEY(competition_id)
          REFERENCES competitions(id)
          ON DELETE CASCADE
      )
    `;
    console.log(`Created "members_competition" table`);
  }
  catch (error) {
    console.error("Error seeding members_competition:", error);
    throw error;
  }
}


async function seedMatchesCompetition(client) {
  //let insertedMatchesCompetition = [];

  try {
    // Clear the "members_competition" table
    await client.sql`DROP TABLE matches_competition CASCADE`;

    // Create the "matches_competition" table if it doesn't exist
    await client.sql`
      CREATE TABLE IF NOT EXISTS matches_competition (
        id INT GENERATED ALWAYS AS IDENTITY,
        competition_id INT NOT NULL,
        round VARCHAR(8) NOT NULL,
        local_user_id UUID DEFAULT uuid_generate_v4(),
        visitor_user_id UUID DEFAULT uuid_generate_v4(),
        local_result INT DEFAULT 0,
        visitor_result INT DEFAULT 0,
        PRIMARY KEY(id),
        CONSTRAINT fk_competition
          FOREIGN KEY(competition_id)
          REFERENCES competitions(id)
          ON DELETE CASCADE
      )
    `;
    console.log(`Created "matches_competition" table`);
  }
  catch (error) {
    console.error("Error seeding matches_competition:", error);
    throw error;
  }
}


async function main() {
  const client = createClient();

  try {
    console.log('Start seeding…');
    
    await client.connect();
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    await seedUsers(client);
    await seedCodes(client);
    await seedCompetitions(client);
    await seedMembersCompetition(client);
    await seedMatchesCompetition(client);
  }
  catch (error) {
    console.error(
      "An error occurred while attempting to seed the database:",
      error
    );
  }
  finally {
    await client.end();

    console.log('End seeding!');
  }
}

main();