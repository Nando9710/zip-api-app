import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class FileMigration1726254473404 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(new Table({
			name: "files",
			columns: [
				{
					name: "id",
					type: "int",
					isPrimary: true,
					isGenerated: true,
					generationStrategy: 'increment',
				},
				{
					name: "name",
					type: "varchar",
				},
				{
					name: "description",
					type: "varchar",
				},
				{
					name: "author",
					type: "varchar",
				},
				{
					name: 'created_at',
					type: 'timestamp',
					default: 'now()'
				},
				{
					name: 'updated_at',
					type: 'timestamp',
					default: 'now()'
				}
			]
		}), true)
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
	}
}
