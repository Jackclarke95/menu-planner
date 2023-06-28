import { DatabaseReference, push, ref } from "firebase/database";
import { db } from "../App";

export default class DataService {
  public static generateKey(): string | null {
    const testRef = ref(db, "test");

    const key = push(testRef).key;

    return key;
  }

  public static async addIngredient(
    ingredient: string
  ): Promise<DatabaseReference> {
    const ingredientsRef = ref(db, "ingredients");

    return await push(ingredientsRef, { name: ingredient });
  }
}
