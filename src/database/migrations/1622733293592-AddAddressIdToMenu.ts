import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from "typeorm";

export default class AddAddressIdToMenu1622733293592
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "menus",
      new TableColumn({
        name: "address_id",
        type: "uuid",
        isNullable: true,
      })
    );

    await queryRunner.createForeignKey(
      "menus",
      new TableForeignKey({
        name: "MenusAddressIdMenu",
        columnNames: ["address_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "address",
        onDelete: "SET NULL",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("menus", "MenusAddressIdMenu");
    await queryRunner.dropColumn("menus", "address_id");
  }
}
