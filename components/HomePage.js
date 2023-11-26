import firebaseConfig from "./firebaseConfig";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import firebase from "firebase/app";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export default function HomePage() {
  const [fetchedDataState, setFetchedDataState] = useState(false);
  const [createdPage, setCreatedPage] = useState("");

  useEffect(function () {
    async function fetchAndCreatePage() {
      let result = await createPage();
      setCreatedPage(result);
      setFetchedDataState(true);
    }

    fetchAndCreatePage();
  }, []);

  async function getCollection() {
    const querySnapshot = await getDocs(collection(db, "Tracker"));
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data()}`);
    });

    let fethedDateArray = [];
    querySnapshot.forEach((doc) => {
      fethedDateArray.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    return fethedDateArray;
  }

  async function createPage() {
    let fetchedData = await getCollection();
    let returningData = [];
    let Blogs = fetchedData.map((userData) => {
      let { id } = userData;
      let streak = userData.Data?.length;
      userData.Data?.map((data) =>
        returningData.push(
          <div className="container">
            <div className="top">
              <img className="user-image" src={data.Work.Avatar_url} />
              <p>{id}</p>
            </div>
            <div className="middle">
              <p className="middle-text">{data.Work.Text.substring(10,data.Work.Text.length)}</p>
            </div>
            <div>
                {data.Work?.Image_Url ? <img className="uploaded-image" src={data.Work.Image_Url} /> : ""}
              </div>
            <div className="bottom">
              <p>Streak: {streak}</p>
            </div>
          </div>
        )
      );
      console.log(userData);
    });
    return returningData;
  }

  return <>{fetchedDataState ? createdPage : "Loading..."}</>;
}
