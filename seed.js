import dotenv from 'dotenv';
import connection from './connection/connection.js';
import { Role, User } from './models/index.js';

dotenv.config();

const rolesData = [
  { name: 'admin' },
  { name: 'user' },
];

const adminUserData = {
  name: 'Admin',
  lastname: 'Principal',
  dni: 12345678,
  mail: 'sebastian.zavala@gmail.com',
  pass: 'npm ',
  dateOfBirth: '1980-11-28',
  address: 'Vidt2000',
  city: 'Buenos Aires',
  state: 'Buenos Aires',
};

const runSeed = async () => {
  const transaction = await connection.transaction();
  try {
    console.log('🔄 Ejecutando seed de datos básicos...');

    const createdRoles = {};
    for (const role of rolesData) {
      const [roleRecord, wasCreated] = await Role.findOrCreate({
        where: { name: role.name },
        defaults: role,
        transaction,
      });
      createdRoles[role.name] = roleRecord;
      const action = wasCreated ? 'creado' : 'omitido (ya existía)';
      console.log(`   • Rol "${role.name}" ${action}`);
    }

    const adminRole = createdRoles.admin;
    if (!adminRole) {
      throw new Error('No se pudo obtener el rol "admin" para asignarlo al usuario inicial');
    }

    const [adminUser, adminCreated] = await User.findOrCreate({
      where: { mail: adminUserData.mail },
      defaults: { ...adminUserData, RoleId: adminRole.id },
      transaction,
    });
    const userAction = adminCreated ? 'creado' : 'omitido (ya existía)';
    console.log(`   • Usuario administrador ${userAction}: ${adminUser.mail}`);

    await transaction.commit();
    console.log('\n✅ Seed ejecutado correctamente.');
  } catch (error) {
    await transaction.rollback();
    console.error('\n❌ Error ejecutando el seed:', error.message);
    throw error;
  }
};

runSeed()
  .then(() => process.exit(0))
  .catch(() => process.exit(1));
