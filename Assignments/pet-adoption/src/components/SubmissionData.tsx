import { useEffect, useState } from "react";
import { TableData } from "./TableData";

export const SubmissionPage = () => {
  const [submissions, setSubmissions] = useState([]);
  useEffect(() => {
    const storedData = localStorage.getItem("adoptionData");
    if (storedData) {
      setSubmissions(JSON.parse(storedData));
    }
  }, []);
  return (
    <div>
      <TableData submissions={submissions} />
    </div>
  );
};
