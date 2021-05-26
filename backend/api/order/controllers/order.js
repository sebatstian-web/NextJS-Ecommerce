'use strict';
/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

const stripe = require('stripe')(
  'sk_test_51IoDykC0OUyZ4NNW5ey4BrTphgdgB8aCqlCTvVOzF5VsEY6MXfzATkWAVjbV27PW6sIxZdrjbF73Qpb0bizKX2hO00eXY9etIj'
);

module.exports = {
  // Sobreescribiendo el método create de la ruta
  async create(ctx) {
    const { token, products, idUser, address } = ctx.request.body;

    // Obtener el total de los productos para comprar
    let totalPayment = 0;
    products.forEach((product) => (totalPayment += product.price));

    const charge = await stripe.charges.create({
      amount: totalPayment * 100,
      currency: 'USD',
      source: token.id,
      description: `Usuario id: ${idUser}`,
    });

    let createOrder = [];
    for await (const product of products) {
      const data = {
        game: product.id,
        user: idUser,
        idPayment: charge.id,
        addressShipping: address,
        totalPayment,
      };

      const validData = await strapi.entityValidator.validateEntityCreation(
        strapi.models.order,
        data
      );

      const entry = await strapi.query('order').create(validData);
      createOrder.push(entry);
    }

    return createOrder;
  },
};
