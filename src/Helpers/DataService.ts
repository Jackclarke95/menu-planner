import { DatabaseReference, push, ref } from "firebase/database";
import { firebaseDb } from "../App";

export default class DataService {
  public static generateKey(): string | null {
    const testRef = ref(firebaseDb, "test");

    const key = push(testRef).key;

    return key;
  }

  public static async addIngredient(
    ingredient: string
  ): Promise<DatabaseReference> {
    const ingredientsRef = ref(firebaseDb, "ingredients");

    return await push(ingredientsRef, { name: ingredient });
  }
}
