import { useState, useEffect } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

interface User {
  name: string;
  email: string;
  image: string;
  uid: string;
}

export default function User() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsersFromDB = async () => {
      const db = getFirestore();
      const usersCollection = collection(db, 'users');
      const userSnapshots = await getDocs(usersCollection);
      const usersData: User[] = userSnapshots.docs.map((doc) => {
        const data = doc.data();
        return {
          name: data.name || 'No Name',
          email: data.email || 'No Email',
          uid: data.uid || 'No UID',
          image: data.profileImage || 'https://www.w3schools.com/w3images/avatar2.png',
        };
      });
      setUsers(usersData);
    };

    fetchUsersFromDB();
  }, []);

  if (users.length === 0) {
    return <p>Loading...</p>;
  }

  return (
    <div className="user-table-container w-full">
      <table className="table-auto border-collapse border border-gray-300 w-full">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2">Avatar</th>
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Email</th>
            <th className="border border-gray-300 px-4 py-2">UID</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index} className="text-center">
              <td className="border border-gray-300 px-4 py-2">
                <img src={user.image} alt="User Avatar" className="w-12 h-12 rounded-full mx-auto object-cover" />
              </td>
              <td className="border border-gray-300 px-4 py-2">{user.name}</td>
              <td className="border border-gray-300 px-4 py-2">{user.email}</td>
              <td className="border border-gray-300 px-4 py-2">{user.uid}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
