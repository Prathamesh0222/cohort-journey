"use client";

import { useSession } from "next-auth/react";

const Dashboard = () => {
  const session = useSession();

  if (!session) {
    return <div>Unauthorized</div>;
  }

  console.log("Session data", session);

  return (
    <div>
      <h1>Dashboard</h1>
      <p>ID: {session.data?.user.id}</p>
      <p>Email: {session.data?.user.email}</p>
      <p>Username: {session.data?.user.username}</p>
    </div>
  );
};

export default Dashboard;
