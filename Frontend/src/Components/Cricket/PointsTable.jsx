import React from "react";
import { Table } from "react-bootstrap";
import { useParams, useLocation } from "react-router-dom";
const PointsTable = () => {
  const location = useLocation();
  const TableData = location.state?.pointsTableData;
  console.log("Comos23", TableData);
  const { seriesId } = useParams();

  // Now `seriesId` contains the value captured from the URL
  console.log(seriesId);
  return (
    <>
      <Table className="table" borderless hover variant="dark">
        <thead>
          <tr>
            <th>Teams</th>
            <th>Mat</th>
            <th>Won</th>
            <th>Lost</th>
            <th>NR</th>
            <th>Pts</th>
            <th>NRR</th>
          </tr>
        </thead>
        <tbody>
          {TableData?.data &&
            TableData?.data.map((data, index) => (
              <tr key={index} className="d-fle x">
                <td>
                  {data.teamName}
                  {data.teamQualifyStatus && ` (${data.teamQualifyStatus})`}
                </td>
                <td>{data.matchesPlayed ? data.matchesPlayed : 0}</td>
                <td>{data.matchesWon ? data.matchesWon : 0}</td>
                <td>{data.matchesLost ? data.matchesLost : 0}</td>
                <td>{data.noRes ? data.noRes : 0}</td>
                <td>{data.points ? data.points : 0}</td>
                <td>{data.nrr ? data.nrr : 0}</td>
              </tr>
            ))}
        </tbody>
      </Table>
    </>
  );
};

export default PointsTable;
