import { Users } from "../../dummyData";
import Online from "../online/Online";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom"
import axios from "axios"
import { Add, Remove } from "@material-ui/icons"
import "./rightbar.css"

export default function Rightbar({ user }) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER
    const [friends, setFriends] = useState([])
    const { user: currentUser, dispatch } = useContext(AuthContext)
    // const [followed, setFollowed] = useState(false);
    const [followed, setFollowed] = useState(
        currentUser.followings?.includes(user?._id)
      );

    // useEffect(() => {
    //     setFollowed(currentUser.followings.includes(user?.id))
    // }, [currentUser,user.id])

    useEffect(() => {
        const getFriends = async () => {
            try {
                const friendList = await axios.get("/users/friends/" + currentUser._id)
                setFriends(friendList.data)
            } catch (error) {
                console.log(error)
            }
        }
        getFriends()
    }, [currentUser])

    const handleClick = async () => {
        try {
            if (followed) {
                await axios.put("/users/" + user._id + "/unfollow", {userId: currentUser._id})
                dispatch({ type: "UNFOLLOW", payload: user._id })
            } else {
                await axios.put("/users/" + user._id + "/follow", {userId: currentUser._id})
                dispatch({ type: "FOLLOW", payload: user._id })
            }
        } catch (error) {
            console.log(error)
        }
        setFollowed(!followed)
    }

    const HomeRightBar = () => {
        return (
            <>
                <div className="birthdayContainer">
                    <img className="birthdayImg" src={`${PF}gift.png`} alt="" />
                    <span className="birthdayText">
                        <b>Pola Foster</b> and <b>3 other friends</b> have a birthday today
                    </span>
                </div>
                <img className="rightbarAd" src={`${PF}ad.png`} alt="" />
                <h4 className="rightbarTitle">Online Friends</h4>
                <ul className="rightbarFriendList">
                    {Users.map((u) => (
                        <Online key={u.id} user={u} />
                    ))}
                </ul>
            </>
        )
    }

    const ProfileRightBar = () => {
        return (
            <>
            {user.username !== currentUser.username && (
                <button className="rightbarFollowButton" onClick={handleClick}>
                    {followed ? "Unfollow" : "Follow"}
                    {followed ? <Remove /> : <Add />}
                </button>
            )}
                <div className="rightbarTitle">
                    <h4 className="rightbarTitle">User information</h4>
                    <div className="rightbarInfo">
                        <div className="rightbarInfoItem">
                            <span className="rightbarInfoKey">City:</span>
                            <span className="rightbarInfoValue">{user.city}</span>
                        </div>
                        <div className="rightbarInfoItem">
                            <span className="rightbarInfoKey">From:</span>
                            <span className="rightbarInfoValue">{user.from}</span>
                        </div>
                        <div className="rightbarInfoItem">
                            <span className="rightbarInfoKey">Relationship:</span>
                            <span className="rightbarInfoValue">
                                {user.relationship === 1 
                                    ? "Single" 
                                    : user.relationship === 2 
                                    ? "Married" 
                                    : "-"}
                            </span>
                        </div>
                    </div>
                    <h4 className="rightbarTitle">User friends</h4>
                    <div className="rightbarFollowings">
                        {friends.map((friend) => (
                            <Link to={"/profile/" + friend.username} style={{ textDecoration: "none" }}>
                                <div className="rightbarFollowing">
                                    <img 
                                        className="rightbarFollowingImg" 
                                        src={friend.profilePicture ? PF + friend.profilePicture : PF + "person/noAvatar.png"} 
                                        alt="" 
                                    />
                                    <span className="rightbarFollowingName">{friend.username}</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </>
        )
    }

    return (
        <div className="rightbar">
            <div className="rightbarWrapper">
                {user ? <ProfileRightBar /> : <HomeRightBar />}
            </div>
        </div>
    )
}