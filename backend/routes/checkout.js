// routes/checkout.js
const express = require("express");
const router = express.Router();
const db = require("../config/db");
const authMiddleware = require("../middleware/authMiddleware");

//post finalizar compra real
router.post("/", authMiddleware, async (req, res) => {
    

  const userId = req.user.id;  // viene del token

  const {
    productos,
    shippingType,
    paymentMethod,
    direccion,
    subtotal,
    envio,
    total,
    moneda,
    paymentData
  } = req.body;

  //validaciones
  if (!productos || productos.length === 0) {
    return res.status(400).json({ success: false, message: "Carrito vacío." });
  }

  if (!shippingType) {
    return res.status(400).json({ success: false, message: "Debe elegir tipo de envío." });
  }

  if (!paymentMethod) {
    return res.status(400).json({ success: false, message: "Debe elegir método de pago." });
  }

  if (!direccion) {
    return res.status(400).json({ success: false, message: "Debe ingresar una dirección." });
  }

  //convertir a números
  const subtotalNum = Number(subtotal);
  const envioNum = Number(envio);
  const totalNum = Number(total);

  if (isNaN(subtotalNum) || isNaN(envioNum) || isNaN(totalNum)) {
    return res.status(400).json({
      success: false,
      message: "Subtotal, envío o total contienen valores inválidos."
    });
  }

  // iniciar transacción
  const conn = await db.getConnection();
  await conn.beginTransaction();

  try {
   //guardar direccion
    const [dirResult] = await conn.query(
      `INSERT INTO direccion (id_usuario, departamento, localidad, calle, numero, esquina)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        userId,
        direccion.departamento || "",
        direccion.localidad || "",
        direccion.calle || "",
        direccion.numero || "",
        direccion.esquina || ""
      ]
    );

    const idDireccion = dirResult.insertId;

   //guardar orden
    const envioID =
      shippingType === "premium"
        ? 1
        : shippingType === "express"
        ? 2
        : 3; 

    const [ordResult] = await conn.query(
      `INSERT INTO orden 
        (id_usuario, fecha, subtotal, costo_envio, total, moneda, id_envio, id_direccion, estado)
       VALUES (?, NOW(), ?, ?, ?, ?, ?, ?, ?)`,
      [
        userId,
        subtotalNum,
        envioNum,
        totalNum,
        moneda || "USD",
        envioID,
        idDireccion,
        "pendiente"
      ]
    );

    const idOrden = ordResult.insertId;

    //guardar items de la orden
    for (const item of productos) {
      await conn.query(
        `INSERT INTO orden_items (id_orden, id_producto, cantidad, precio_unitario)
         VALUES (?, ?, ?, ?)`,
        [
          idOrden,
          item.id,
          item.cantidad,
          Number(item.costo)
        ]
      );
    }

    //guardar método de pago
    await conn.query(
      `INSERT INTO pago (id_orden, metodo, detalles)
       VALUES (?, ?, ?)`,
      [
        idOrden,
        paymentMethod,
        JSON.stringify(paymentData || {})
      ]
    );

    //confirmar todo
    await conn.commit();

    res.json({
      success: true,
      id_orden: idOrden,
      message: "Compra registrada con éxito"
    });

  } catch (error) {
    await conn.rollback();
    console.error("❌ ERROR CHECKOUT:", error);

    res.status(500).json({
      success: false,
      message: "Error registrando la compra"
    });

  } finally {
    conn.release();
  }
});

module.exports = router;
