import { Request, Response } from "express";

import UpdateAvatarCategoryProductsService from "../services/UpdateAvatarCategoryProductsService";

class UpdateAvatarCategoryProductsController {
  public async update(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { category_product_id } = request.params;

    const updateAvatarCategoryProducts =
      new UpdateAvatarCategoryProductsService();

    const category = await updateAvatarCategoryProducts.execute({
      user_id,
      category_product_id,
      AvatarCategoryProductsFileName: request.file.filename,
    });

    return response.status(200).json(category);
  }
}

export default UpdateAvatarCategoryProductsController;
