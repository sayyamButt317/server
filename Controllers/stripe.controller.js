import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const DOMAIN = "http://localhost:8000/api";

const createPaymentIntent = async (req, res) => {
  try {
    const { cart } = req.body;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: cart.items.map(product =>({
        price_data: {
          currency: "usd",
          product_data: {
            name: product.name,
            images: [product.picture],
          },
          unit_amount: product.price * 100,
        },
        quantity: product.quantity,
      })),
      mode: "payment",
      success_url: `${DOMAIN}/success`,
      cancel_url: `${DOMAIN}/canceled`,
    });

    res.json({ id: session.id }); // Redirect ki jagah session ID return karein
  } catch (error) {
    console.error(error);
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

export default createPaymentIntent;
