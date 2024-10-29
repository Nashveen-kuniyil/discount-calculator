import './App.css';
import { Button, TextField } from '@mui/material';
import { useState } from 'react';

function App() {
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [isPriceInput, setIsPrice] = useState(false);
  const [isDiscountInput, setIsDiscount] = useState(false);
  const [discountType, setDiscountType] = useState("percent"); // Default discount type
  const [finalPrice, setFinalPrice] = useState(null);
  const [savings, setSavings] = useState(null); // New state to track savings


  // valdiation for input fields
  const Validation = (tag) => {
    const { name, value } = tag;


    if (!!value.match(/^\d*\.?\d+$/)) {
      if (name === "price") {
        setPrice(value);
        setIsPrice(false);
      } else {
        setDiscount(value);
        setIsDiscount(false);
      }
    } else {
      if (name === "price") {
        setPrice(value);
        setIsPrice(true);
      } else {
        setDiscount(value);
        setIsDiscount(true);
      }
    }
  };

  // discount calculation
  const calculateDiscount = () => {
    if (price && discount && !isPriceInput && !isDiscountInput) {
      let discountedPrice, calculatedSavings;
      if (discountType === "percent") {
        calculatedSavings = (price * discount) / 100;
        discountedPrice = price - calculatedSavings;
      } else if (discountType === "fixed") {
        calculatedSavings = Math.min(price, discount);
        discountedPrice = price - calculatedSavings;
      }
      setFinalPrice(discountedPrice > 0 ? discountedPrice.toFixed(2) : "0.00");
      setSavings(calculatedSavings.toFixed(2)); // Update savings
    } else {
      setFinalPrice(null);
      setSavings(null);
    }
  };

  // emptying input fields
  const reset = () => {
    setPrice("");
    setDiscount("");
    setIsPrice(false);
    setIsDiscount(false);
    setDiscountType("percent");
    setFinalPrice(null);
    setSavings(null);
  };

  return (
    <>
      <div style={{ minHeight: "100vh", width: "100%" }} className="d-flex justify-content-center align-items-center">
        <div className="bg-warning p-5 rounded-5 ">
          <h1 style={{fontWeight:"800",marginBottom:"20px"}}>DISCOUNT CALCULATOR</h1>
          <div className="d-flex flex-column justify-content-center align-items-center p-5 rounded-5 bg-black text-white">
            <h1>{finalPrice !== null ? `₹${finalPrice}` : "0"}</h1>
            {savings && <h2>You saved ₹{savings}</h2>}
          </div>
          <div className="mt-5">
            <form style={{ boxShadow: "4px 6px 8px black" }} className="border rounded d-flex flex-column">
              <TextField
                id="price"
                name="price"
                value={price}
                label="Price ₹"
                onChange={(e) => Validation(e.target)}
                variant="outlined"/>
              {isPriceInput && <div className="text-danger">Invalid input</div>}

              <TextField
                id="discount"
                name="discount"
                value={discount}
                label={discountType === "percent" ? "Discount %" : "Discount ₹"}
                onChange={(e) => Validation(e.target)}
                variant="filled"
              />
              {isDiscountInput && <div className="text-danger">Invalid input</div>}
            </form>

            <div style={{ marginTop: "10px", padding: "5px" }}>
              <h2>Discount type:</h2>
              <Button
                style={{ marginRight: "10px" }}
                variant="contained" color={discountType === "percent" ? "primary" : "default"} onClick={() => setDiscountType("percent")}>  % off
              </Button>
 <Button variant="contained" color={discountType === "fixed" ? "primary" : "default"} onClick={() => setDiscountType("fixed")}> fixed off</Button>
            </div>

          </div>

          <div className="mt-3 d-flex justify-content-around">
            <Button onClick={calculateDiscount} variant="contained" className="bg-success"> Calculate</Button>
            <Button onClick={reset} variant="contained" className="bg-danger"> Reset</Button>
          </div>

        </div>
      </div>
    </>
  );
}

export default App;
