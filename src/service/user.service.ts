import fs from "fs";
import * as argon2 from "argon2";
import logger from "../middleware/logger";
import { uploadPhoto } from "..//utils/uploadPhoto";
import { IUserAttributes, User } from "../models/user";

export const getUserById = async (id: string) => {
  try {
    const result = await User.findOne({ where: { id } });

    if (!result?.dataValues) throw new Error();

    return result.dataValues;
  } catch (error) {
    logger.error(error);
    return null;
  }
};

export const updateUserPassword = async (
  id: string,
  { oldPassword, newPassword }: { oldPassword: string; newPassword: string }
) => {
  try {
    if (oldPassword === newPassword)
      throw new Error("Can't use the same password as a new password.");

    const result = await User.findOne({ where: { id } });

    if (!result?.dataValues) throw new Error("User doesn't exist.");

    if (!result?.dataValues.password)
      throw new Error(
        "this user is connected with third party, thus he can't use password authentiacation."
      );

    const validPassword = await argon2.verify(
      result.dataValues.password,
      oldPassword
    );

    if (!validPassword) throw new Error("Wront password.");

    const newPasswordHash = await argon2.hash(newPassword);

    await User.update({ password: newPasswordHash }, { where: { id } });

    return { success: true };
  } catch (error: any) {
    logger.error(error);
    return { error: error?.message };
  }
};

export const updateUser = async (
  id: string,
  data: Partial<
    Pick<
      IUserAttributes,
      | "first_name"
      | "last_name"
      | "phone"
      | "wilaya"
      | "town"
      | "photo"
      | "identity_card"
    >
  >
) => {
  try {
    const result = await User.update(data, { where: { id } });

    if (!result[0]) throw new Error();

    return { success: true };
  } catch (error) {
    logger.error(error);
    return null;
  }
};

export const updateUserPhoto = async (id: string, file: any) => {
  try {
    // upload the file to google cloud
    const uploadResult: any = await uploadPhoto(
      file,
      `photos/${file.filename}`
    );

    if (uploadResult?.error) return uploadResult.error;

    // delete the file from the server
    fs.unlinkSync(file.path);

    // update the user's photo link
    await updateUser(id, { photo: uploadResult });

    return { url: uploadResult };
  } catch (error) {
    logger.error(error);
    return null;
  }
};
