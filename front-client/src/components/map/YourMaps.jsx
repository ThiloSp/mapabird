// import React, { Component } from 'react'
// import { Link } from 'react-router-dom';
// import MapService from "./map-service";

// export default class YourMaps extends Component {
//   constructor() {
//     super();
//     this.state = { listOfMaps: [] };
//     this.service = new MapService();
//   }

//   getList = () => {
//     this.service.getAllThreads().then(response => {
//       // console.log("response1 is: ", response)
//       console.log("response1 threads is: ", response.threads);
//       this.setState({
//         listOfThreads: response.threads
//       });
//       console.log(this.state.listOfThreads);
//     });
//   };

//   componentDidMount() {
//     this.getList();
//   }

//   render() {
//     return (
//       <div>
//         <h2>This is Your Maps</h2>
//         <div>
//           {this.state.listOfMaps.map(map => {
//             return (
//               <div key={map._id}>
//                 <Link to={`/threads/${map._id}`}>
//                   <h3>{map.title}</h3>
//                 </Link>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     );
//   }
// }
