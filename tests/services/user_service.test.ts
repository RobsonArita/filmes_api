// @ts-nocheck
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserService } from "../../src/services/user_service";
import UserModel from "../../src/models/user_model";
import {
  AlreadyRegisteredUserException,
  AutenticatedEmailNotFound,
  RegisteredEmailNotFound,
  UserNotFound,
} from "../../src/middlewares/error_handler_middleware";
import settings from "../../src/core/settings";
import { sendEmail } from "../../src/utils/email";

jest.mock("../../src/utils/email");
jest.mock("bcryptjs");
jest.mock("jsonwebtoken");

const mockUserModel = new UserModel({
  name: "name",
  email: "email@example.com",
  password: "password",
});

describe("UserService", () => {
  let userService: UserService;
  let postgresAdapterMock: any;

  beforeEach(() => {
    postgresAdapterMock = {
      emailExists: jest.fn(),
      createUser: jest.fn(),
      getUserByEmail: jest.fn(),
      updateUser: jest.fn(),
    };
    userService = new UserService(postgresAdapterMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("create", () => {
    it("should throw AlreadyRegisteredUserException if email already exists", async () => {
      postgresAdapterMock.emailExists.mockResolvedValue(true);

      const user = mockUserModel;

      await expect(userService.create(user)).rejects.toMatchObject({
        code: 400,
        data: {
          message: "Email from user already exists.",
        },
      });
    });

    it("should create a user and return the user id", async () => {
      postgresAdapterMock.emailExists.mockResolvedValue(false);
      postgresAdapterMock.createUser.mockResolvedValue({ id: "user-id" });

      const user = mockUserModel;
      const userId = await userService.create(user);

      expect(userId).toBe("user-id");
      expect(postgresAdapterMock.createUser).toHaveBeenCalledWith(
        "name",
        "email@example.com",
        undefined
      );
    });
  });

  describe("autenticate", () => {
    it("should throw AutenticatedEmailNotFound if email does not exist", async () => {
      postgresAdapterMock.emailExists.mockResolvedValue(false);

      await expect(
        userService.autenticate("email@example.com", "password")
      ).rejects.toMatchObject({
        code: 400,
        data: { message: "Invalid email or password" },
      });
    });

    it("should throw UserNotFound if user is not found", async () => {
      postgresAdapterMock.emailExists.mockResolvedValue(true);
      postgresAdapterMock.getUserByEmail.mockResolvedValue(null);

      await expect(
        userService.autenticate("email@example.com", "password")
      ).rejects.toMatchObject({
        code: 404,
        data: { message: "User not found." },
      });
    });

    it("should throw AutenticatedEmailNotFound if password is incorrect", async () => {
      postgresAdapterMock.emailExists.mockResolvedValue(true);
      postgresAdapterMock.getUserByEmail.mockResolvedValue({
        email: "email@example.com",
        name: "name",
        password: "hashed-password",
      });

      jest.spyOn(bcrypt, "compare").mockResolvedValue(false);

      await expect(
        userService.autenticate("email@example.com", "wrong-password")
      ).rejects.toMatchObject({
        code: 400,
        data: { message: "Invalid email or password" },
      });
    });

    it("should return a token and user details if authentication is successful", async () => {
      postgresAdapterMock.emailExists.mockResolvedValue(true);
      postgresAdapterMock.getUserByEmail.mockResolvedValue({
        email: "email@example.com",
        name: "name",
        password: "hashed-password",
      });
      jest.spyOn(bcrypt, "compare").mockResolvedValue(true);
      jest.spyOn(jwt, "sign").mockReturnValue("jwt-token");

      const result = await userService.autenticate(
        "email@example.com",
        "password"
      );

      expect(result).toEqual({
        token: "jwt-token",
        email: "email@example.com",
        name: "name",
      });
    });
  });

  describe("generatePasswordResetToken", () => {
    it("should throw RegisteredEmailNotFound if email is not registered", async () => {
      postgresAdapterMock.emailExists.mockResolvedValue(false);

      await expect(
        userService.generatePasswordResetToken("email@example.com")
      ).rejects.toMatchObject({
        code: 400,
        data: { message: "There was an error." },
      });
    });

    it("should throw UserNotFound if user is not found", async () => {
      postgresAdapterMock.emailExists.mockResolvedValue(true);
      postgresAdapterMock.getUserByEmail.mockResolvedValue(null);

      await expect(
        userService.generatePasswordResetToken("email@example.com")
      ).rejects.toMatchObject({
        code: 404,
        data: { message: "User not found." },
      });
    });

    it("should send a reset email if not in local mode", async () => {
      settings.isLocal = jest.fn().mockReturnValue(false);
      postgresAdapterMock.emailExists.mockResolvedValue(true);
      postgresAdapterMock.getUserByEmail.mockResolvedValue({
        email: "email@example.com",
      });
      jest.spyOn(jwt, "sign").mockReturnValue("reset-token");

      await userService.generatePasswordResetToken("email@example.com");

      expect(sendEmail).toHaveBeenCalledWith(
        "email@example.com",
        "Password Reset Request",
        expect.stringContaining("http://")
      );
    });

    it("should return a token if in local mode", async () => {
      settings.isLocal = jest.fn().mockReturnValue(true);
      postgresAdapterMock.emailExists.mockResolvedValue(true);
      postgresAdapterMock.getUserByEmail.mockResolvedValue({
        email: "email@example.com",
      });
      jest.spyOn(jwt, "sign").mockReturnValue("reset-token");

      const result = await userService.generatePasswordResetToken(
        "email@example.com"
      );

      expect(result).toEqual({ returning_token_since_is_local: "reset-token" });
    });
  });
});
