import { beforeEach, describe, expect, it, vi } from "vitest";

import { category } from "@/shared/db";

import { createCategoryAction } from "./create-category.action";

/**
 * vi.mock() ховається вище імпортів, тому всі моки створюємо у vi.hoisted()
 * і посилаємось на них із фабрик — інакше буде ReferenceError (TDZ).
 */
const mocks = vi.hoisted(() => ({
  headers: vi.fn<() => Promise<Headers>>(),
  userHasPermission: vi.fn<(args: any) => Promise<{ success: boolean }>>(),
  insert: vi.fn<(...args: any[]) => any>(),
  values: vi.fn<(...args: any[]) => any>(),
  returning: vi.fn<(...args: any[]) => any>(),
}));

// 1. Next.js-специфічні модулі
vi.mock("server-only", () => ({}));
vi.mock("next/headers", () => ({ headers: mocks.headers }));

// 2. Точка перевірки прав у Better Auth
vi.mock("@/shared/auth/auth", () => ({
  auth: { api: { userHasPermission: mocks.userHasPermission } },
}));

// 3. Мокаємо ЛИШЕ клієнт, бо client.ts створює new Pool() на рівні модуля.
//    index.ts при цьому віддає реальну таблицю `category` та relations —
//    так тест бачить справжні колонки, а не підробку.
vi.mock("@/shared/db/client", () => ({
  db: { insert: mocks.insert },
}));

const createdCategory = {
  id: "0192f0a2-7f3c-4d6b-9a11-2c5e8f0b4d77",
  name: "Graphics Cards",
  slug: "graphics-cards",
  createdAt: new Date("2026-01-01T00:00:00.000Z"),
  updatedAt: new Date("2026-01-01T00:00:00.000Z"),
};

const validPayload = { name: "Graphics Cards", slug: "graphics-cards" };

const expectNoDbCall = () => {
  expect(mocks.insert).not.toHaveBeenCalled();
  expect(mocks.values).not.toHaveBeenCalled();
  expect(mocks.returning).not.toHaveBeenCalled();
};

beforeEach(() => {
  // reset, а не clear: прибирає і реалізації, і чергу mock*Once —
  // тести більше не залежать від порядку виконання.
  vi.resetAllMocks();

  mocks.headers.mockResolvedValue(new Headers());
  mocks.userHasPermission.mockResolvedValue({ success: true });

  // Ланцюжок drizzle: insert(table).values(data).returning()
  mocks.insert.mockReturnValue({ values: mocks.values });
  mocks.values.mockReturnValue({ returning: mocks.returning });
  mocks.returning.mockResolvedValue([createdCategory]);
});

describe("createCategoryAction", () => {
  describe("authorization", () => {
    it("should return a permission error, skip the DB and check the exact category:create permission", async () => {
      mocks.userHasPermission.mockResolvedValue({ success: false });

      const result = await createCategoryAction(validPayload);

      expect(result).toEqual({
        success: false,
        error: "Недостатньо прав для виконання цієї дії",
      });

      expect(mocks.headers).toHaveBeenCalledTimes(1);
      expect(mocks.userHasPermission).toHaveBeenCalledTimes(1);
      expect(mocks.userHasPermission).toHaveBeenCalledWith({
        headers: expect.any(Headers),
        body: { permissions: { category: ["create"] } },
      });

      expectNoDbCall();
    });

    it("should check permissions before validation so a denial takes precedence", async () => {
      mocks.userHasPermission.mockResolvedValue({ success: false });

      const result = await createCategoryAction({ name: "", slug: "" });

      expect(result).toEqual({
        success: false,
        error: "Недостатньо прав для виконання цієї дії",
      });
      expectNoDbCall();
    });

    it("should propagate a permission check failure instead of swallowing it", async () => {
      mocks.userHasPermission.mockRejectedValue(new Error("auth service down"));

      await expect(createCategoryAction(validPayload)).rejects.toThrow("auth service down");

      expectNoDbCall();
    });
  });

  describe("validation", () => {
    it("should reject an empty name and never reach the insert", async () => {
      const result = await createCategoryAction({
        name: "",
        slug: "graphics-cards",
      });

      expect(result).toEqual({ success: false, error: "Назва обов'язкова" });
      expectNoDbCall();
    });

    it("should reject a slug with uppercase letters and spaces", async () => {
      const result = await createCategoryAction({
        name: "Graphics Cards",
        slug: "INVALID SLUG WITH UPPERCASE",
      });

      expect(result).toEqual({
        success: false,
        error: "Slug повинен містити лише малі літери, цифри та дефіси",
      });
      expectNoDbCall();
    });

    // Документує поточну поведінку: defaultValues форми — slug: "",
    // а .optional() пропускає лише undefined, не порожній рядок.
    // Користувач, який залишив slug порожнім, отримає помилку валідації.
    it("should reject an empty-string slug that the form sends by default", async () => {
      const result = await createCategoryAction({ name: "Graphics Cards", slug: "" });

      expect(result).toEqual({
        success: false,
        error: "Slug повинен містити лише малі літери, цифри та дефіси",
      });
      expectNoDbCall();
    });
  });

  describe("insert", () => {
    it("should insert parsed data into the real category table and return the inserted row", async () => {
      const result = await createCategoryAction(validPayload);

      expect(result).toEqual({ success: true, data: createdCategory });
      expect(mocks.insert).toHaveBeenCalledTimes(1);
      expect(mocks.insert).toHaveBeenCalledWith(category);
      expect(mocks.values).toHaveBeenCalledWith({
        name: "Graphics Cards",
        slug: "graphics-cards",
      });
      expect(mocks.returning).toHaveBeenCalledTimes(1);
    });

    // Регресія: у таблиці category немає isActive/sortOrder/icon/parentId.
    // zod strip-ить невідомі поля — вони НЕ мають потрапити у values().
    it("should drop unknown fields so only schema columns reach values()", async () => {
      const payloadWithExtraFields = {
        ...validPayload,
        isActive: true,
        sortOrder: 5,
        icon: "RiCpuLine",
        parentId: null,
      };

      const result = await createCategoryAction(payloadWithExtraFields);

      expect(result.success).toBe(true);
      expect(mocks.values).toHaveBeenCalledWith({
        name: "Graphics Cards",
        slug: "graphics-cards",
      });
      expect(mocks.values).not.toHaveBeenCalledWith(
        expect.objectContaining({ isActive: expect.anything() }),
      );
    });

    // Прогалина: коли БД нічого не повернула, ми все одно кажемо "успіх".
    it("should return success with data undefined when returning() yields an empty array", async () => {
      mocks.returning.mockResolvedValue([]);

      const result = await createCategoryAction(validPayload);

      expect(result.success).toBe(true);
      expect(result.data).toBeUndefined();
    });
  });

  describe("error mapping", () => {
    it("should map a duplicate slug (Postgres 23505) to a readable message", async () => {
      const pgError = Object.assign(new Error("duplicate key value violates unique constraint"), {
        code: "23505",
      });
      mocks.returning.mockRejectedValue(pgError);

      const result = await createCategoryAction(validPayload);

      expect(result).toEqual({
        success: false,
        error: "Категорія з таким slug вже існує",
      });
      expect(mocks.insert).toHaveBeenCalledTimes(1);
    });

    it("should map any other database error to a generic message", async () => {
      mocks.returning.mockRejectedValue(new Error("Connection lost"));

      const result = await createCategoryAction(validPayload);

      expect(result).toEqual({
        success: false,
        error: "Не вдалося зберегти категорію",
      });
    });

    it("should not crash when a non-Error value is thrown from the database", async () => {
      mocks.returning.mockRejectedValue("boom");

      const result = await createCategoryAction(validPayload);

      expect(result).toEqual({
        success: false,
        error: "Не вдалося зберегти категорію",
      });
    });
  });
});
