
const Dashboard = () => {

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {

    localStorage.removeItem("user");

    window.location.reload();
  };

  if (!user) {
    return <h2>No User Found</h2>;
  }

  return (

    <div className="form-container">

      <h2>Dashboard</h2>

      <div className="dashboard-card">

        <div className="profile-circle">
          {user.email.charAt(0).toUpperCase()}
        </div>

        <h3>{user.username || "User"}</h3>

        <p>
          <strong>Email:</strong> {user.email}
        </p>

        <p>
          <strong>Status:</strong> Active User ✅
        </p>

      </div>

      <button onClick={handleLogout}>
        Logout
      </button>

    </div>
  );
};

export default Dashboard;

