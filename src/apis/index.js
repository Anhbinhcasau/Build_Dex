import axios from "axios";
export  const fetchAssest = async () => {
    const requets = await axios.get(`http://localhost:3001/listToken`);
    
    return requets.data;
}
