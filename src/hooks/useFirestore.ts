import {
  setDoc,
  doc,
  getDoc,
  updateDoc,
  DocumentData,
  collection,
  query,
  where,
  orderBy,
  getDocs,
  WhereFilterOp,
} from "firebase/firestore";
import { db } from "../firebase";
import { User, updateProfile } from "firebase/auth";
import { useState } from "react";

export interface writeDataPropsType {
  collectionName: string;
  uid: string;
  data: object;
}

export interface readDocPropsType {
  collectionName: string;
  uid: string;
}

export interface readAllDocsPropType {
  collectionName: string;
  sorting: sortingProps;
  filter: filterProps;
}

export interface readMultipleDocsPropsType {
  collectionName: string;
  queryObject: queryObjectType;
}

interface queryObjectType {
  field: string;
  operator: WhereFilterOp;
  value: boolean;
}

export interface updateDataPropsType {
  currentUser?: User;
  collectionName: string;
  updates: { [x: string]: any };
  docId: string;
}

export interface getCurrentUserDataPropsType {
  userId: string;
}

export interface sortingProps extends tableColumn {
  order: "asc" | "desc";
}

export interface filterProps extends tableColumn {
  value?: string;
}

export type tableColumn = {
  column: "displayName" | "email" | "roles" | "createdAt";
};

const useFirestore = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown | string>("");
  const [success, setSuccess] = useState<string>("");

  const writeData = async (
    collectionName: string,
    uid: string,
    data: object,
  ) => {
    setLoading(true);
    setError("");

    try {
      setDoc(doc(db, collectionName, uid), data);
      setLoading(false);
    } catch (error) {
      console.log("Error adding document: ", error);
      setError("Failed to save data...");
      setLoading(false);
    }
  };

  const readDoc = async ({
    collectionName,
    uid,
  }: readDocPropsType): Promise<DocumentData | undefined> => {
    setLoading(true);
    setError("");

    const docRef = doc(db, collectionName, uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const documentData = docSnap.data();
      setLoading(false);
      return documentData;
    } else {
      setError("Failed to load data");
      setLoading(false);
      return undefined;
    }
  };

  const readAllDocs = async ({
    collectionName,
    sorting,
    filter,
  }: readAllDocsPropType) => {
    setLoading(true);
    setError("");

    const usersRef = collection(db, collectionName);
    let q;
    if (filter.value) {
      const f = where(filter.column, "==", filter.value);
      q = query(usersRef, orderBy(sorting.column, sorting.order), f);
    } else {
      q = query(usersRef, orderBy(sorting.column, sorting.order));
    }
    const docArray: Array<DocumentData> = [];
    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        docArray.push(doc.data());
      });

      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }

    return docArray;
  };

  const readMultipleDocs = async ({
    collectionName,
    queryObject,
  }: readMultipleDocsPropsType) => {
    setLoading(true);
    setError("");

    const docArray: Array<DocumentData> = [];

    const q = query(
      collection(db, collectionName),
      where(queryObject.field, queryObject.operator, queryObject.value),
    );
    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        docArray.push(doc.data());
      });
      setLoading(false);
    } catch (error) {
      setError("");
      setLoading(false);
    }

    return docArray;
  };

  const updateData = async ({
    currentUser,
    collectionName,
    updates,
    docId,
  }: updateDataPropsType) => {
    setLoading(true);
    setError("");

    if (updates.displayName && !currentUser) {
      console.log("currentUser Invalid");
      setError("Document ID invalid");
      return;
    }

    if (updates.displayName === "") {
      setError("Invalid name");
      return;
    }

    try {
      if (updates.displayName && currentUser) {
        await updateProfile(currentUser, {
          displayName: updates.displayName,
        });
      }

      await updateDoc(doc(db, collectionName, docId), updates);

      setLoading(false);
    } catch (error) {
      console.log(error);
      setError("Failed to update information");
      setLoading(false);
    }
  };

  return {
    writeData,
    readDoc,
    readAllDocs,
    readMultipleDocs,
    updateData,
    error,
    loading,
    setError,
    setLoading,
  };
};

export default useFirestore;
