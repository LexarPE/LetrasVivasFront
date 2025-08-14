import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useContext } from "react";
import { CarritoContext } from "../context/Context";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Pago() {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const carritoContext = useContext(CarritoContext);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let clientSecret = ''

    // Obtiene el clientSecret
    const res = await carritoContext.pagar();
    console.log(res);

    setLoading(true);
    if (!res) {
      toast.error("Error: " + res.error.message);
    } else {
      clientSecret = (res.clientSecret);
    }

    // Se ejecuta el proceso pago
    if (!stripe || !elements || !clientSecret) return;
    const { error, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      }
    );

    if (error) {
      toast.error("Ocurrio un error en el proceso de pago");
    } else if (paymentIntent.status === "succeeded") {
      toast.success("Pago realizado con exito");
    }
    navigate("/");

    setLoading(false);
  };

  return (
    <div className="w-full min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6 w-full max-w-md space-y-6"
      >
        <h2 className="text-2xl font-bold text-center">💳 Realizar pago</h2>

        <div className="border p-3 rounded-md bg-gray-50">
          <CardElement options={{ style: { base: { fontSize: "16px" } } }} />
        </div>

        <button
          type="submit"
          disabled={!stripe || loading}
          className={`w-full py-2 text-white text-lg font-semibold rounded-md transition-all
            ${
              !stripe || loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-black hover:bg-gray-800"
            }`}
        >
          {loading ? "Procesando..." : "Pagar"}
        </button>
      </form>
    </div>
  );
}
