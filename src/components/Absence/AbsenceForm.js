// import React, { useState } from 'react';
// import absencesData from '../../data/absences.json';
// import axios from 'axios';
// const AbsenceForm = () => {
//   const [date, setDate] = useState('');
//   const [name, setName] = useState('');
//   const [hours, setHours] = useState('');
//   const [justified, setJustified] = useState(false);

//   const handleSubmit =async (e) => {
//     e.preventDefault();
//     const newAbsences = {
//         id: absencesData.length + 1,
//         date:date,
//         name: name,
//         hours: hours,
//         justified: justified
        
        
//       };
//       try {
//         // Send POST request to JSON server to add new absence
//         const response = await axios.post('http://localhost:8000/', newAbsences);
//         console.log('New absence added:', response.data);
        
//         // Reset form fields
//         setDate('');
//         setName('');
//         setHours('');
//         setJustified(false);
//       } catch (error) {
//         console.error('Error adding absence:', error);
//       }
      
    
//     // absencesData.push(newAbsences);
//     // setDate('');
//     // setName('');
//     // setHours('');
//     // setJustified(false);
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input
//         type="date"
//         placeholder="Date"
//         value={date}
//         onChange={(e) => setDate(e.target.value)}
//       />
//       <input
//         type="text"
//         placeholder="Stagiaire Name"
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//       />
//       <input
//         type="number"
//         placeholder="Hours"
//         value={hours}
//         onChange={(e) => setHours(e.target.value)}
//       />
//       <label>
//         Justified:
//         <input
//           type="checkbox"
//           checked={justified}
//           onChange={(e) => setJustified(e.target.checked)}
//         />
//       </label>
//       <button type="submit">Add Absence</button>
//     </form>
//   );
// };

// export default AbsenceForm;
