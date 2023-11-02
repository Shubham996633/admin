import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useEffect, useState } from 'react';
import { format } from "date-fns";
import { UserColumn } from "./_components/columns";
import { UserClient } from "./_components/client";
const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3000/api/user')
      .then((response) => response.json())
      .then((users) => setUsers(users))
      .catch((error) => console.error('Error:', error));
  }, []);

  if(!users) return null
  console.log(users)
  //@ts-ignore
  const formattedUsers: UserColumn[] = users.map((item:any) => ({
    id: item.userId,
    firstName: item.firstName,
    lastName: item.lastName,
    emailAddress:item.emailAddress,
    password:item.password,
    updated_at: item.updated_at,


    // createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));


  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <UserClient data={formattedUsers} />
      </div>
    </div>
  )
}
