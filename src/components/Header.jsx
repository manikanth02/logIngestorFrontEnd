import SearchIcon from "@mui/icons-material/Search";
import { Box } from "@mui/material";
import "./index.css";
import useOnlineStatus from "../hooks/useOnlineStatus";
// import {useQuery} from "@tanstack/react-query";
// import { useEffect, useState } from "react";
// import logIngestorServices from "../services";
// import useDebounce from "../hooks/useDebounce";
const Header = ({onSearch}) => {
    const onlineStatus = useOnlineStatus();
    // const {getLogIngestor} = logIngestorServices();
    // const [search,setSearch] = useState({});
    // const getLogsInstanceData = useQuery({queryKey:["getLogs"],
    // queryFn:async () =>{
    //   const response = await getLogIngestor(search)
    //   return response;
    //   }
    //   });
    // const onSearch = (e) => {
    //     setSearch({search:e.target.value});
    // }

    // const searchRecord = useDebounce(search,1000);
    

    // useEffect (() => {
    //     getLogsInstanceData.refetch("getLogs");
    // },[searchRecord]);
    


    return(
        <div >
            <div className="h-[100px] bg-[#f2f2f2] flex items-center justify-around ">
                <Box>
                    <h1 className="text-[30px] font-bold">Log Ingestor</h1>
                </Box>
                <Box>
                <li className="p-2 m-2 list-none">Online Status:{onlineStatus ? "🟢":"🔴"}</li>
                </Box>
                <Box className="search-box">
                <SearchIcon className="search-icon" />
                <input
                    className="search-input"
                    name="search"
                    placeholder="Search by level,message...."
                    onChange={onSearch}
                />
            </Box>
            </div>
        </div>
    )
}

export default Header;