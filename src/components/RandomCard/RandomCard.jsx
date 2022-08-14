import "./RandomCard.css"
import * as profileAPI from "../../utilities/profile-api";

export default function PersonCard({ person, setProfileItems, handleRandom }) {

    async function shuffle() {
        const profile = await profileAPI.getAll();
        setProfileItems(profile);
        handleRandom()
      }

    return (
        <div>
            <button onClick={shuffle} >Next</button>
            <div className="background-img" style={{backgroundImage: `url(${person.image})`}}>

            </div>
            <h3>{person.displayName}</h3>
            <p>{person.age}</p>
            <p>{person.hobbies}</p>
            <p>{person.bio}</p>
        </div>
    )
}