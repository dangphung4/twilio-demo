import React, { useState, useEffect } from "react";

function RecordPage() {
  const [recordings, setRecordings] = useState([]);

  useEffect(() => {
    fetch("/api/recordings")
      .then((res) => res.json())
      .then((data) => setRecordings(data))
      .catch((error) => console.error("Error fetching recordings:", error));
  }, []);

  return (
    <div>
      <h2>Call Recordings</h2>
      <ul>
        {recordings.map((recording) => (
          <li key={recording.sid}>
            <a href={`/api/recordings/${recording.sid}`}>
              Recording {new Date(recording.dateCreated).toLocaleString()}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RecordPage;
