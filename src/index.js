const { createConnection } = require("mysql2/promise");

const config = {
  user: 'root',
  password: 'docker',
  host: 'localhost',
  port: 3306,
  database: 'contacts',
};

const main = async () => {
  const command = process.argv[2];

  if (command === "help") {
    console.log("=== CONTACTS CRUD ===")
    console.log("");
    console.log("Commands:");
    console.log("- create");
    console.log("- read");
    console.log("- update");
    console.log("- delete");
    console.log("");
    console.log("Examples:");
    console.log("- node src create matheus 550012341234");
    console.log("- node src read");
  }

  if (command === "create") {
    const name = process.argv[3];
    const phoneNumber = process.argv[4];

    const connection = await createConnection(config);
    await connection.connect();

    try {
      await connection.query(
        'INSERT INTO `Contact` (`name`, `phoneNumber`) VALUES (?, ?)',
        [name, phoneNumber]
      );
    } finally {
      await connection.end();
    }
  }

  if (command === "read") {
    const connection = await createConnection(config);
    await connection.connect();

    try {
      const [rows] = await connection.query('SELECT * FROM `Contact`');
      console.table(rows);
    } finally {
      await connection.end();
    }
  }
};

main();
