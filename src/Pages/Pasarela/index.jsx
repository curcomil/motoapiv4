import CheckoutForm from "../../Components/Checkoutforms";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51PoIHhRvRsZDGGXQtFoKdaPS4R5wx1JPv6LBB4sxo2VeNNgmGMVxHftnGvFbsCTQzhBxumNoAej9ysuid53PFomE00JEY4rQYf"
);

export const Pasarela = () => {
  const calculateOrderAmount = (total) => {
    return Math.round(total * 100);
  };
  const amount = calculateOrderAmount(items.total);

  return (
    <div className="flex items-center justify-center h-screen w-screen bg-gray-50">
      <div className="w-[30vw] min-w-[500px] p-10 shadow-lg rounded-lg bg-white">
        <p className="text-lg font-semibold text-center text-gray-700 mb-4">
          Por favor paga: ${amount / 100}
        </p>
        <Elements
          stripe={stripePromise}
          options={{
            mode: "payment",
            amount: amount,
            currency: "mxn",
            appearance: { theme: "night" },
          }}
        >
          <CheckoutForm items={items} />
        </Elements>
      </div>
    </div>
  );
};
