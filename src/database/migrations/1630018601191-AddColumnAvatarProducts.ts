import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export default class AddColumnAvatarProducts1630018601191
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "products_menu",
      new TableColumn({
        name: "product_avatar",
        type: "varchar",
        isNullable: true,
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("products_menu", "product_avatar");
  }
}
