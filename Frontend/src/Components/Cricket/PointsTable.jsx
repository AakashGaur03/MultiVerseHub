import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { useParams, useLocation } from "react-router-dom";

const PointsTable = () => {
  const location = useLocation();
  const TableData = location.state?.pointsTableData;
  const [dataPoints, setDataPoints] = useState([]);
  const { seriesId } = useParams();

  useEffect(() => {
    if (TableData) {
      setDataPoints(TableData);
    }
  }, [TableData]);

  console.log("Comos23", TableData);
  console.log(seriesId);

  return (
    <>
      {dataPoints.data?.length > 0 ? (
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
            {dataPoints.data.map((data, index) => (
              <tr key={index} className="d-fle x">
                <td>
                  {data.teamName}
                  {data.teamQualifyStatus && ` (${data.teamQualifyStatus})`}
                </td>
                <td>{data.matchesPlayed || 0}</td>
                <td>{data.matchesWon || 0}</td>
                <td>{data.matchesLost || 0}</td>
                <td>{data.noRes || 0}</td>
                <td>{data.points || 0}</td>
                <td>{data.nrr || 0}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <div>No Data Available</div>
      )}
    </>
  );
};

export default PointsTable;
