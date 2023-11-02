import { useRouter } from 'next/router';
import { useEffect, useState } from "react";
import { UserForm } from "./components/user-form";

const UserPage = () => {
  const router = useRouter();
  const data = router.query;
  const userId = data.id;
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (userId) {
      fetch(`http://localhost:3000/api/user/${userId}`)
        .then((response) => response.json())
        .then((user) => setUser(user))
        .catch((error) => console.error('Error:', error));
    }
  }, [userId]);

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <UserForm initialData={user} />
      </div>
    </div>
  );
};

export default UserPage;
