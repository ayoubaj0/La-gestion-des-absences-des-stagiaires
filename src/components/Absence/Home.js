import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchStagiaires } from "../../redux/actions/stagiaireActions";
import { fetchAbsences } from "../../redux/actions/absenceActions";
// import BarChart from "./charts/BarChart";
// import LineChart from "./charts/LineChart";
import { Chart as ChartJS } from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import { Line } from "react-chartjs-2";

export default function Home() {
  const dispatch = useDispatch();
  const stagiaires = useSelector((state) => state.stagiaires.stagiaires);
  const absences = useSelector((state) => state.absences.absences);

  useEffect(() => {
    dispatch(fetchStagiaires());
    dispatch(fetchAbsences());
  }, [dispatch]);

  const absencesByDate = absences.reduce((acc, absence) => {
    const date = absence.date;
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(absence);
    return acc;
  }, {});
  // console.log("absencesByDate",absencesByDate)

  const justifiedAbsencesData = {
    label: "Justified Absences",
    data: Object.values(absencesByDate).map((absences) => {
      return absences.filter((absence) => absence.justified).length*2;
    }),
    backgroundColor: "rgba(75, 192, 192, 1)",
    borderColor: "rgba(75, 192, 192, 1)",
    borderWidth: 2,
  };

  const unjustifiedAbsencesData = {
    label: "Unjustified Absences",
    data: Object.values(absencesByDate).map((absences) => {
      return absences.filter((absence) => !absence.justified).length*2;
    }),
    backgroundColor: "#ecf0f1",
    borderColor: "#ecf0f1",
    borderWidth: 2,
  };


  const chartDataByDate = {
    labels: Object.keys(absencesByDate),
    datasets: [justifiedAbsencesData, unjustifiedAbsencesData]
    
  };
  return (
    <div style={{ width: "77%", float: "right"}}>
      <h1 className="text-info">Bienvenue</h1>
      
      <div style={{display:"flex",flexWrap:"wrap" , justifyContent:"space-around", width:"100%"}}>
        <div className="col" style={{ width:"22%"}}  >
          <div className="card d-flex flex-row" style={{ width:"100%" , background: "linear-gradient(109.6deg, rgb(5, 85, 84) 11.2%, rgb(64, 224, 208) 91.1%)"}}>
            <div className="card-body">
              <h5 className="card-title"><strong> Stagiaires : </strong></h5>
              <h5 className="card-title text-dark h1"><strong>{stagiaires.length} </strong></h5>
            </div>
            <div className="pt-1">
              <h1> <i className="fa fa-users h5"></i> </h1>
            </div>
          </div>
        </div>
        <div className="col" style={{ width:"22%"}}>
          <div className="card d-flex flex-row" style={{ width:"100%" , background: "linear-gradient(to right, #0acffe 0%, #495aff 100%)"}}>
            <div className="card-body">
              <h5 className="card-title"><strong>Absences : </strong></h5>
              <h5 className="card-title text-dark h1"><strong>{absences.length}</strong></h5>
            </div>
            <div className="pt-1">
              <h1> <i className="fa fa-times"></i> </h1>
            </div>
          </div>
        </div>
        <div className="col" style={{ width:"22%"}}>
          <div className="card d-flex flex-row" style={{ width:"100%", background: "linear-gradient(109.6deg, rgb(255, 78, 80) 11.2%, rgb(249, 212, 35) 100.2%)"}}>
            <div className="card-body">
              <h5 className="card-title"><strong>Justifiées : </strong> </h5>
              <h5 className="card-title text-dark h1"><strong>{parseInt((absences.filter((absence) => absence.justified === true).length)*(100/absences.length))} % </strong></h5> 
            </div>
            <div className="pt-1">
              <h1> <i className="fa fa-check"></i> </h1>
            </div>
          </div>
        </div>
        <div className="col" style={{ width:"22%"}}>
          <div className="card d-flex flex-row" style={{ width:"100%" , background: "linear-gradient(108.4deg, rgb(253, 44, 56) 3.3%, rgb(176, 2, 12) 98.4%)"}}>
            <div className="card-body">
              <h5 className="card-title"><strong> Injustifiée : </strong> </h5>
              <h5 className="card-title text-dark h1"><strong>{parseInt((absences.length - absences.filter((absence) => absence.justified === true).length)*(100/absences.length))} % </strong></h5>
            </div>
            <div className="pt-1">
              <h1> <i className="fa fa-exclamation-triangle"></i> </h1>
            </div>
          </div>
        </div>
      </div>
      <div className="App" style={{width:"90%"}}>
        <div className="chart" >
          <h2>Total des heures d'absence par jour (Barre)</h2>
          <Bar data={chartDataByDate} />
        </div>
        <div className="chart" >
          <h2>Total des heures d'absence par jour (Ligne)</h2>
          <Line data={chartDataByDate} />
        </div>
      </div>
    </div>
  );
  
}
