const { execSync } = require('child_process');

// Function to extract the --name argument from command line
function getArgValue(argName) {
  const arg = process.argv.find(arg => arg.startsWith(`--${argName}=`));
  return arg ? arg.split('=')[1] : null;
}

// Get the migration name from command line arguments
const migrationName = getArgValue('name');

if (!migrationName) {
  console.error('Error: Migration name not provided. Use --name=<migration_name>');
  process.exit(1);
}

// Build the TypeORM migration generate command
const command = `pnpm typeorm migration:generate ./src/app/migrations/${migrationName}`;

// Log the command for visibility
console.log(`Running: ${command}`);

try {
  // Execute the command
  execSync(command, { stdio: 'inherit' });
} catch (error) {
  console.error('Error running migration command:', error.message);
  process.exit(1);
}

/**
  pnpm run migration:generate --name=migration-file-name
*/
