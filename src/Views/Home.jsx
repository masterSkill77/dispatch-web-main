import Avatar from "../assets/images/avata.png"
import GoogleMapComponent from "../components/Map/MapComponent"
import CardWithList from "../components/cards/CardWithList"
const Home = () => {
    return (
        <div className="mb-5 h-[max-content]">
            <div className="flex h-[700px] gap-8 mb-4r ">
                <div className="flex items-center justify-center h-full rounded bg-gray-50 dark:bg-gray-800 w-[100%] relative shadow-lg map-con overflow-hidden">
                    <GoogleMapComponent home={true} />
                </div>
               
            </div>
            {/* <div className="grid grid-cols-2 gap-8 mb-4 h-[300px] mt-2">
                <div className="flex items-center justify-center rounded">
                    <CardWithList title="Last Trips" listType="trip" />
                </div>
                <div className="flex items-center justify-center rounded">
                    <CardWithList title="Last Expenses" listType="expense" />
                </div>
                
            </div> */}
        </div>
    )
}

export default Home
