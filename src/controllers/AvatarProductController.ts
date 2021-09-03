import { Request, Response } from "express";
import { classToClass } from "class-transformer";

import UpdateProductAvatarService from "../services/UpdateProductAvatarService";

class AvatarProductController {
  public async update(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { menu_id, product_id } = request.params;

    const updateProductAvatar = new UpdateProductAvatarService();

    const product = await updateProductAvatar.execute({
      user_id,
      menu_id,
      product_id,
      avatarFileName: request.file.filename,
    });

    return response.status(200).json(classToClass(product));
  }
}

export default AvatarProductController;
