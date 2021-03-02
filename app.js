const stripe = require("stripe")("sk_test_51IQUdCISJZ9ptASElzVEdkO6iCqRE9H3J3JJ1T5ggzI5Vn75RQsiVF65u23lWmPy1ND0mkhzobAlNbOYUgDhDf4a00AQZuDRPj");

const createProduct = async () => {
    const PRODUCT_NAME = "Monthly Subscription";
    const PRODUCT_TYPE = "service"

    const product = await stripe.products.create({
        name: PRODUCT_NAME,
        type: PRODUCT_TYPE,
    });

    console.log(product);
    return await product.id;
}

const createPlan = async productId => {
    const PLAN_NICKNAME = "Monthly Subscription Plan 02";
    const PLAN_INTERVAL = "month";
    const CURRENCY = "usd";
    const PLAN_PRICE = 200000;

    const plan = await stripe.plans.create({
        product: productId,
        nickname: PLAN_NICKNAME,
        currency: CURRENCY,
        interval: PLAN_INTERVAL,
        amount: PLAN_PRICE,
    });

    console.log(plan);
    return plan.id;
}

const createCustomer = async () => {
    const CUSTOMER_EMAIL = "greengarden.socialnetwork@gmail.com"
    const CUSTOMER_SOURCE = "tok_mastercard";

    const customer = await stripe.customers.create({
        email: CUSTOMER_EMAIL,
        source: CUSTOMER_SOURCE,
    });

    console.log(customer);
    return customer.id;
}

const subscribeCustomerToPlan = async (customerId, planId) => {
    const subscription = await stripe.subscriptions.create({
        customer: customerId,
        items: [{plan: planId}],
    });

    console.log(subscription);
    return subscription;
}

createProduct().then(productId => {
    createPlan(productId).then(planId => {
        createCustomer().then(customerId => {
            subscribeCustomerToPlan(customerId, planId);
        });
    });
});
