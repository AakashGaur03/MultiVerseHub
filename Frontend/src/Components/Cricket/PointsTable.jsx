import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { useParams, useLocation } from "react-router-dom";
import { getCricketPointsTable } from "../../Features";
import { useDispatch } from "react-redux";

const PointsTable = () => {
  const dispatch = useDispatch();
  const [dataPoints, setDataPoints] = useState([]);
  const { seriesId } = useParams();

  const callPointsTable = async () => {
    try {
      const response = await dispatch(getCricketPointsTable(seriesId));
      if (response) {
        const dataToStore = response.pointsTable || [];
        setDataPoints(dataToStore);
      } else {
        setDataPoints([]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    callPointsTable();
  }, [seriesId]);

  console.log(seriesId);
  return (
    <>
      {dataPoints.length > 0 ? (
        <div className="w-full pl-0 md:pl-11">
          {dataPoints.map((group, index) => (
            <div key={index} className="mb-4">
              <h4>{group.groupName}</h4>
              <Table borderless hover variant="dark">
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
                  {group.pointsTableInfo.map((data, idx) => (
                    <tr key={idx} className="d-fle x">
                      <td>
                        {data.teamName}
                        {data.teamQualifyStatus &&
                          ` (${data.teamQualifyStatus})`}
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
            </div>
          ))}
        </div>
      ) : (
        <div>No Data Available</div>
      )}
    </>
  );
};

export default PointsTable;
