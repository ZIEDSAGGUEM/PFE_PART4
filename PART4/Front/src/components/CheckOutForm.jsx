import React, { useState } from "react";
import { Alert, Button, Col, Form, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useCreateOrderMutation } from "../services/appApi";
import { jsPDF } from "jspdf";

import "react-toastify/dist/ReactToastify.css";
function CheckOutForm() {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [alertMessage, setAlertMessage] = useState("");
  const [createOrder, { isLoading, isError, isSuccess }] =
    useCreateOrderMutation();
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  function handlePlaceOrder(e) {
    e.preventDefault();

    createOrder({ userId: user._id, cart: user.cart, address, phone }).then(
      (res) => {
        if (!isLoading && !isError) {
          setTimeout(() => {
            navigate("/orders");
            toast.success("Commande Confirmé");
          }, 3000);
        }
      }
    );
  }

  return (
    <Col className="cart-payment-container">
      <Form onSubmit={handlePlaceOrder}>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Nom</Form.Label>
              <Form.Control
                type="text"
                placeholder="Votre Nom"
                value={user.name}
                disabled
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                placeholder="Votre Email"
                value={user.email}
                disabled
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={7}>
            <Form.Group className="mb-3">
              <Form.Label>Addresse</Form.Label>
              <Form.Control
                type="text"
                placeholder="Addresse"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </Form.Group>
          </Col>
          <Col md={5}>
            <Form.Group className="mb-3">
              <Form.Label>Téléphone</Form.Label>
              <Form.Control
                type="number"
                placeholder="Téléphone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <label htmlFor="card-element">Card</label>

        <Button className="mt-3" type="submit">
          Payée
        </Button>
      </Form>
    </Col>
  );
}

export default CheckOutForm;
