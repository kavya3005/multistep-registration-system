import { useEffect, useState } from "react";
import {
  getSessions,
  getLogs,
  getHelp
} from "../services/mongoApi";

function Analytics() {

  const [sessions, setSessions] = useState(0);
  const [logs, setLogs] = useState(0);
  const [helpDocs, setHelpDocs] = useState(0);

  const [recentSessions, setRecentSessions] =
    useState([]);

  useEffect(() => {

    getSessions().then(res => {

      setSessions(res.data.length);

      setRecentSessions(
  res.data
    .filter(item => item.currentStep === 3)
    .slice(-5)
    .reverse()
);

    });

    getLogs().then(res =>
      setLogs(res.data.length)
    );

    getHelp().then(res =>
      setHelpDocs(res.data.length)
    );

  }, []);

  return (

    <div style={{ padding: "20px" }}>

      <h2>Analytics Dashboard</h2>

      <h3>
        Total Sessions: {sessions}
      </h3>

      <h3>
        Total Logs: {logs}
      </h3>

      <h3>
        Total Help Documents: {helpDocs}
      </h3>

      <hr />

      <h3>
        Recent Registrations
      </h3>

      {
        recentSessions.map(
          (item) => (

          <div
            key={item._id}
            style={{
              marginBottom: "10px",
              padding: "10px",
              borderRadius: "10px",
              background:
                "rgba(255,255,255,0.08)"
            }}
          >

            <p>
              <strong>Name:</strong>
              {" "}
              {item.data?.fullname}
            </p>

            <p>
              <strong>Email:</strong>
              {" "}
              {item.data?.email}
            </p>

          </div>

        ))
      }

    </div>

  );
}

export default Analytics;