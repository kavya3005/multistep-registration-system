import { useEffect, useState } from "react";
import { getLogs } from "../services/mongoApi";

function AdminLogs() {

  const [logs, setLogs] = useState([]);

  useEffect(() => {

    getLogs()
      .then((res) => {
        setLogs(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

  }, []);

  return (
    <div>
      <h2>Registration Logs</h2>

      {logs.map((log) => (
        <div key={log._id}>
          <p>
            Step {log.step} - {log.action}
          </p>
        </div>
      ))}
    </div>
  );
}

export default AdminLogs;