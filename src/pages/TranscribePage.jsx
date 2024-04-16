import React, { useState, useEffect } from "react";

function TranscribePage() {
  const [recordings, setRecordings] = useState([]);
  const [transcriptions, setTranscriptions] = useState([]);
  // TODO at this moment tracribing is not functional and twilio does not handle it well. Potentially will have to use other services and transcribe it manually.

  // Fetch Recordings
  useEffect(() => {
    fetch("/api/recordings")
      .then((res) => res.json())
      .then((data) => {
        setRecordings(data);
      })
      .catch((error) => console.error("Error fetching recordings:", error));
  }, []);

  // NOPE!
  // Fetch Transcriptions
  useEffect(() => {
    fetch("/api/transcriptions")
      .then((res) => res.json())
      .then((data) => {
        setTranscriptions(data);
      })
      .catch((error) => console.error("Error fetching transcriptions:", error));
  }, []);

  // Function to find transcription by recordingSid
  const getTranscriptionByRecordingSid = (recordingSid) => {
    return transcriptions.find(
      (transcription) => transcription.recordingSid === recordingSid
    );
  };

  return (
    <div>
      {recordings.map((recording) => (
        <div key={recording.sid} style={{ marginBottom: "20px" }}>
          <audio controls src={`/api/recordings/${recording.sid}`} />
          <div>Recording SID: {recording.sid}</div>
          <div>
            Transcription:
            <p>
              {getTranscriptionByRecordingSid(recording.sid)
                ?.transcriptionText || "No transcription available"}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TranscribePage;
