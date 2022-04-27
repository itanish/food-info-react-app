import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import AdminNavigationBar from "../NavigationBar";
import { getNutriotionistsRequetsToApprove, 
    approveNutritionistRequest, 
    declineNutriotionistRequest,
    getApprovedNutrionists } from "../../../service/user_service";
import { useState } from "react";
import { Row, ListGroup, ListGroupItem, Button } from "react-bootstrap";

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [requests, setRequests] = useState([]);
    const [approve, setApproved] = useState([]);

    useEffect(() => {
        // console.log(localStorage.getItem("user"));
        if (
          localStorage.getItem("user") === null ||
          localStorage.getItem("user") === "fail"
        ) {
          navigate("/admin/login");
        }
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
        getRequestsToApprove();
        getApprovedNutritionists();
    }, []);

    const approveRequest = async (uid) => {
        const response = await approveNutritionistRequest(uid);
        if (response !== undefined) {
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
        <span>Nutritionists to approve</span>
        <Row>
          <div>
            <ListGroup>
              {requests.map((user) => (
                <ListGroupItem>
                  {user.name} ({user.role})
                  <Button
                    variant="success"
                    onClick={() => approveRequest(user._id)}
                  >
                    Accept
                  </Button>
                  <Button
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
        <h3>Nutrionists</h3>
        <Row>
          <div>
            <ListGroup>
              {approve.map((user) => (
                <ListGroupItem>
                  {user.name} ({user.role})
                  <Button
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