import "./PersonCard.css"
import { useState, useEffect } from 'react'
import { createLikes } from "../../utilities/profile-api"
import { createMatch } from "../../utilities/match-api"

export default function PersonCard({ person, currentProfile, getProfile, getMatches}) {
    const [like, setLike] = useState(null)
    const [checkLike, setCheckLike] = useState(null)
    const [checkProfile, setCheckProfile] = useState(null)
    const [likeList, setLikeList] = useState(() => {
        if (currentProfile) {
            return currentProfile.likes
        }
    })


    let hobbies = person.hobbies.replaceAll(",", "")
    let hobbiesArr = hobbies.split(" ")

    useEffect(function() {
        async function checkLike() {
            const checkLike = await likeList.some(like => like.name.includes(person.displayName))
            setCheckLike(checkLike)
        }
        if (currentProfile) {
            checkLike()
        }
    })

    useEffect(function() {
        async function checkProfile() {
            const checkProfile = await currentProfile.displayName === person.displayName
            setCheckProfile(checkProfile)
        }
        if (currentProfile) {
            checkProfile()
        }
    })

    async function handleLike(evt) {
        evt.preventDefault(evt);
        if (!currentProfile.likes.some(like => like.name.includes(person.displayName)) && currentProfile.displayName !== person.displayName) {
            console.log(person.displayName)
            const likedPerson = {...like, name: person.displayName}
            const profileLiked = await createLikes(likedPerson)
            setLikeList([...likeList, likedPerson])
            console.log(likeList)
            console.log("profileLiked", profileLiked)
            handleMatch()
        } else {
            console.log(`${person.displayName} is already in your liked list`)
        }
    }

   async function handleMatch() {
    const matchedProfiles = await person.likes.some(like => like.name.includes(currentProfile.displayName))
        if (matchedProfiles) {
            alert(`You and ${person.displayName} Matched!`)
            const matchedProfiles = { users: [person._id, currentProfile._id]}
            const createdMatch = await createMatch(matchedProfiles)
            // Set State to show Matched Pair on Match Box
            console.log(createdMatch)
        }
        getMatches()
    }

    return (
        <div className="PersonCard" style={{ backgroundImage: `url("${person.image}")`}}>
            <div className="Heart-wrapper">
            <form onSubmit={handleLike}>
            <button className={checkLike ?
             "Liked-Heart-btn" 
             :
             checkProfile || !currentProfile ?
             "Opague-Heart"
             : 
             "Heart-btn" }>
            </button>
            </form>
            </div>
            <div className="PersonCard-wrapper">
            <h3 className={checkProfile ? "you" : "them" }>{person.displayName}</h3>
            <div className="Hobby">
            {hobbiesArr.map((hobby) => (
                <p>{hobby}</p>
                ))}
            </div>
            <p>Age: {person.age}</p>
            <p>Bio: {person.bio}</p>
            </div>
        </div>
    )
}