const FilterComponent = () => {
    const past = 18;
    const inDispatch = 0;
    const assigned = 1;
    const unassigned = 0;
    return (
        <div className="bg-white h-[95px] flex px-2 pt-2 m-0 text-black ">
            <div className="w-[25%]">
                <div style={{fontSize : "35px", fontWeight : "normal",opacity: 0.4}}>{inDispatch}</div>
                <div>In-Dispatch</div>
            </div>
            <div className="w-[25%]">
                <div style={{fontSize : "35px", fontWeight : "normal",opacity: 0.4}}>{unassigned}</div>
                <div>Unassigned</div>
            </div>
            <div className="w-[25%] text-blue-500  border-b-4 border-b-blue-500 font-bold">
                <div style={{fontSize : "35px", fontWeight : "normal"}}>{assigned}</div>
                <div>Assigned</div>
            </div>
            <div className="w-[25%]">
                <div style={{fontSize : "35px", fontWeight : "normal",opacity: 0.4}}>{past}</div>
                <div>Past</div>
            </div>
        </div>
    )
}
export default FilterComponent;