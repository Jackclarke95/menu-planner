import {
  Auth,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updatePassword,
  updateProfile,
  User,
} from "firebase/auth";
import { push, ref, set, update, remove } from "firebase/database";
import { auth, db } from "../App";
import { toast } from "react-toastify";

export default class DataService {
  public static generateKey(): string | null {
    const testRef = ref(db, "test");

    const key = push(testRef).key;

    return key;
  }
}
