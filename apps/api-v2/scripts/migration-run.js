const { execSync } = require('child_process');

// Build the TypeORM migration run command using the 'typeorm' script from package.json
// which uses 'node --require ts-node/register' instead of the 'ts-node' executable.
const command = `pnpm typeorm migration:run`;

// Log the command for visibility
console.log(`Running: ${command}`);

try {
  // Execute the command
  execSync(command, { stdio: 'inherit' });
} catch (error) {
  console.error('Error running migration command:', error.message);
  process.exit(1);
}
