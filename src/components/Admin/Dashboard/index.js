import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import AdminNavigationBar from "../NavigationBar";
import { getNutriotionistsRequetsToApprove, 
    approveNutritionistRequest, 
    declineNutriotionistRequest,
    getApprovedNutrionists, 
    getLoggedInUserDetails,
    updateAdminApprovedData} from "../../../service/user_service";
import { useState } from "react";
import { Row, ListGroup, ListGroupItem, Button } from "react-bootstrap";

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [requests, setRequests] = useState([]);
    const [approve, setApproved] = useState([]);
    const userDetails = getLoggedInUserDetails();
    useEffect(() => {
        const getRequestsToApprove =async  () => {
            const details = await getNutriotionistsRequetsToApprove();
            // console.log(details);
            setRequests(details);
        }

        const getApprovedNutritionists = async () => {
          const details = await getApprovedNutrionists();
        //   console.log(details);
          setApproved(details);
        };
        // const userDetails = getLoggedInUserDetails();
        if (userDetails === undefined || userDetails === null) {
          navigate("/admin/login");
        } else {
          if (userDetails.role === "admin") {
            getRequestsToApprove();
            getApprovedNutritionists();
          } else {
            navigate("/error");
          }
        }
    }, []);

    const approveRequest = async (uid, email) => {
        const response = await approveNutritionistRequest(uid, userDetails.email);
        const adminresponse = await updateAdminApprovedData(
          userDetails._id,
          email
        );
        if (response !== undefined && adminresponse !== undefined) {
            const user = requests.filter((r) => r._id === uid);
            setRequests(requests.filter((r) => r._id !== uid));
            // console.log("Approved", user);
            approve.push(user[0]);
            setApproved(approve);
        } else {
            alert("Unable to approve the request");
        }
    }

    const declineRequest = async (uid) => {
        const response = await declineNutriotionistRequest(uid);
        if (response !== undefined) {
            const out = requests.filter((r) => r._id !== uid);
            // if (out.length === 0) {
            //     const update = approve.filter((r) => r._id !== uid);
            //     console.log("Removing old", update)
            //     setApproved(update);
            // } else {
            // console.log(out)
            setRequests(out);
        } else {
            alert ("Unable to decline the request")
        }
    }

    const removeApproved = async (uid) => {
      const response = await declineNutriotionistRequest(uid);
      if (response !== undefined) {
        const out = approve.filter((r) => r._id !== uid);
        // console.log(out);
        setApproved(out);
      } else {
        alert("Unable to remove the nutritionist");
      }
    };
    
    return (
      <>
        <AdminNavigationBar />
        <br />
        <br />
        <Row>
          <div>
            <ListGroup>
              <ListGroupItem>
                <h5>Nutritionists to approve</h5>
              </ListGroupItem>
              {requests.map((user) => (
                <ListGroupItem>
                  {user.name} ({user.role})
                  <Button
                    className="float-end"
                    variant="success"
                    onClick={() => approveRequest(user._id, user.email)}
                  >
                    Accept
                  </Button>
                  <span>  </span>
                  <Button
                    className="float-end"
                    variant="danger"
                    onClick={() => declineRequest(user._id)}
                  >
                    Reject
                  </Button>
                </ListGroupItem>
              ))}
            </ListGroup>
          </div>
        </Row>
        <br />
        <br />
        <Row>
          <div>
            <ListGroup>
              <ListGroupItem>
                <h5>Nutrionists currently enrolled</h5>
              </ListGroupItem>
              {approve.map((user) => (
                <ListGroupItem>
                  {user.name} ({user.role})
                  <Button
                    className="float-end"
                    variant="danger"
                    onClick={() => removeApproved(user._id)}
                  >
                    Remove
                  </Button>
                </ListGroupItem>
              ))}
            </ListGroup>
          </div>
        </Row>
      </>
    );
}

export default AdminDashboard;