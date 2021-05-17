import { MigrationInterface, QueryRunner, Table } from "typeorm";

export default class CreateProductsMenu1620780459056
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "products_menu",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            generationStrategy: "uuid",
            default: "uuid_generate_v4()",
          },
          {
            name: "name_product",
            type: "varchar",
          },
          {
            name: "description",
            type: "varchar",
          },
          {
            name: "price",
            type: "decimal",
            precision: 10,
            scale: 2,
          },
          {
            name: "category_product",
            type: "varchar",
          },
          {
            name: "day_disponible",
            type: "varchar",
          },
          {
            name: "active",
            type: "boolean",
            default: "true",
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "now()",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("products_menu");
  }
}
