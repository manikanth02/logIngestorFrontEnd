import CustomTable from "./Table";
import {useQuery} from "@tanstack/react-query";
import logIngestorServices from "../services";
import { useEffect ,useState} from "react";
import "./index.css";
import useDebounce from "../hooks/useDebounce";
import {formatDate} from "../helper/index.js";
import Shimmer from "./Shimmer.jsx";
import useOnlineStatus from "../hooks/useOnlineStatus.js";
const Body = ({search}) => {
    const [rows,setRows] = useState([]);
    const [filterState,setFilterState] = useState({});
    const onlineStatus = useOnlineStatus();
    const handleChange = (e)=>{
        console.log(e.target.value[0],"startDate")
        console.log(e.target.value[1],"endDate")
     setFilterState(({
         ...filterState,
         [e.target.name]:e.target.value
     }));
     console.log(filterState,"filterStateState")     ;
   };
  const handleChangeDate = (e) => {
    console.log(e,"Eeeeeeeeeeeee")
    
    const [startDate,endDate] = e.target.value;
    
   if(startDate && endDate){
    setFilterState(({
        ...filterState,
        startDate,
        endDate
    }));
   }
  };

  const {getLogIngestor} = logIngestorServices();
  const getLogsInstanceData = useQuery({queryKey:["getLogs"],
  queryFn:async () => {
    const response = await getLogIngestor({...filterState,...search})
    return response;
    }
    });

    const searchRecord = useDebounce(search,1000);
    const filterStateRecord = useDebounce(filterState,1000);
 useEffect(() => {
    getLogsInstanceData.refetch("getLogs");
    if(getLogsInstanceData.isSuccess){
        const newRows = createRows();
        setRows(newRows);
    }
 }, [getLogsInstanceData?.data,filterStateRecord,searchRecord]);

  const createRows = () => {
         const datas = getLogsInstanceData?.data?.logs || [];

         return datas.map(data => (
            {

                   level:data?.level ,
                   message:data?.message,
                   resourceId:data?.resourceId,
                   timestamp:formatDate(data?.timestamp),
                   traceId:data?.traceId,
                   spanId:data?.spanId,
                   commit:data?.commit,
                   parentResourceId:data?.metadata?.parentResourceId

             } )

         )
         
  }






    const columns = [
        {
            id:"level",
            label:"Level",
            type:"text",
            handleChange: handleChange
        },{
            id:"message",
            label:"Message",
            type:"text",
            handleChange: handleChange
        },{
            id:"resourceId",
            label:"ResourceId",
            type:"text",
            handleChange: handleChange
        },{
            id:"timestamp",
            label:"Created At",
            type:"date",
            handleChange: handleChangeDate
        },{
            id:"traceId",
            label:"Trace Id",
            type:"text",
            handleChange: handleChange
        },{
            id:"spanId",
            label:"Span Id",
            type:"text",
            handleChange: handleChange
        },{
            id:"commit",
            label:"Commit",
            type:"text",
            handleChange: handleChange
        },{
            id:"parentResourceId",
            label:"ParentResourceId",
            type:"text",
            handleChange: handleChange
        }
    ]
    
    if(onlineStatus === false){
        return(
            <div className="h-[400px] border border-gray-200 w-[98%]  flex justify-center items-center m-2 p-4">
              <div>You are Currently Offline</div>
            </div>
          )
    }
   
    
    return (!getLogsInstanceData?.data) ? <Shimmer/> :(
       <>
        <CustomTable
          columns={columns}
          rows={rows}
          height="calc(100vh - 200px)"
          width ="100%"
        />
       </>       
    )
}
export default Body;