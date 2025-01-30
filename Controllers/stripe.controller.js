import stripe from "stripe";


const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripe = new stripe(stripeSecretKey,{
  apiVersion: '2025-01-27.acacia',
});
const createPaymentIntent = async(req, res) => {
  
  try {
    const { product ,email} = req.body;
const extractingItems = await product.map((item) =>{
quantity:item.quantity,
price_data: {
  currency: "usd",
  unit_amount: Number.parseInt(product.price, 10),
  product_data:{
    name: product.name,
    description: product.description,
    images: product.image,
  },
},
})

    const session = await stripe.Checkout.session.create({
      payment_method_types: ["card"],
      line_items: extractingItems,
      mode: "payment",
      success_url: `${req.protocol}://${req.get('host')}/success`,
      cancel_url: `${req.protocol}://${req.get('host')}/cancel`,
      customer_email: email,
    })
    res.json ({ message:"server is connected",success: true, id:session.id});
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while creating the payment intent" });
  }
}

export default createPaymentIntent;

