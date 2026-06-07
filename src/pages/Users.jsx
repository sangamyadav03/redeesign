import React from "react";

const users = [
  { id: 1, name: "Aman Verma", email: "aman@gmail.com" },
  { id: 2, name: "Neha Singh", email: "neha@gmail.com" },
  { id: 3, name: "Rohit Sharma", email: "rohit@gmail.com" },
];

const Users = () => {
  return (
    <div>
      <h1 className="text-3xl font-semibold mb-6">Users</h1>

      <div className="bg-[#131a24] rounded-lg overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-white/5">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-t border-white/10">
                <td className="p-4">{u.name}</td>
                <td className="p-4 text-gray-400">{u.email}</td>
                <td className="p-4">
                  <button className="text-sm bg-white text-black px-3 py-1 rounded">
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
