import "./ExploreAll.css"
import PersonCard from "../PersonCard/PersonCard"
import RandomCard from "../RandomCard/RandomCard"
import { useEffect } from "react"

export default function ExploreAll({profileItems, currentProfile, getProfile}) {
    useEffect(function() {
        getProfile()
    }, [])
    
    return (
        <div className="ExploreAll">
            {currentProfile ? "" : <h1>Create a Profile to Start</h1>}
                { profileItems.length > 1 ?
                <>
                <div className="ExploreAll-items">
                {profileItems.map((person, idx) => (
                <PersonCard person={person} key={person.id} idx={idx} currentProfile={currentProfile} getProfile={getProfile}/>
                ))}
                </div>
                </>
                :
                <>
                <div className="Match">
                <RandomCard person={profileItems} />
                </div>
                </>
                }               
        </div>
    )
}