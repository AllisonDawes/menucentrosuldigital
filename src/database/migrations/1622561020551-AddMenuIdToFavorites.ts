import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from "typeorm";

export default class AddMenuIdToFavorites1622561020551
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "favorites",
      new TableColumn({
        name: "menu_id",
        type: "uuid",
        isNullable: true,
      })
    );

    await queryRunner.createForeignKey(
      "favorites",
      new TableForeignKey({
        name: "FavoritesMenuMenus",
        columnNames: ["menu_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "menus",
        onDelete: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("favorites", "FavoritesMenuMenus");
    await queryRunner.dropColumn("favorites", "menu_id");
  }
}
