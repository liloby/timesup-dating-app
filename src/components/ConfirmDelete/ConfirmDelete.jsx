import "./ConfirmDelete.css";
import { deleteOne } from "../../utilities/profile-api"

export default function ConfirmDelete({setDeleteProfile, setCurrentProfile}) {

    function dontDelete() {
        setDeleteProfile(false)
    }

    async function deleteProfile() {
        await deleteOne()
        setDeleteProfile(false)
        setCurrentProfile(null)
    }

  return (
    <div className="ConfirmDelete">
      <h2>Are you sure you want to delete your current Profile?</h2>
      <div className="btn-wrapper">
        <button onClick={deleteProfile} className="Delete-btn">Yes</button>
        <button onClick={dontDelete}>No</button>
      </div>
    </div>
  );
}