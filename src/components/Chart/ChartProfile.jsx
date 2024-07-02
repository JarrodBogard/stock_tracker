import { useAccount } from "../../context/AccountContext";
function ChartProfile() {
  const { profile } = useAccount();
  // Todo: Create error for "unable to access data unless account is upgraded"
  return (
    <>
      {profile ? (
        <article>
          <h3>About</h3>
          <p>{profile.description}</p>
          <div className="details">
            <span>
              <b>CEO:</b> {profile.CEO}
            </span>
            <span>
              <b>Headquarters: </b>
              {profile.address},{profile.city} {profile.state} {profile.zip},{" "}
              {profile.country}
            </span>
            <span>
              <b>Number of employees: </b>
              {profile.employees}
            </span>
          </div>
        </article>
      ) : (
        <p>
          Unfortunaltely, no company data is available at this time. Check back
          later.
        </p>
      )}
    </>
  );
}

export default ChartProfile;
