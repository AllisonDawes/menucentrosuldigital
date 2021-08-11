import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from "typeorm";

export default class AddAddressIdMenuToFavorites1627954009315
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "favorites",
      new TableColumn({
        name: "address_id",
        type: "uuid",
        isNullable: true,
      })
    );

    await queryRunner.createForeignKey(
      "favorites",
      new TableForeignKey({
        name: "FavoriteAddressIdMenu",
        columnNames: ["address_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "address",
        onDelete: "SET NULL",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("favorites", "FavoriteAddressIdMenu");
    await queryRunner.dropColumn("favorites", "address_id");
  }
}
