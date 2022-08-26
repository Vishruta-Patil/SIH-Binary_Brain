import "./index.css";
import { db } from "firebase-config";
import { collection, getDocs, query } from "firebase/firestore";
import { useEffect, useState } from "react";

export const AuthorisedVendor = () => {
  const [blackList, setBlackList] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const booksCollectionRef = collection(db, "AuthorizedVendors");
        const q = query(booksCollectionRef);

        const res = await getDocs(q);
        const booksArr = res.docs.map((doc) => doc.data());
        console.log(booksArr);
        setBlackList(booksArr);
        return booksArr;
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  return (
    <table>
      <tr>
        <th>Sr No</th>
        <th>Name</th>
        <th>Address</th>
      </tr>

      {blackList?.map((item, index) => (
        <tr>
          <td>{item.id}</td>
          <td>{item.name}</td>
          <td>{item.address}</td>
        </tr>
      ))}
    </table>
  );
};
