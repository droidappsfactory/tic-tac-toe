import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import Icon from "./components/Icon";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Card, CardBody, Container, Button, Col, Row } from "reactstrap";
import { useState } from "react";

const itemArray = new Array(9).fill("empty");

const App = () => {
  const [isCross, setIsCross] = useState(false);

  const [winMessage, setWinMessage] = useState("");

  const reloadGame = () => {
    setIsCross(false);
    setWinMessage("");
    itemArray.fill("empty", 0, 9);
  };

  const checkIsWinner = () => {
    if (
      (itemArray[0] !== "empty" &&
        itemArray[0] === itemArray[1] &&
        itemArray[0] === itemArray[2]) ||
      (itemArray[3] !== "empty" &&
        itemArray[3] === itemArray[4] &&
        itemArray[3] === itemArray[5]) ||
      (itemArray[6] !== "empty" &&
        itemArray[6] === itemArray[7] &&
        itemArray[6] === itemArray[8]) ||
      (itemArray[0] !== "empty" &&
        itemArray[0] === itemArray[3] &&
        itemArray[0] === itemArray[6]) ||
      (itemArray[1] !== "empty" &&
        itemArray[1] === itemArray[4] &&
        itemArray[1] === itemArray[7]) ||
      (itemArray[2] !== "empty" &&
        itemArray[2] === itemArray[5] &&
        itemArray[2] === itemArray[8]) ||
      (itemArray[0] !== "empty" &&
        itemArray[0] === itemArray[4] &&
        itemArray[0] === itemArray[8]) ||
      (itemArray[2] !== "empty" &&
        itemArray[2] === itemArray[4] &&
        itemArray[2] === itemArray[6])
    ) {
      setWinMessage(`${itemArray[0]} wins`);
    }
  };

  const changeItem = (itemNumber) => {
    if (winMessage) {
      return toast(winMessage, { type: "success" });
    } else if (itemArray[itemNumber] === "empty") {
      itemArray[itemNumber] = isCross ? "cross" : "circle";
      setIsCross(!isCross);
    } else {
      return toast("already filled", { type: "error" });
    }

    checkIsWinner();
  };

  return (
    <div>
      <Container className="p-5">
        <ToastContainer position="bottom-center" />
        <Row>
          <Col md={6} className="offset-md-3">
            {winMessage ? (
              <div className="mb-2 mt-2">
                <h1 className="text-primary text-uppercase text-center">
                  {winMessage}
                </h1>
                <Button color="success" block onClick={reloadGame}>
                  Reload the game
                </Button>
              </div>
            ) : (
              <h1 className="text-center text-warning">
                {isCross ? "Cross" : "Circle"}
              </h1>
            )}
            <div className="grid">
              {itemArray.map((item, index) => (
                <Card
                  color="warning"
                  onClick={() => {
                    changeItem(index);
                  }}
                >
                  <CardBody className="box">
                    <Icon name={item} />
                  </CardBody>
                </Card>
              ))}
            </div>
          </Col>
        </Row>
      </Container>
      <div>
        <button>Random start</button>
      </div>
    </div>
  );
};

export default App;
