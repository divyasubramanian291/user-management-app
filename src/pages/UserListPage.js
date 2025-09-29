import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUsers,
  deleteUser,
  updateUser,
  createUser,
} from "../redux/usersActions";
import Header from "../components/Header";
import UserToolbar from "../components/UserToolbar";
import ViewToggle from "../components/ViewToggle";
import UserTable from "../components/TableView";
import UserCards from "../components/CardView";
import DeleteConfirmModal from "../components/DeleteConfirmModal";
import UserModal from "../components/UserModal";

export default function UserListPage() {
  const dispatch = useDispatch();
  const { users = [] } = useSelector((state) => state.users);

  const [view, setView] = useState("table");
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const filteredUsers = users.filter((u) =>
    `${u.first_name} ${u.last_name}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const handleLogout = () => {
    console.log("Logout clicked");
  };

  const handleDelete = (user) => {
    setSelectedUser(user);
    setDeleteOpen(true);
  };
  const confirmDelete = (user) => {
    dispatch(deleteUser(user.id));
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setEditOpen(true);
  };
  const handleUpdate = (updatedUser) => {
    dispatch(updateUser(updatedUser.id, updatedUser));
    setEditOpen(false);
  };

  const handleCreate = () => {
    setSelectedUser(null);
    setCreateOpen(true);
  };
  const handleSaveNewUser = (newUser) => {
    dispatch(createUser(newUser));
    setCreateOpen(false);
  };

  return (
    <div>
      <Header onLogout={handleLogout} />
      <div
        style={{
          padding: "5px",
          backgroundColor: "lightgrey",
        }}
      >
        <div style={{ backgroundColor: "white", padding: "10px" }}>
          <UserToolbar onSearch={setSearch} onAdd={handleCreate} />
          <ViewToggle view={view} setView={setView} />
          {view === "table" ? (
            <UserTable
              users={filteredUsers}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ) : (
            <UserCards
              users={filteredUsers}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          )}
        </div>
      </div>

      <DeleteConfirmModal
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onDelete={confirmDelete}
        user={selectedUser}
      />

      <UserModal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        onSave={handleUpdate}
        user={selectedUser}
      />

      <UserModal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        onSave={handleSaveNewUser}
        user={null} // null for create
      />
    </div>
  );
}
