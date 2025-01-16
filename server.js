import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import Stripe from "stripe";
import firebaseAdmin from "firebase-admin";
import path from "path";
import { fileURLToPath } from "url";

// Aquí ya importas correctamente firebase-admin
import serviceAccount from "./keys/tienda-digital-devshop-firebase-adminsdk-ign8n-143437853e.json" assert { type: "json" };

// Cargar la clave del servicio de Firebase usando la sintaxis de import
const __filename = fileURLToPath(import.meta.url); 
const __dirname = path.dirname(__filename); 

dotenv.config();

// Inicializar Firebase Admin SDK
firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
});

const db = firebaseAdmin.firestore();

// Inicializar Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Inicializar Express
const app = express();

// Middlewares
app.use(cors({
  origin: 'http://localhost:5173',  
  credentials: true,
}));
app.use(bodyParser.json());
app.options('*', cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

// Crear sesión de Stripe
app.post('/create-checkout-session', async (req, res) => {
  const { userId, priceId, name, quantity = 1 } = req.body;

  // Mostrar los datos recibidos en la consola del servidor para depuración
  console.log('Datos recibidos:');
  console.log('userId:', userId);
  console.log('priceId:', priceId);
  console.log('name:', name);
  console.log('quantity:', quantity); // Para verificar la cantidad

  // Verificar que los campos necesarios no estén vacíos
  if (!userId || !priceId || !name) {
    return res.status(400).json({ error: 'Faltan datos necesarios' });
  }

  try {
    // Crear la sesión de Stripe
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,  // ID del precio creado previamente en Stripe
          quantity: quantity,
        },
      ],
      mode: 'payment',  // Modo de pago único
      success_url: `http://localhost:5173/success?session_id={CHECKOUT_SESSION_ID}&priceId=${priceId}`,
      cancel_url: 'http://localhost:5173/cancel',
      metadata: {
        userId,
        name,
        priceId,
      },
    });

    // Almacenar la compra en la base de datos (Firestore o donde lo necesites)
    const purchaseRef = db.collection('purchases').doc(session.id);
    await purchaseRef.set({
      userId,
      sessionId: session.id,
      name,
      fecha: new Date().toISOString(),
      priceId, // Añadimos el priceId para poder hacer referencia a este
    });

    // Enviar el sessionId de la sesión de Stripe al frontend
    res.json({ sessionId: session.id });

  } catch (error) {
    console.error('Error al crear la sesión de pago:', error);
    res.status(500).send('Error interno del servidor');
  }
});


// Manejar Webhook de Stripe

app.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET; 

  let event;

  try {
    // Verificar la firma del webhook
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    console.error('Webhook error:', err);
    return res.status(400).send(`Webhook error: ${err.message}`);
  }

  // Manejar el evento de tipo checkout.session.completed
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const userId = session.metadata.userId;
    const priceId = session.metadata.priceId;

    if (!userId || !cursoId) {
      console.error("Error: Faltan metadatos en el evento de Stripe.");
      return res.status(400).send("Faltan metadatos en el evento de Stripe.");
    }

    try {
      // Buscar el curso comprado y actualizarlo
      const cursoRef = db.collection("cursos-comprados")
        .where("userId", "==", userId)
        .where("priceId", "==", priceId);
      
      const snapshot = await cursoRef.get();

      if (!snapshot.empty) {
        // Actualizar el primer documento encontrado
        const doc = snapshot.docs[0];
        await doc.ref.update({
          comprado: true,  // Marcar como comprado
          timestamp: firebaseAdmin.firestore.FieldValue.serverTimestamp(), // Agregar timestamp
        });

        console.log("Compra registrada correctamente en Firestore.");
        return res.status(200).send("Webhook procesado exitosamente.");
      } else {
        console.error("No se encontró el curso para este usuario.");
        return res.status(404).send("Curso no encontrado.");
      }
    } catch (error) {
      console.error("Error al guardar la compra en Firestore:", error);
      return res.status(500).send("Error al registrar la compra.");
    }
  }

  // Si el evento no es 'checkout.session.completed'
  res.status(200).send('Evento recibido');
});

app.get('/success', async (req, res) => {
  const sessionId = req.query.session_id;
  const priceId = req.query.priceId;
  console.log('Session ID recibido:', sessionId);

  try {
    const purchaseRef = db.collection('purchases').doc(sessionId);
    const purchaseDoc = await purchaseRef.get();

    if (!purchaseDoc.exists) {
      return res.status(404).json({ error: 'Compra no encontrada' });
    }

    const purchaseData = purchaseDoc.data();
    console.log('Datos de la compra:', purchaseData);

    const userId = purchaseData.userId;  // Obtenemos el userId de la compra
    console.log('Buscando usuario con userId:', userId);  // Log para verificar el userId

    // Cambiar la colección a 'usuarios' en lugar de 'users'
    const userRef = db.collection('usuarios').doc(userId);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      console.log('Usuario no encontrado para userId:', userId);  // Log si no se encuentra al usuario
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    const userData = userDoc.data();
    console.log('Datos del usuario:', userData);

    const productName = purchaseData.name;
    const userName = userData.name;

    res.json({
      userId: userName,
      productName: productName,
      priceId: priceId,
    });

  } catch (error) {
    console.error('Error al obtener los datos:', error);
    res.status(500).json({ error: 'Error al obtener los datos de la compra' });
  }
});

app.get('/get-compras/:userId', async (req, res) => {
  const userId = req.params.userId;
  
  try {
    const comprasRef = db.collection('purchases');
    const snapshot = await comprasRef.where('userId', '==', userId).get();

    if (snapshot.empty) {
      return res.status(404).send('No se encontraron compras para este usuario');
    }

    // Obtener los detalles de cada compra, incluyendo el nombre del curso y el priceId
    const compras = await Promise.all(snapshot.docs.map(async (doc) => {
      const compraData = doc.data();
      console.log('Compra recuperada:', compraData);  // Verifica los datos
      return {
        nombreCurso: compraData.name,
        priceId: compraData.priceId, // Asegúrate de que priceId está en Firestore
        fecha: compraData.fecha,
      };
    }));
    

    res.json(compras);
  } catch (error) {
    console.error('Error al obtener las compras:', error);
    res.status(500).send('Error al obtener las compras');
  }
});



// Nuevo endpoint para guardar el curso en Firestore
app.post('/api/guardar-curso', async (req, res) => {
  const { userId, cursoId, nombreCurso } = req.body;

  if (!userId || !cursoId || !nombreCurso) {
    return res.status(400).json({ error: 'Faltan datos necesarios' });
  }

  try {
    // Guardar el curso en Firestore
    const cursoRef = db.collection('cursos-comprados').doc();
    await cursoRef.set({
      userId,
      priceId,
      nombreCurso,
      comprado: false,
      fecha: new Date().toISOString(),
    });

    res.status(200).json({ message: 'Curso guardado correctamente' });
  } catch (error) {
    console.error('Error al guardar el curso en Firestore:', error);
    res.status(500).json({ error: 'Error al guardar el curso en Firestore' });
  }
});


// Iniciar el servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Servidor ejecutándose en el puerto ${PORT}`));
