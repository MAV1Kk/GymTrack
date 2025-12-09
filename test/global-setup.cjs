const { execSync } = require('node:child_process');

module.exports = async () => {
  execSync('docker compose -f docker-compose.test.yml up -d --wait', { stdio: 'inherit' });

  execSync(
    'DATABASE_URL="postgresql://gymtrack:gymtrack@localhost:5433/gymtrack_test?schema=public" pnpm prisma migrate deploy',
    { stdio: 'inherit' },
  );

  execSync('pnpm prisma generate', { stdio: 'inherit' });
};
