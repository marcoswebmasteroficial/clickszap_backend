import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreatePasswordResetTokenTable1730221795715
  implements MigrationInterface
{
  name = 'CreatePasswordResetTokenTable1730221795715'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "password_reset_tokens" (
        "id" varchar PRIMARY KEY NOT NULL,
        "token" varchar NOT NULL,
        "expiration" datetime NOT NULL,
        "createdAt" datetime NOT NULL DEFAULT (datetime('now')),
        "userId" varchar
      )
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Remove a tabela se necessário
    await queryRunner.query(`DROP TABLE IF EXISTS "password_reset_tokens"`)
  }
}
