// Archive.jsx
import React, { useState, useEffect } from "react";
import Archive from "../components/archiveBar.jsx";
import Call from "../components/call.jsx";
import Blank from "../pages/blank.jsx";
import "../css/calllog.css";
import { getCallLogs } from "../apis/calllog.js";
const Breaker = ({ date }) => {
  return <div className="divider">{date}</div>;
};
const CallsDetails = () => {
  const [calls, setCalls] = useState([]);
  useEffect(() => {
    // Call the getUser function when the component mounts
    getCallLogs()
      .then((callLogs) => setCalls(callLogs))
      .catch((error) => console.error("Error fetching user:", error));
  }, []);
  let currentDate = null;
  return calls.length ? (
    <div className="log-container">
      <Archive finalCallLogs={calls} archiveFlag={true} />
      <div>
        {calls.map((call, index) => {
          const callDate = new Date(call.created_at).toLocaleDateString(
            "en-GB"
          );
          if (call.is_archived) {
            return null;
          }
          if (index === 0 || callDate !== currentDate) {
            currentDate = callDate;
            return (
              <React.Fragment key={`fragment-${index}`}>
                <Breaker key={`divider-${index}`} date={callDate} />
                <Call key={`call-${index}`} call={call} />
              </React.Fragment>
            );
          }

          return <Call key={`call-${index}`} call={call} />;
        })}
      </div>
    </div>
  ) : (
    <Blank />
  );
};

export default CallsDetails;
